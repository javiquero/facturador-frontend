<template>
    <div class="text-left ">
       
        <v-row class="mt-10">
            <v-col cols="12">
                <v-card color="blue-grey " dark elevation="2">
                    <v-card-title>
                        Clientes
                        <v-spacer></v-spacer> <v-spacer></v-spacer>
                        <v-text-field v-model="filter" append-icon="mdi-magnify" label="Search" single-linee hide-details></v-text-field>
                         <v-btn color="blue-grey darken-3" class="ml-10" dark >
                                    <i class="fas fa-plus"  style="font-size:20px"></i>
                                </v-btn>
                        <v-menu offset-y >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="blue-grey darken-3" class="ml-2" dark v-bind="attrs" v-on="on">
                                    <i class="fas fa-columns"  style="font-size:20px"></i>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item-group v-model="headersSelected" active-class="pink--text" multiple >
                                    <v-list-item  v-for="(item, index) in headers" :key="index">
                                        <v-list-item-title >{{ item.text }}</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                        <v-menu offset-y >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="blue-grey darken-3" class="ml-2" dark v-bind="attrs" v-on="on">
                                   <i class="fas fa-tools" style="font-size:20px"></i>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item-group active-class="white" >
                                    <v-list-item >
                                         <v-list-item-icon><i class="fal fa-fw fa-cloud-download"></i></v-list-item-icon>
                                         <v-list-item-content><v-list-item-title >Importar clientes</v-list-item-title>    </v-list-item-content>                                                                            
                                    </v-list-item>
                                    <v-list-item >
                                         <v-list-item-icon><i class="fal fa-fw fa-sync"></i></v-list-item-icon>
                                         <v-list-item-content><v-list-item-title >Actualizar clientes</v-list-item-title>    </v-list-item-content>                                                                            
                                    </v-list-item>
                                     <v-divider></v-divider>
                                      <v-list-item >
                                         <v-list-item-icon><i class="fal fa-fw fa-share-square"></i></v-list-item-icon>
                                         <v-list-item-content><v-list-item-title >Exportar a Excel</v-list-item-title>    </v-list-item-content>                                                                            
                                    </v-list-item>
                                     <v-list-item >
                                         <v-list-item-icon><i class="fal fa-fw fa-file-pdf"></i></v-list-item-icon>
                                         <v-list-item-content><v-list-item-title >Exportar a PDF</v-list-item-title>    </v-list-item-content>                                                                            
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="">
            <v-col cols="12">
                <v-card color="white" elevation="2">
                    <v-card-text>
                        <v-data-table :headers="computedHeaders" :footer-props="{itemsPerPageOptions: [50,100,500,-1]}" :items="CLIENTS" multi-sort :search="filter" show-select :items-per-page="100" class="elevation-1">
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                filter:'',
                headersSelected:[],
                data:[],
                headers: [{
                        text: 'Número',
                        align: 'start',
                        sortable: false,
                        value: 'num'
                    },
                    {
                        text: 'Nombre cliente',
                        value: 'name'
                    },
                    {
                        text: 'Dirección',
                        value: 'address'
                    },
                    {
                        text: 'Fecha',
                        value: 'date'
                    },
                    {
                        text: 'Importe',
                        value: 'total'
                    },
                    {
                        text: 'Remesada',
                        value: 'charged'
                    }
                ],

            }
        },
        computed: {
            ...mapGetters (["CLIENTS"]),
            computedHeaders () {
                return this.headers.filter((element,index)=>{return !this.headersSelected.includes(index)})  
            }
        },
        methods:{
           
        }
    }
</script>

<style>

</style>