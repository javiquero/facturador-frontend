<template>
        <div>
        <v-main class="grey lighten-3">

            <div class="mx-auto" style="max-width:1024px">
                <h2 class="mb-5">Nueva factura</h2>
                <v-card elevation="2" class="mx-auto">    
                     <v-row>
                        <v-col cols="12" class="pt-0 pb-0">
                            <v-sheet v-if="selectedCompany" :color="selectedCompany.color" elevation="1" height="10"  style="width:100%;" ></v-sheet>
                        </v-col>  
                    </v-row>
                    <v-row class="pa-5">
                        <v-col cols="6" v-if="invoice">
                            
                            <v-autocomplete @change ="_onInputCompanyChange" v-model="invoice.company"  auto-select-first ref="inputCompany" item-text="name" item-value="id" :items="COMPANIES" label="Organización" >
                                <template v-slot:no-data>
                                    Sin coincidencias.
                                </template>
                            </v-autocomplete>
                            <div v-if="selectedCompany">
                                <!-- <h1>{{selectedCompany.name}}</h1> -->
                                <h5>{{selectedCompany.vatnumber}}</h5>
                                <div>{{selectedCompany.address}}</div>
                                <div>{{selectedCompany.city}}</div>
                                <div>{{selectedCompany.cp}} - {{selectedCompany.province}}</div>
                                <div v-if="selectedCompany.phone">phone: {{selectedCompany.phone}}</div>
                                <div v-if="selectedCompany.email">email: {{selectedCompany.email}}</div>
                            </div>
                            
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <logo v-model="COMPANIES[COMPANY_SELECTED].logo" style="height:200px;width:200px;text-align:right;float:right"/>              
                            <!-- <img class="logo" v-if="!=undefined && COMPANIES[COMPANY_SELECTED].logo!=''" :src="COMPANIES[COMPANY_SELECTED].logo" alt="logo" > -->
                        </v-col>
                   </v-row>

                   <v-row class="mt-0 pa-5">
                        <v-col cols="4">
                            <div class="invoice-info">
                                <div>Factura: XXXXXX</div>
                                <div>Fecha: DD/MM/YYYY</div>
                            </div>
                        </v-col>
                        <v-col cols="3">
                            <pre>inputSearchClient:{{inputSearchClient}}</pre><pre>{{selectedClientId}}</pre>
                            <pre>client_name:{{invoice.client_name}}</pre>
                        </v-col>
                        <v-col  v-if="this.invoice!=undefined" cols="5">
                            <!-- <form v-focus-next-on-enter > -->
                            <v-row  class="client-info">
                                <v-col cols="12">
                                     <v-autocomplete :menu-props="{closeOnClick: true, closeOnContentClick: true}" 
                                     @blur="blur"
                                     @change="change" 
                                     @update:search-input="update_search" 
                                     @keydown.enter="inputClientkeydownEnter" :search-input.sync="inputSearchClient" return-objectt v-model="selectedClientId" auto-select-first ref="inputClient" item-text="name" item-value="id" :items="CLIENTS" :label="'Cliente'" >
                                        <!-- <template v-slot:no-data>
                                            <v-list-item @click="newClient">
                                                Añadir {{inputSearchClient!=''&&inputSearchClient!=undefined?inputSearchClient: ' nuevo cliente'}}
                                            </v-list-item>
                                            <dialog-client v-model="inputClientCreateValue" @close="(value=>{this.selectedClient=value})" ref="refDialogClient" />
                                        </template> -->
                                         <template v-slot:no-data>
                                            <v-list-item @click="click">
                                                {{inputSearchClient}}
                                            </v-list-item>
                                            <!-- <dialog-client v-model="inputClientCreateValue" @close="(value=>{this.selectedClient=value})" ref="refDialogClient" /> -->
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Nif" ref="inputClientNif" @keydown.enter="focus('inputClientDir')" @focus="$event.target.select()" v-model="invoice.client_nif"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Dirección" ref="inputClientDir" @keydown.enter="focus('inputClientPob')" @focus="$event.target.select()" v-model="invoice.client_address"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                     <v-text-field label="Población" ref="inputClientPob" @focus="$event.target.select()" v-model="invoice.client_city"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Código postal" @focus="$event.target.select()" v-model="invoice.client_cp"></v-text-field>
                                </v-col>
                                <v-col cols="8">
                                    <v-text-field label="Provincia" @focus="$event.target.select()" v-model="invoice.client_province"></v-text-field>
                                </v-col>                                
                            </v-row>
                        <!-- </form> -->


                            <!-- <div class="client-info">
                                <div> 

                                   

                                </div>
                                <div v-if="invoice">
                                    
                                    <div></div>
                                    <div><v-text-field label="Código postal" @focus="$event.target.select()" v-model="invoice.client_cp"></v-text-field> - <v-text-field label="Provincia" @focus="$event.target.select()" v-model="invoice.client_province"></v-text-field></div>
                                    <div v-if="invoice.client_country">{{GET_COUNTRY(invoice.client_country).name}}</div>
                                </div>
                            </div> -->
                        </v-col>
                    </v-row>
