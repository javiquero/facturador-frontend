<template>
    <v-app-bar app color="blue-grey lighten-5"  flat >
        <div class="d-flex align-center">
            <v-toolbar-title style="font-weight:bold;font-size: 25px;" class="blue-grey--text text--darken-3"> Facturador</v-toolbar-title>
        </div>
        <v-spacer v-show="!connected"></v-spacer>
        <v-alert v-show="!connected" prominentt type="error" transition="scale-transition">
                    <v-row align="center">
                        <v-col class="grow">
                            Se ha perdido la conexión con el servidor y no podrá realizar cambios, solo podrá consultar información.
                        </v-col>
                        <v-col class="shrink">
                           
                        </v-col>
                    </v-row>
                </v-alert>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="companies.length>0" >
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue-grey lighten-2"  v-bind="attrs" v-on="on" class="blue-grey--text text--lighten-5 mr-10" >
                    {{companies[companyselected].name}}
                </v-btn>
            </template>
            <v-list>
                <v-list-item-group v-model="cs" color="">
                    <v-list-item v-for="(company, n) in companies" :key="'Company:'+n">
                        <v-list-item-icon>
                            <i class="fas fa-building"></i>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="company.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>

        <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on">
                    <v-avatar color="blue-grey lighten-2"  size="45">
                            <img v-if="user.image" :src="user.image" :alt="user.fullName" >
                        <span v-else class="white--text headline">{{ user.initials }}</span>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                        <v-avatar color="blue-grey lighten-2" size="62" class="mb-5" >
                            <img v-if="user.image" :src="user.image" :alt="user.fullName" >
                            <span v-else class="white--text headline">{{ user.initials }}</span>
                        </v-avatar>
                        <h3>{{ user.fullName }}</h3>
                        <p class="caption mt-1">
                            {{ user.email }}
                        </p>
                        <v-divider class="my-0"></v-divider>
                        <v-btn block text x-large to="/private/settings">
                            SETTINGS
                        </v-btn>
                        <v-divider class="my-0"></v-divider>
                        <v-btn block text x-large>
                            Edit Account
                        </v-btn>
                        <v-divider class="my-0'"></v-divider>
                        <v-btn block text @click="logout" x-large>
                            Disconnect
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';

	export default {
		name: 'topbar',
		data: () => ({		
            cs : 0,	
            user: {                
				image: 'https://cdn.vuetifyjs.com/images/john.jpg',
				initials: 'JD',
				fullName: 'John Doe',
				email: 'john.doe@doe.com',
			},
        }),
        watch:{
            cs(val){
                if (val==undefined) val = 0;
                this.SET_COMPANY_SELECTED(val)
            }
        },computed: {            
            ...mapGetters({
                connected: 'connected',
                companies: 'COMPANIES',
                companyselected: 'COMPANY_SELECTED'
            })
        },methods:{
            ...mapActions(["AUTH_LOGOUT"]),
            ...mapMutations(['SET_COMPANY_SELECTED']),
            logout(){
                this.AUTH_LOGOUT();
                this.$router.push("/login")
            }
        },mounted(){
            this.cs = this.companyselected
        }
	};
</script>