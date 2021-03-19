<template>
    <div>
        <v-main class="grey lighten-3">

            <div class="mx-auto" style="max-width:680px">

                <h2 class="mb-10">Configuración</h2>
                <!-- SYNC DATA -->
                <span style="font-weight: 400; letter-spacing: .25px;"></span>
                <v-card elevation="2" class="mx-auto mt-3 mb-10">                   
                    <v-list dense>
                        <v-subheader>GENERAL</v-subheader>
                        <v-list-item-group color="primary">
                            <v-list-item>
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                    <v-checkbox v-model="SETTINGS.SHOW_INDICATOR_COMPANY" @change="SAVE_SETTINGS" :input-value="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        Mostrar barra de color de organización activa
                                    </v-list-item-content>
                                </template>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <!-- FIN SYNC DATA -->



                <!-- SYNC DATA -->
                <span style="font-weight: 400; letter-spacing: .25px;">Sincronización de datos</span>
                <v-card elevation="2" class="mx-auto mt-3 mb-10">                   
                    <v-list dense>
                        <!-- <v-subheader>REPORTS</v-subheader> -->
                        <v-list-item-group color="primary">
                            <v-list-item @click="COMPANIES_REFRESH" >
                                <v-list-item-icon>
                                    <v-icon>mdi-autorenew</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    Organizaciones ({{COMPANIES.length}})
                                </v-list-item-content>
                            </v-list-item>

                             <v-list-item @click="COUNTRIES_REFRESH" >
                                <v-list-item-icon>
                                    <v-icon>mdi-autorenew</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    Paises ({{COUNTRIES.length}})
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item @click="CLIENTS_REFRESH" >
                                <v-list-item-icon>
                                    <v-icon>mdi-autorenew</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    Clientes  ({{CLIENTS.length}})
                                </v-list-item-content>
                            </v-list-item>

                        </v-list-item-group>
                    </v-list>
                </v-card>
                <!-- FIN SYNC DATA -->


                <!-- ORGANIZACIONES -->
                <span style="font-weight: 400; letter-spacing: .25px; ">Organizaciones</span>
                <v-card elevation="2" class="mx-auto mt-3">                   
                    <v-expansion-panels >
                        <v-expansion-panel v-for="(item,i) in COMPANIES" :key="i" >
                            <v-expansion-panel-header>
                                <v-icon v-text="'fa-building'" style="flex: 0 1 auto;margin-right:20px;"></v-icon>
                                <div>                                   
                                    <span class="bold" v-if="i==COMPANY_SELECTED"> <v-icon v-text="'fal fa-check'"></v-icon></span>
                                 {{item.name}}
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                 <v-row>
                                    <v-col cols="12" class="pa-0">
                                         <v-sheet :color="item.color" elevation="1" height="10"  style="width:100%;" ></v-sheet>
                                    </v-col>
                                    <v-col cols="6" class="pt-0 pb-0 pl-0 text-center">
                                        <logo v-model="item.logo" />                    
                                    </v-col>
                                    <v-col cols="6" class="pt-5 pb-0 pr-0">
                                        <v-text-field v-model="item.tradename" label="Nombre" hint="Nombre de la empresa." filled disabled >
                                        </v-text-field>
                                        <v-text-field v-model="item.vatnumber" label="Cif" hint="Código de identificación fiscal." filled disabled >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="pt-0 pb-0 pl-0">
                                         <v-text-field v-model="item.email" label="Email" hint="Dirección de email." filled disabled >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="pt-0 pb-0 pr-0">
                                        <v-text-field v-model="item.phone" label="Teléfono" hint="Número de teléfono." filled disabled >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" v-if="item.address" class="pa-0">
                                        <v-text-field v-model="item.address" label="Dirección" hint="La dirección fiscal de tu empresa." filled disabled >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6" v-if="item.address" class="pt-0 pb-0 pl-0">
                                        <v-text-field v-model="item.city" label="Población" hint="Población de tu empresa." filled disabled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6" v-if="item.address" class="pt-0 pb-0 pr-0">
                                        <v-text-field v-model="item.cp" label="Código postal" hint="Código postal de tu empresa." filled disabled >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" v-if="item.address" class="pa-0">
                                        <v-text-field v-model="item.province" label="Provincia" hint="Provincia de tu empresa." filled disabled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" v-if="item.address" class="pa-0">
                                        <v-textarea v-model="item.info" label="Notas" auto-grow rows="2" row-height="30"
                                            hint="Puedes añadir algún comentario a la información de tu empresa." filled disabled>
                                        </v-textarea>
                                    </v-col>
                                     <v-col cols="12" class="pa-0 text-right">
                                        <v-btn color="blue-grey lighten-1" dark block @click="editCompany(i)" x-large><v-icon left>mdi-pencil</v-icon> Editar</v-btn>
                                    </v-col>                                   
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel readonly @click="addCompany">
                            <v-expansion-panel-header>
                                <a href="#" class="text-decoration-none"> Añadir nueva organización </a>
                                <template v-slot:actions>&nbsp;</template>
                            </v-expansion-panel-header>                            
                        </v-expansion-panel>                       
                    </v-expansion-panels>
                </v-card>
                 <!-- FIN ORGANIZACIONES -->


            </div>
        </v-main>
        <company-dialog v-model="companyActive" @save="saveCompany" ref="companyDialog"></company-dialog>          
    </div>

</template>

<script>
    import config from "@/config/index.js"
    import companyDialog from "@/views/private/companies/dialog"
     import logo from '@/views/private/companies/logo';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components:{
            companyDialog, logo
        },
        data: () => ({
            pathImages: config.socketUrl,
            companyActive:{},
            newCompany: {name:'', vatnumber: '', address:{ adddres:'', city:'', cp:'', province:'', info:''}, color: ''},            
        }),      
        computed: {
            ...mapGetters (["COMPANIES", "CLIENTS", "COUNTRIES", "COMPANY_SELECTED", "SETTINGS"])
        },
        methods: {           
            ...mapActions (["CLIENTS_REFRESH","COMPANIES_REFRESH", "COUNTRIES_REFRESH","SAVE_SETTINGS"]),
            editCompany(index){
                this.companyActive = this.COMPANIES[index];
                let t = this;
                setTimeout(() => {
                    t.$refs.companyDialog.show();
                }, 1);               
            },
            addCompany(){
                this.companyActive = undefined; 
                let t = this;
                setTimeout(() => {
                    t.$refs.companyDialog.show();
                }, 1);
            }, 
            saveCompany(){
                
            }
        },mounted(){

        }
    }
</script>

<style>

</style>