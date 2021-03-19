export default {
	state: {
        products: JSON.parse(localStorage.getItem('products')) || []
	},
	getters: {
		PRODUCTS: state => state.products
	},
    mutations: {
		PRODUCTS_ON_UPDATE(state, data) {
			let result = state.products.find(o => o.id === data.id);
            if (result) {
                var index = state.products.indexOf(result);
				state.products[index] = data;
				// Esta chapuza es por que si solo reemplazo el registro vue no me actualiza las vistas
				state.products.push({ description:'DELE'});
				var i = state.products.indexOf({ description: 'DELE' });
				state.products.splice(i, 1);
				//---------------------
				console.log("A product has been edited.");
				localStorage.setItem("products", JSON.stringify(state.products))
            }
		},
		PRODUCTS_ON_CREATE(state, data){
			state.products.push(data);
			console.log("New product has added.");
			localStorage.setItem("products", JSON.stringify(state.products))
        },
        PRODUCTS_ON_DESTROY(state, data){
            let result = state.products.find(o => o.id === data.id);
            if (result) {
                var index = state.products.indexOf(result);
				state.products.splice(index, 1);
				console.log("A product has been removed.");
				localStorage.setItem("products", JSON.stringify(state.products))
            }
		},
		SET_PRODUCTS(state, items) { 
			localStorage.setItem("products", JSON.stringify(items))
			state.products = items;
		}
    },
	actions: {
		PRODUCT_CREATE({ rootState }, ) { 
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/products/add", {}, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve(data.id);
					} else {
						reject(jwres);
					}
				})
			})
		},
		PRODUCT_UPDATE({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/products/edit", data, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		PRODUCT_DESTROY({ rootState }, idItem) { 
			return new Promise((resolve, reject) => { 
				rootState.io.post("/api/v1/data/products/remove", {id: idItem }, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		PRODUCTS_REFRESH({ rootState, commit }) { 
			return new Promise((resolve, reject) => { 
				// commit('SET_PRODUCTS', JSON.parse(localStorage.getItem('products')));
				//if (!localStorage.getItem('products')) {
					rootState.io.post("/api/v1/data/products", {}, function (data, jwres) {
						if (jwres.statusCode == 200) {
							commit('SET_PRODUCTS', jwres.body);
							resolve();
						} else {
							reject(new Error("Error obtaining the list of products"));
						}
					})
			//	}
			})
		},
		PRODUCTS_CONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (!rootState.io.events.includes('products')) {
				rootState.io.events.push('products');
				rootState.io.on('products', (param) => { dispatch('PRODUCTS_ON', param) });
			}
        },
		PRODUCTS_DISCONNECT({ rootState, dispatch }) {
			if (!rootState.io.events) rootState.io.events = [];
			if (rootState.io.events.includes('products')) {
				rootState.io.events.splice(rootState.io.events.indexOf('products'), 1);
			}
			rootState.io.off('products',  (param) => { dispatch('PRODUCTS_ON', param)});
		},
		PHOTO_ADD({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.http.post("/data/photo/upload/"+data.productId, data.formData, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		PHOTO_SORT({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/photo/sort", {id: data}, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		PHOTO_DESTROY({ rootState }, data) { 
			// data = {id: x, value: itemDataForChange}
			return new Promise((resolve, reject)=>{ 
				rootState.io.post("/api/v1/data/photo/remove", {id: data}, function(data, jwres) {
					if (jwres.statusCode == 200) {
						resolve();
					} else {
						reject(jwres);
					}
				})
			})
		},
		PRODUCTS_ON({ commit }, msg) {
            switch (msg.verb) {
                case "updated":
                    commit('PRODUCTS_ON_UPDATE', msg.data);
                    break;

                case "created":
                    commit('PRODUCTS_ON_CREATE', msg.data);
                    break;

                case "destroyed":
                    commit('PRODUCTS_ON_DESTROY', msg.data);
                    break;

                default:
                    break;
            }
        }
    }
}
