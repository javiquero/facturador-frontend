import axios from 'axios'
import config from '@/config'

const VueAxios = axios.create({
  baseURL:  config.env === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
  timeout: 10000
})

if (localStorage.getItem('token')) {
    VueAxios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
} else {
    VueAxios.defaults.headers.common['Authorization'] = ''
}

VueAxios.interceptors.response.use(response=>{
    return response
}, err => {
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        his.$store.commit('AUTH_LOGOUT')
        // localStorage.removeItem('user-token');
        // delete VueAxios.defaults.headers.common['Authorization'];
        this.$router.push({name:'home'});
    }
    return Promise.reject(err);
});

export default VueAxios;