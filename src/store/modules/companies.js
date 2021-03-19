export default {
	state: {
		companies: JSON.parse(localStorage.getItem('factu-companies')) || [],
		companyselected: JSON.parse(localStorage.getItem('factu-selected_company')) || 0,
	},
	getters: {
		COMPANIES: state => state.companies,
		COMPANY_SELECTED: state => state.companyselected,
	},
    mutations: {
		COMPANIES_ON_UPDATE(state, data) {
			let result = state.companies.find(o => o.id === data.id);
            if (result) {
                var index = state.companies.indexOf(result);
				state.companies[index] = data;
				// Esta chapuza es por que si solo reemplazo el registro vue no me actualiza las vistas
				state.companies.push({ description:'DELE'});
				var i = state.companies.indexOf({ description: 'DELE' });
				state.companies.splice(i, 1);
				//---------------------
				console.log("A company has been edited.");
				localStorage.setItem('factu-companies', JSON.stringify(state.companies))
				if (state.companyselected<0||state.companyselected>state.companies.length-1) state.companyselected = 0;
            }
		},
		COMPANIES_ON_CREATE(state, data){
			let f = state.companies.findIndex(e=>e.id = data.id);
			if (f>-1 && state.companies[f]!=data) state.companies.splice(f);
			state.companies.push(data);
			console.log("New company has added.");
			localStorage.setItem('factu-companies', JSON.stringify(state.companies))
			if (state.companyselected==undefined)state.companyselected=0;
			localStorage.setItem('factu-selected_company', state.companyselected)
        },
        COMPANIES_ON_DESTROY(state, data){
            let result = state.companies.find(o => o.id === data.id);
            if (result) {
                var index = state.companies.indexOf(result);
				state.companies.splice(index, 1);
				console.log("A company has been removed.");
				if (state.companyselected<0||state.companyselected>state.companies.length-1) state.companyselected = 0;
				localStorage.setItem('factu-companies', JSON.stringify(state.companies))
            }
		},
		SET_COMPANIES(state, items) {
			if (state.companyselected<0||state.companyselected>items.length-1) state.companyselected = 0;
			localStorage.setItem('factu-companies', JSON.stringify(items))
			state.companies = items;
		},
		SET_COMPANY_SELECTED(state, index) {
			localStorage.setItem('factu-selected_company', index)
			state.companyselected = index;
		},
    },
	actions: {
		SET_COMPANY({state}, index) {
			localStorage.setItem('factu-selected_company', index)
			state.companyselected = index;
		},
		SEND_LOGO({ rootState }, logo) {
			return new Promise(async (resolve, reject)=>{				
				let formData = new FormData();				
				formData.append("logo", logo);
				rootState.http.post('/data/companies/logo/add', formData,{
					headers: {
					  'Content-Type': 'multipart/form-data'
					}}).then(resp => {
					if (resp.status == 200) {
						console.log(resp);
						resolve(resp.data);
					} else {
						console.log(resp);
						reject({ er: resp});
					}
				});
			})
		},
		COMPANY_CREATE({ rootState }, newItem) {
			return new Promise(async (resolve, reject)=>{

				return new Promise((resolve, reject)=>{ 
					rootState.io.post("/api/v1/data/companies/add", newItem, function(data, jwres) {
						if (jwres.statusCode == 200) {
							resolve(data);
						} else {
							reject({ er: jwres, details: data.details});
						}
					})
				})

				console.log(newItem);
				let formData = new FormData();
				let o = Object.keys(newItem)
				for( let i=0; i<o.length; i++ ){
					formData.append(o[i], newItem[o[i]]);
				}
				console.log(formData);
				rootState.http.post('/data/companies/add', formData,{
					headers: {
					  'Content-Type': 'multipart/form-data'
					}}).then(resp => {
					if (resp.status == 200) {
						resolve();
					} else {
						console.log(resp);
						reject({ er: resp});
					}
				});
			})
		},
		COMPANY_UPDATE({ rootState }, data) {
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{
				rootState.io.post("/api/v1/data/companies/edit", data, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		COMPANY_DESTROY({ rootState }, idItem) {
			return new Promise((resolve, reject) => {
				rootState.io.post("/api/v1/data/companies/remove", {id: idItem }, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		COMPANIES_REFRESH({ rootState, commit }) {
			return new Promise((resolve, reject) => {
				// commit('SET_COMPANIES', JSON.parse(localStorage.getItem('factu-companies')));
				//if (!localStorage.getItem('factu-companies')) {
					rootState.io.post("/api/v1/data/companies", {}, function (data, jwres) {
						if (jwres.statusCode == 200) {
							commit('SET_COMPANIES', jwres.body);
							resolve();
						} else {
							reject(new Error("Error obtaining the list of companies"));
						}
					})
			//	}
			})
		},
		COMPANIES_CONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (!rootState.io.events.includes('companies')) {
				rootState.io.events.push('companies');
				rootState.io.on('companies', (param) => { dispatch('COMPANIES_ON', param) });
			}
        },
		COMPANIES_DISCONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (rootState.io.events.includes('companies')) {
				rootState.io.events.splice(rootState.io.events.indexOf('companies'), 1);
			}
			rootState.io.off('companies',  (param) => { dispatch('COMPANIES_ON', param)});
        },
		COMPANIES_ON({ commit }, msg) {
			switch (msg.verb) {
                case "updated":
                    commit('COMPANIES_ON_UPDATE', msg.data);
                    break;
                case "created":
                    commit('COMPANIES_ON_CREATE', msg.data);
                    break;
                case "destroyed":
                    commit('COMPANIES_ON_DESTROY', msg.data);
                    break;
                default:
                    break;
            }
        }
    }
}
