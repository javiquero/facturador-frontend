export default {
	state: {
        invoices: JSON.parse(localStorage.getItem('invoices')) || []
	},
	getters: {
		INVOICES: state => state.invoices
	},
    mutations: {
		INVOICES_ON_UPDATE(state, data) {
			let result = state.invoices.find(o => o.id === data.id);
            if (result) {
                var index = state.invoices.indexOf(result);
				state.invoices[index] = data;
				// Esta chapuza es por que si solo reemplazo el registro vue no me actualiza las vistas
				state.invoices.push({ description:'DELE'});
				var i = state.invoices.indexOf({ description: 'DELE' });
				state.invoices.splice(i, 1);
				//---------------------
				console.log("A invoice has been edited.");
				localStorage.setItem("invoices", JSON.stringify(state.invoices))
            }
		},
		INVOICES_ON_CREATE(state, data){
			state.invoices.push(data);
			console.log("New invoice has added.");
			localStorage.setItem("invoices", JSON.stringify(state.invoices))
        },
        INVOICES_ON_DESTROY(state, data){
            let result = state.invoices.find(o => o.id === data.id);
            if (result) {
                var index = state.invoices.indexOf(result);
				state.invoices.splice(index, 1);
				console.log("A invoice has been removed.");
				localStorage.setItem("invoices", JSON.stringify(state.invoices))
            }
		},
		INVOICES_ON_UPDATE_LINE(state, data) {
			let invoiceIndex = state.invoices.findIndex(o => o.id === data.invoiceId);
            if (invoiceIndex>-1) {
				let lineIndex = state.invoices.lines.findIndex(o => o.id === data.line.id);
            	if (lineIndex>-1) {
					state.invoices[invoiceIndex].lines[lineIndex] = data.line;
					// Esta chapuza es por que si solo reemplazo el registro vue no me actualiza las vistas
					state.invoices[invoiceIndex].lines.push({ description:'DELE'});
					let i = state.invoices[invoiceIndex].lines.indexOf({ description: 'DELE' });
					state.invoices[invoiceIndex].lines.splice(i, 1);

					state.invoices.push({ description:'DELE'});
					i = state.invoices.indexOf({ description: 'DELE' });
					state.invoices.splice(i, 1);
					//---------------------
					console.log("A invoice line has been edited.");
					localStorage.setItem("invoices", JSON.stringify(state.invoices))
				}                
            }
		},
		INVOICES_ON_CREATE_LINE(state, data){
			let invoiceIndex = state.invoices.findIndex(o => o.id === data.invoiceId);
            if (invoiceIndex>-1) {
				state.invoices[invoiceIndex].lines.push(data.line);
				console.log("New invoice line has added.");
				localStorage.setItem("invoices", JSON.stringify(state.invoices))
			}
        },
        INVOICES_ON_DESTROY_LINE(state, data){
			let invoiceIndex = state.invoices.findIndex(o => o.id === data.invoiceId);
            if (invoiceIndex>-1) {
				let lineIndex = state.invoices.lines.findIndex(o => o.id === data.line.id);
            	if (lineIndex>-1) {
					state.invoices[invoiceIndex].lines.splice(lineIndex, 1);
					console.log("A invoice line has been removed.");
					localStorage.setItem("invoices", JSON.stringify(state.invoices))
				}
			}
		},
		SET_INVOICES(state, items) { 
			localStorage.setItem("invoices", JSON.stringify(items))
			state.invoices = items;
		}
    },
	actions: {
		INVOICE_CREATE({ rootState }, newItem) { 
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/invoices/add", newItem, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject({ er: jwres, details: data.details});
					}
				})
			})
		},
		INVOICE_UPDATE({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/invoices/edit", data, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		INVOICE_DESTROY({ rootState }, idItem) { 
			return new Promise((resolve, reject) => { 
				rootState.io.post("/api/v1/data/invoices/remove", {id: idItem }, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		INVOICE_CREATE_LINE({ rootState }, newItem) { 
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/invoices/line/add", newItem, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject({ er: jwres, details: data.details});
					}
				})
			})
		},
		INVOICE_UPDATE_LINE({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/invoices/line/edit", data, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		INVOICE_DESTROY_LINE({ rootState }, idItem) { 
			return new Promise((resolve, reject) => { 
				rootState.io.post("/api/v1/data/invoices/line/remove", {id: idItem }, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		INVOICES_REFRESH({ rootState, commit }) { 
			return new Promise((resolve, reject) => { 
				// commit('SET_INVOICES', JSON.parse(localStorage.getItem('invoices')));
				//if (!localStorage.getItem('invoices')) {
					rootState.io.post("/api/v1/data/invoices", {}, function (data, jwres) {
						if (jwres.statusCode == 200) {
							commit('SET_INVOICES', jwres.body);
							resolve();
						} else {
							reject(new Error("Error obtaining the list of invoices"));
						}
					})
			//	}
			})
		},
		INVOICES_CONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (!rootState.io.events.includes('invoices')) {
				rootState.io.events.push('invoices');
				rootState.io.on('invoices', (param) => { dispatch('INVOICES_ON', param) });
			}
        },
		INVOICES_DISCONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (rootState.io.events.includes('invoices')) {
				rootState.io.events.splice(rootState.io.events.indexOf('invoices'), 1);
			}
			rootState.io.off('invoices',  (param) => { dispatch('INVOICES_ON', param)});
        },
		INVOICES_ON({ commit }, msg) {
            switch (msg.verb) {
				case "updatedLine":
                    commit('INVOICES_ON_UPDATE_LINE', msg.data);
                    break;

                case "createdLine":
                    commit('INVOICES_ON_CREATE_LINE', msg.data);
                    break;

                case "destroyedLine":
                    commit('INVOICES_ON_DESTROY_LINE', msg.data);
                    break;

                case "updated":
                    commit('INVOICES_ON_UPDATE', msg.data);
                    break;

                case "created":
                    commit('INVOICES_ON_CREATE', msg.data);
                    break;

                case "destroyed":
                    commit('INVOICES_ON_DESTROY', msg.data);
                    break;

                default:
                    break;
            }
        }
    }
}
