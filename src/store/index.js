import Vue 			from 'vue'
import Vuex 		from 'vuex'

import products 	from './modules/products'
import clients 		from './modules/clients'
import invoices 	from './modules/invoices'
import companies 	from './modules/companies'
import auth 		from './modules/auth'
import settings		from './modules/settings'
import countries	from './modules/countries'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		io: {},
		http: {},
		internet: true
	},
	getters: {
		connected: state => !!state.internet,
	},
	mutations: {

	},
	actions: {
		DISCONNECT_EVENTS: ({dispatch}) => {
			return new Promise(resolve => {
				// dispatch('PRODUCTS_DISCONNECT', 	null, {root: true});
				dispatch('CLIENTS_DISCONNECT', 		null, {root: true});
				dispatch('COMPANIES_DISCONNECT', 	null, {root: true});
				dispatch('INVOICES_DISCONNECT', 	null, {root: true});
				resolve();
			})
		},
		CONNECT_EVENTS: ({dispatch}) => {
			return new Promise(resolve => {
				// dispatch('PRODUCTS_REFRESH', 		null, {root: true});
				dispatch('CLIENTS_REFRESH', 		null, {root: true});
				dispatch('COMPANIES_REFRESH', 		null, {root: true});
				// dispatch('INVOICES_REFRESH', 		null, {root: true});
				dispatch('COUNTRIES_REFRESH', 		null, {root: true});

				// dispatch('PRODUCTS_CONNECT', 		null, {root: true});
				dispatch('CLIENTS_CONNECT', 		null, {root: true});
				dispatch('COMPANIES_CONNECT', 		null, {root: true});
				// dispatch('INVOICES_CONNECT', 		null, {root: true});
				resolve();
			})
		},
		CONNECT_SOCKET: ({state,getters,dispatch}) => {
			if (getters.isAuthenticated) {
				//state.io.headers = { Authorization: state.token }
				console.log("Connect socket");
				state.io.post("/api/v1/data/socket", {}, function (data, jwres) {
					if (jwres.statusCode == 403) {
						console.log("Inválid token");
						dispatch('AUTH_LOGOUT', null, {root: true});
					} else {
						state.io.on('exit', (param) => {
							dispatch('AUTH_LOGOUT', null, {root: true});
						});
						dispatch('DISCONNECT_EVENTS', null, {root: true});
						dispatch('CONNECT_EVENTS', null, {root: true});
					}
				})
			}
		},
		SET_SOCKET: ({state,getters,dispatch}, socket) => {
			return new Promise((resolve) => {
				state.io = socket;
				state.io.on('connect', function () {
					state.internet = true;
					console.log("Socket event Connect, auth:", getters.isAuthenticated);
					if (getters.isAuthenticated) {
						dispatch('CONNECT_SOCKET', null, {
							root: true
						});
					}
				});
				state.io.on('disconnect', function () {
					dispatch('DISCONNECT_EVENTS', null, {
						root: true
					});
					state.internet = false;
				});
				resolve();
			});
		},
		SET_AXIOS: ({state}, axios) => {state.http = axios;}
	},
	modules: {
		clients,
		products,
		invoices,
		companies,
		auth,
		settings,
		countries
	}
})