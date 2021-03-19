<template>
    <v-app>
        <sidebar />
        <topbar />
        <v-main class="blue-grey lighten-5">
            <v-sheet v-if="SETTINGS.SHOW_INDICATOR_COMPANY!=false &&SETTINGS.SHOW_INDICATOR_COMPANY!=undefined && COMPANIES.length > 0 && COMPANY_SELECTED!=undefined && COMPANIES[COMPANY_SELECTED].color" :color="COMPANIES[COMPANY_SELECTED].color" elevation="1" height="10"  style="width:100%;" ></v-sheet>
            <v-container fluid>
                <v-row no-gutters class="mt-5 mb-0"> 
                    <v-col cols="12" lg="6">  
                        <v-card elevation="2" tilee >
                            <v-row no-gutters>
                                <v-col cols="12" sm="3">
                                    <v-btn height="50" block plain :disabled="!connected" tilee large to="/private/invoices/new">Nueva factura</v-btn>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-btn height="50" block plain :disabled="!connected" tilee large to="/private/clients/new">Nuevo cliente</v-btn>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-btn height="50" block plain :disabled="!connected" tilee large to="/private/orders/new">Nuevo pedido</v-btn>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <v-btn height="50" block plain :disabled="!connected" tilee large to="/private/products/new">Nuevo producto</v-btn>
                                </v-col>
                            </v-row>
                         </v-card>
                    </v-col>
                </v-row>               
                <tour ref="tour"></tour> 
                <v-fade-transition mode="out-in">
				<router-view />                        
			</v-fade-transition>
            </v-container>
        </v-main>
        <v-footer dark app="app">
      <v-flex class="text-center">© {{year}}. All rights reserved.</v-flex>
    </v-footer>
    </v-app>
</template>
<script>  
    import tour from '@/components/tour.vue'
    
    import { mapGetters } from 'vuex';
    import sidebar from '@/components/sidebar.vue'
    import topbar from '@/components/topbar.vue'
    import footerbar from '@/components/footerbar.vue'
    export default {
        components: {
            tour,
            sidebar,
            topbar,
            footerbar
        },methods: {
            testCompanies(){
                if (this.COMPANIES.length==0)
                    this.$refs.tour.show();
            }
        },mounted(){
            this.testCompanies();
        },
        watch:{
            isAuthenticated(val){
                if (val==false)  this.$router.push("/login")
            }
        },
        computed: {
            year(){
                return new Date().getFullYear()
            },  
            ...mapGetters([
                 'COMPANIES',
                 'COMPANY_SELECTED',
                 'connected','isAuthenticated',
                'SETTINGS'
            ])
        },
    }
</script>

<style>

</style>