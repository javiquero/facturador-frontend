import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		component: () => import('@/views/public/layout.vue'),
		children: [{
			path: '',
			name: 'home',
			component: () => import('@/views/public/index.vue'),
		},{
			path: 'login',
			name: 'login',
			component: () => import('@/views/public/auth/login.vue'),
		}, {
			path: '/signup',
			name: 'signup',
			component: () => import('@/views/public/auth/signup.vue'),
		}, {
			path: '/recover',
			name: 'recover',
			component: () => import('@/views/public/auth/recover.vue'),
		}, {
			path: '/email/confirm',
			name: 'email.confirm',
			component: () => import('@/views/public/auth/email.confirm.vue'),
		},
		{
			path: '/password/new',
			name: 'password.new',
			component: () => import('@/views/public/auth/password.new.vue'),
		},],
	},{
		path: '/private',
		// redirect:'/private/main',
		component: () => import('@/views/private/layout.vue'),
		children: [{
			path: '',
			name: 'dashboard',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/index.vue'),
		},
		{
			path: 'settings',
			name: 'settings',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/settings/index.vue'),
		},
		{
			path: 'invoices',
			name: 'invoices',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/invoices/index.vue'),
		},
		{
			path: 'invoices/new',
			name: 'invoicesNew',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/invoices/new.vue'),
		},
		{
			path: 'orders',
			name: 'orders',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/orders/index.vue'),
		},
		{
			path: 'clients',
			name: 'clients',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/clients/index.vue'),
		},
		{
			path: 'clients/new',
			name: 'clientsNew',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/clients/dialog.vue'),
		},
		{
			path: 'products',
			name: 'products',
			meta: {authRequired: 1,},
			component: () => import('@/views/private/products/index.vue'),
		}],
		
	},
]









const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	//iView.LoadingBar.start();
	if (to.meta==undefined) to.meta={};
    let title = to.meta.title;
    title = title ? 'Facturador | ' + title : 'Facturador';
    window.document.title = title;
	// return next();
	if (store.getters.isAuthenticated) {
		return next();
	}else{
		if (to.meta.authRequired) return next('/login');
		return next();
	}
});
router.afterEach((to, from, next) => {
    //iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export {store, router};
