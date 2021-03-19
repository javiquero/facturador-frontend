
// import config from '@/config'
// import axios from '@/libs/axios'
// const baseUrl = config.env === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default {
    state: {
        data:  JSON.parse(localStorage.getItem('factu-settings')) || {SHOW_INDICATOR_COMPANY:false},
    },
    mutations: {
        // SET_SHOW_INDICATOR_COMPANY(state, data){
        //     state.data.SHOW_INDICATOR_COMPANY = data;
        //     localStorage.setItem("factu-settings", JSON.stringify(state.data))
        // }      
    },
    getters: {
        SETTINGS: state => state.data,
    },
    actions: {        
        SAVE_SETTINGS({state}) {
            console.log("Update settings");
			localStorage.setItem("factu-settings", JSON.stringify(state.data));
		},
    }
  }
