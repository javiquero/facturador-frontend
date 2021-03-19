import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {router,	store} from './router'
import vuetify from './plugins/vuetify';
import config from '@/config'


import vueAxios from './axios';
Vue.prototype.$http = vueAxios;

// Sockets-io
const io = require('sails.io.js')(require('socket.io-client'));
io.sails.url = config.socketUrl;
io.sails.reconnection = true;
Vue.prototype.$socket = io.socket;
// end Sockets-io 


Vue.config.productionTip = false

Vue.directive('focusNextOnEnter', {
	inserted(el, binding, vnode) {
		el.addEventListener('keyup', (ev) => {
			let index = [...vnode.elm.elements].indexOf(ev.target);
			if (ev.keyCode === 13 && index < vnode.elm.length - 1) {
				vnode.elm[index + 1].focus();
			}
		});
	},
},)

new Vue({
	router,
	store,
	vuetify,
	beforeCreate() {
		store.dispatch('SET_AXIOS', this.$http)
		store.dispatch('SET_SOCKET', this.$socket)
		this.$socket = store.state.io;
		if (store.getters.isAuthenticated) {
			store.dispatch("AUTH_AUTOLOGIN");
		}
	},
	render: h => h(App)
}).$mount('#app')