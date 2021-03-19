
// import config from '@/config'
// import axios from '@/libs/axios'
// const baseUrl = config.env === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default {
    state: {
        token: localStorage.getItem('factu-user-token') || '',
        status: ''
    },
    mutations: {
        AUTH_REQUEST: (state) => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, token) => {           
            if (token) {                
                localStorage.setItem('factu-user-token', token)
                state.token = token
            }
            console.log("%c I'm logged in !!!!", 'background: #222; color: #bada55', state.token);
            state.status = 'success'
        },
        AUTH_ERROR: (state) =>   {
            state.status = 'error'
            localStorage.removeItem('factu-user-token')
            state.token = '';
        },
        AUTH_LOGOUT: (state) =>{ 
            state.status = 'logout'
            localStorage.removeItem('factu-user-token')
            state.token = '';
        }
    },
    getters: {
        isAuthenticated: state => !! state.token,
        authStatus: state => state.status,
    },
    actions: {
        AUTH_AUTOLOGIN: ({commit, rootState, dispatch, state }) => { 
            const token = state.token;
           if (token) {
                rootState.http.defaults.headers.common['Authorization'] = token
                rootState.io.headers = { Authorization: token };
                commit('AUTH_SUCCESS')
            } else {
                console.log("%c I'm not logged in !!!!", 'background: #222; color: red');
            }
        },
        AUTH_REQUEST: ({ rootState,dispatch, commit }, user) => {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                rootState.http.post('/login', user)
                .then(resp => {
                    if (resp && resp.status == 200){
                        const token = resp.data.token
                        rootState.io.headers = {Authorization: token}
                        rootState.http.defaults.headers.common['Authorization'] = token
                        commit('AUTH_SUCCESS', token)
                        dispatch('CONNECT_SOCKET', null, { root: true });
                        resolve(resp)
                    }else{
                        const err = new Error("Authentication failed.");
                        dispatch('AUTH_LOGOUT', null, { root: true });
                        commit('AUTH_ERROR', err)
                        reject (err)
                    }
                })
                .catch(err => {
                    dispatch('AUTH_LOGOUT', null, { root: true });
                    commit('AUTH_ERROR', err)
                    reject(err)
                })
            })
        },
        AUTH_SIGNUP_REQUEST: ({commit, rootState}, user) => {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                rootState.http.post('/signup', user)
                .then(resp => {
                    if (resp && resp.status == 200){
                        const token = resp.data.token
                        rootState.io.headers = {Authorization: token}
                        rootState.http.defaults.headers.common['Authorization'] = token
                        commit('AUTH_SUCCESS', token)
                        //dispatch('USER_REQUEST')
                        resolve(resp)
                    }else{
                        const err = new Error("Authentication failed.");
                        delete rootState.http.defaults.headers.common['Authorization']
                        rootState.io.sails.headers = {Authorization: ''}
                        commit('AUTH_ERROR', err)
                        reject (err)
                    }
                })
                .catch(err => {
                    commit('AUTH_ERROR', err)
                    reject(err)
                })
            })
        },
        AUTH_PASSWORD_CHANGE: ({commit, rootState }, data) => { 
            return new Promise((resolve, reject) => {
                rootState.http.post('password/change', data)
                .then(resp => {
                    if (resp && resp.status == 200) {
                        const token = resp.data.token
                        commit('AUTH_SUCCESS', token);
                        resolve(resp)
                    }else{
                        reject (resp)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        AUTH_EMAIL_CONFIRM: ({commit, rootState }, token) => { 
            return new Promise((resolve, reject) => {
                rootState.http.post('email/confirm', { token: token })
                .then(resp => {
                    if (resp && resp.status == 200) {
                        const token = resp.data.token
                        commit('AUTH_SUCCESS', token);
                        resolve(resp)
                    }else{
                        reject (resp)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        AUTH_RECOVER: ({rootState }, email) => { 
            return new Promise((resolve, reject) => {
                rootState.http.post('/password/reset', { email: email })
                .then(resp => {
                    if (resp && resp.status == 200){
                        resolve(resp)
                    }else{
                        reject (resp)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        AUTH_LOGOUT: ({commit, rootState}) => {
            return new Promise((resolve) => {
                delete rootState.http.defaults.headers.common['Authorization']
                rootState.io.headers = {Authorization: ''}
                commit('AUTH_LOGOUT')
                resolve()
            })
        }
    }
  }