<!-- <pre>{{selectedClientId}}</pre> -->
                    <v-row class="mt-20 md-0 pr-5 pl-5">
                        <v-col cols="1">
                            Cant.
                        </v-col>
                        <v-col cols="5">
                            Descripción
                        </v-col>
                         <v-col cols="3">
                            Comentarios
                        </v-col>
                        <v-col cols="1" class="text-right">
                           Precio
                        </v-col>
                        <v-col cols="1" class="text-right">
                           Total
                        </v-col>
                         <v-col cols="1">
                           
                        </v-col>
                    </v-row>
                    <!-- <form v-focus-next-on-enter > --
                        <v-row class="ma-0 pa-0 pr-5 pl-5">                        
                            <v-col cols="1">
                                <v-text-field ref="newLineQty"  @keydown="onKeydownQty" @focus="$event.target.select()" v-model="newLine.quantity" label="" hint="" filled ></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-autocomplete v-model="newLine.selectedProductId" auto-select-first ref="inputProduct" item-text="name" item-value="id" :items="PRODUCTS" :label="newLine.product_description?newLine.product_description:'Descripción'" >
                                    <template v-slot:no-data>
                                        <v-list-item @click="newProduct">
                                            Añadir {{inputSearchClient!=''&&inputSearchClient!=undefined?inputSearchClient: ' nuevo producto'}}
                                        </v-list-item>
                                        <dialog-client v-model="inputClientCreateValue" @close="(value=>{this.selectedClient=value})" ref="refDialogClient" />
                                    </template>
                                </v-autocomplete>
                                <v-text-field ref="newLineDesc" @focus="$event.target.select()" v-model="newLine.product_description" label="" hint="" filled ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field ref="newLineComent" @focus="$event.target.select()" v-model="newLine.comment" label="" hint="" filled ></v-text-field>
                            </v-col>
                            <v-col cols="1" class="text-right">
                            <v-text-field @focus="$event.target.select()" v-model="newLine.product_price" label="" hint="" filled ></v-text-field>
                            </v-col>
                            <v-col cols="1" class="text-right">
                            <v-text-field @focus="$event.target.select()" v-model="newLine.total" label="" hint="" filled ></v-text-field>
                            </v-col>
                            <v-col cols="1">
                            
                            </v-col> 
                        </v-row>
                    <!-- </form> -->
                    <div style="text-align:right">
                        <small style="color:red; margin-right:20px;cursor:pointer" @click="_statusClear">
                            Clear cache data
                        </small>
                    </div>
                </v-card>
                 <!-- FIN ORGANIZACIONES -->


            </div>
        </v-main> 
    </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import dialogClient from '@/views/private/clients/dialog';
    import logo from '@/views/private/companies/logo';

