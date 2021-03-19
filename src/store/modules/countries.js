export default {
    state: {
        countries: JSON.parse(localStorage.getItem('factu-countries')) || []
    },
    getters: {
        COUNTRIES: state => state.countries,
        GET_COUNTRY: (state) => (id) => {
            return state.countries.find(todo => todo.id === id)
        }
    },
    mutations: {
        SET_COUNTRIES(state, items) {
            localStorage.setItem("factu-countries", JSON.stringify(items))
            state.countries = items;
        }
    },
    actions: {
        COUNTRIES_REFRESH({ rootState, commit }) {
            return new Promise((resolve, reject) => {
                rootState.io.post("/api/v1/data/countries", {}, function(data, jwres) {
                    if (jwres.statusCode == 200) {
                        commit('SET_COUNTRIES', jwres.body);
                        resolve();
                    } else {
                        reject(new Error("Error obtaining the list of countries"));
                    }
                })
            })
        },
    }
}
