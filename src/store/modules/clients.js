export default {
	state: {
        clients: JSON.parse(localStorage.getItem('factu-clients')) || []
	},
	getters: {
		CLIENTS: state => state.clients
	},
    mutations: {
		CLIENTS_ON_UPDATE(state, data) {
			let result = state.clients.find(o => o.id === data.id);
            if (result) {
                var index = state.clients.indexOf(result);
				state.clients[index] = data;
				// Esta chapuza es por que si solo reemplazo el registro vue no me actualiza las vistas
				state.clients.push({ description:'DELE'});
				var i = state.clients.indexOf({ description: 'DELE' });
				state.clients.splice(i, 1);
				//---------------------
				console.log("A client has been edited.");
				localStorage.setItem("factu-clients", JSON.stringify(state.clients))
            }
		},
		CLIENTS_ON_CREATE(state, data){
			state.clients.push(data);
			console.log("New client has added.");
			localStorage.setItem("factu-clients", JSON.stringify(state.clients))
        },
        CLIENTS_ON_DESTROY(state, data){
            let result = state.clients.find(o => o.id === data.id);
            if (result) {
                var index = state.clients.indexOf(result);
				state.clients.splice(index, 1);
				console.log("A client has been removed.");
				localStorage.setItem("factu-clients", JSON.stringify(state.clients))
            }
		},
		SET_CLIENTS(state, items) { 
			localStorage.setItem("factu-clients", JSON.stringify(items))
			state.clients = items;
		}
    },
	actions: {
		CLIENT_CREATE({ rootState }, newItem) { 
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/clients/add", newItem, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve(data);
					} else {
						reject({ er: jwres, details: data.details});
					}
				})
			})
		},
		CLIENT_UPDATE({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/clients/edit", data, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		CLIENT_DESTROY({ rootState }, idItem) { 
			return new Promise((resolve, reject) => { 
				rootState.io.post("/api/v1/data/clients/remove", {id: idItem }, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		CLIENTS_REFRESH({ rootState, commit }) { 
			return new Promise((resolve, reject) => { 
				// commit('SET_CLIENTS', JSON.parse(localStorage.getItem('factu-clients')));
				//if (!localStorage.getItem('factu-clients')) {
					rootState.io.post("/api/v1/data/clients", {}, function (data, jwres) {
						if (jwres.statusCode == 200) {
							commit('SET_CLIENTS', jwres.body);
							resolve();
						} else {
							reject(new Error("Error obtaining the list of clients"));
						}
					})
			//	}
			})
		},
		CLIENTS_CONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (!rootState.io.events.includes('clients')) {
				rootState.io.events.push('clients');
				rootState.io.on('clients', (param) => { dispatch('CLIENTS_ON', param) });
			}
        },
		CLIENTS_DISCONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (rootState.io.events.includes('clients')) {
				rootState.io.events.splice(rootState.io.events.indexOf('clients'), 1);
			}
			rootState.io.off('clients',  (param) => { dispatch('CLIENTS_ON', param)});
        },
		CLIENTS_ON({ commit }, msg) {
            switch (msg.verb) {
                case "updated":
                    commit('CLIENTS_ON_UPDATE', msg.data);
                    break;

                case "created":
                    commit('CLIENTS_ON_CREATE', msg.data);
                    break;

                case "destroyed":
                    commit('CLIENTS_ON_DESTROY', msg.data);
                    break;

                default:
                    break;
            }
        }
    }
}