export default {
    components: {dialogClient, logo},
    data: () => ({
            selectedCompnayId:undefined,

            inputSearchClient:'',
            selectedClientId:undefined,
            inputClientCreateValue:undefined,
            // inputClientValue:'',


            invoice:undefined,
            newInvoice:{
                client_name: '',
                client_address: '',
                client_nif: '',
                client_cp: '',
                client_city: '',
                client_province: '',
                client_country:'',
                client_bank: '',
                total: 0.00,
                number: 0,
                date: new Date(),
                notes: '',
                description: '',
                lines: [],
                company:0
            },

            newLine:{

            },
        }),computed: {
            ...mapGetters([
                'COMPANIES',
                'GET_COUNTRY',
                'CLIENTS',
                'COMPANY_SELECTED',
                'connected',
                'CLIENTS',
                'PRODUCTS'
            ]),
            selectedCompany(){
                if (this.invoice==undefined || this.invoice.company==undefined ) return undefined;
                let n =this.COMPANIES.findIndex(e => e.id === this.invoice.company)
                if (n>-1) return this.COMPANIES[n];
                return undefined;
            }
        },
        watch:{
            inputSearchClient(newVal, oldVal){
                if (newVal== null) this.inputSearchClient=oldVal;
                console.log("change inputSearchClient: : " + this.inputSearchClient);
            },
            selectedClientId(newVal){
                if (newVal!=undefined){
                    let n =this.CLIENTS.findIndex(el => el.id === newVal)
                    if (n>-1) {
                        this.$set(this.invoice, "client_name", this.CLIENTS[n].name);
                        this.$set(this.invoice, "client_address", this.CLIENTS[n].address);
                        this.$set(this.invoice, "client_nif", this.CLIENTS[n].nif);
                        this.$set(this.invoice, "client_cp", this.CLIENTS[n].cp);
                        this.$set(this.invoice, "client_city", this.CLIENTS[n].city);
                        this.$set(this.invoice, "client_province", this.CLIENTS[n].province);
                        this.$set(this.invoice, "client_bank", this.CLIENTS[n].iban);
                        this.$set(this.invoice, "client_country", this.CLIENTS[n].country);
                         this._statusSave();
                    }
                }else{
                     this.$set(this.invoice, "client_name", undefined);
                        this.$set(this.invoice, "client_address", undefined);
                        this.$set(this.invoice, "client_nif", undefined);
                        this.$set(this.invoice, "client_cp", undefined);
                        this.$set(this.invoice, "client_city", undefined);
                        this.$set(this.invoice, "client_province", undefined);
                        this.$set(this.invoice, "client_bank", undefined);
                        this.$set(this.invoice, "client_country", undefined);
                        this._statusSave();
                }
            }
        },
        methods: {
            blur(){
                console.log("blur"); console.log("     inputSearchClient: " + this.inputSearchClient);
            },
            update_search(){console.log("update_search"); console.log("     inputSearchClient: " + this.inputSearchClient);},
            change(){console.log("change"); console.log("     inputSearchClient: " + this.inputSearchClient);},
            inputClientkeydownEnter(e){
                return;
                console.log("keydown " + e.keyCode);
                let temp = this.inputSearchClient; 
                setTimeout(() => {this.inputSearchClient = temp;}, 500);
                this.$refs.inputClientNif.focus();
                e.preventDefault();    
            },
            click(){
                console.log("click list item");
                
            },
            focus(el){
                this.$refs[el].focus();
            }, test(e){
                this.$set(this.invoice, "client_name", this.inputSearchClient);
                this.$set(this.invoice, "client_address", undefined);
                this.$set(this.invoice, "client_nif", undefined);
                this.$set(this.invoice, "client_cp", undefined);
                this.$set(this.invoice, "client_city", undefined);
                this.$set(this.invoice, "client_province", undefined);
                this.$set(this.invoice, "client_bank", undefined);
                this.$set(this.invoice, "client_country", undefined);
                this.selectedClientId=undefined;
                this.$refs.inputClientNif.focus();
                this._statusSave();
                console.log(this.selectedClientId);
                console.log(this.invoice);
            },

            _onInputCompanyChange(){
                this._statusSave();
                this.$refs.inputClient.focus();
            },
            _onInputClientChange(){
                this._statusSave();
                setTimeout(() => {this.$refs.newLineQty.focus();}, 300)
                
            },
            newClient(){
                this.inputClientCreateValue = {name: this.invoice.client_name};
                setTimeout(() => { this.$refs.refDialogClient.show(); },1)                
            },

            onKeydownQty(e){                
               if (e.keyCode==13){
                   if (this.newLine.quantity=='') this.newLine.quantity=0;
                   this.$refs.inputProduct.focus();
                   e.preventDefault();
               }else if (e.keyCode==27){
                   e.preventDefault();
               }
            },
             onKeydownDesc(e){
                e.preventDefault();
               if (e.keyCode==13){
                   if (newLine.quantity=='') this.newLine.quantity=0;
                   this.$refs.newLineComent.focus();
               }else if (e.keyCode==27){
                   this.$refs.newLineQty.focus();
               }
            },

            _statusLoad(){
                let data = JSON.parse(localStorage.getItem('factu-current-invoice'));
                if (data) 
                    this.invoice=data; 
                    setTimeout(() => { 
                        this.inputSearchClient = this.invoice.client_name;
                    }, 100)
                if (this.invoice==undefined){
                    this.invoice = this.newInvoice;         
                    this.invoice.company = this.COMPANIES[this.COMPANY_SELECTED].id;
                    this.$refs.inputClient.focus();
                }else{
                }
            },
            _statusSave(){
                if (this.invoice.id==undefined)
                    localStorage.setItem("factu-current-invoice", JSON.stringify(this.invoice))
            },
            _statusClear(){
                localStorage.removeItem('factu-current-invoice');
            },
            _setFocus(){
                if (this.invoice.client_name==undefined){
                    this.$refs.inputClient.focus();
                }else{
                    this.$refs.newLineQty.focus();
                }
            }
        },mounted(){            
            this._statusLoad();
            // this._setFocus();
        }   
}
</script>

<style lang="scss">
.client-info{
    .col{
        margin:0px;
        padding:0px;
        .v-input__slot{
            margin-bottom:0px;
        }
        .v-text-field__details{
            display:none;
        }
    }
}

</style>