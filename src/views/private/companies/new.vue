<template>
        <v-card>
            <v-card-title>
                <span class="headline">{{localValue.id==undefined? 'Nueva':'Editar'}} organización</span>
            </v-card-title>
            <v-card-text>
                <v-container style="margin-bottom:20px;">
                    <form v-focus-next-on-enter >
                    <v-row>
                          <v-col cols="6" class="pt-0 pb-0 pl-0">
                            <logo v-model="localValue.logo" :edit="true"/>                                  
                        </v-col>
                        <v-col cols="6" class="pt-0 pb-0 pr-0">
                            <v-text-field @focus="$event.target.select()" v-model="localValue.name" ref="inputCompanyName" label="Nombre de la organización" hint="Nombre descriptivo de la empresa" filled required></v-text-field>
                             <v-text-field @focus="$event.target.select()" v-model="localValue.vatnumber" label="Cif" hint="Código de identificación fiscal." filled >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" class="pb-0 pr-0 pl-0 pt-0">
                            <v-text-field @focus="$event.target.select()" v-model="localValue.tradename"  label="Razón social de la organización"
                                hint="Razón social de la empresa" filled ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="pa-0">
                            <v-text-field @focus="$event.target.select()"  v-model="localValue.address" label="Dirección" filled >
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" class="pt-0 pb-0 pl-0">
                            <v-text-field @focus="$event.target.select()" v-model="localValue.city" label="Población" filled >
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" class="pt-0 pb-0 pr-0">
                            <v-text-field @focus="$event.target.select()" v-model="localValue.cp" label="Código postal" filled >
                            </v-text-field>
                        </v-col>

                         <v-col cols="6" class="pt-0 pb-0 pl-0">
                            <v-text-field @focus="$event.target.select()" v-model="localValue.province" label="Provincia" hint="" filled >
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" class="pt-0 pb-0 pr-0">
                             <v-autocomplete autocomplete="nope" @focus="$event.target.select()" filled v-model="localValue.countrie" auto-select-first  item-text="name" item-value="id" :items="COUNTRIES" label="País" ></v-autocomplete>
                        </v-col>

                        <v-col cols="12" class="pa-0">
                            <v-textarea v-model="localValue.info" label="Notas" auto-grow rows="2" row-height="30"
                                hint="Puedes añadir algún comentario a la información de tu empresa." filled >
                            </v-textarea>
                        </v-col>
                         
                        <v-col cols="12" class="pa-0">
                            <span>Color</span>
                            <v-row>
                                <v-col cols="6">
                                    <v-sheet :color="localValue.color" elevation="1" height="80" width="200" ></v-sheet>
                                </v-col>
                                 <v-col cols="6" class="text-right">
                                    <v-sheet style="overflow: hidden; cursor:pointer; display: inline-block; margin-right: 10px; text-align:center"  v-for="(item, index) in colors" v-bind:key="'color-piker-'+index" :color="item" elevation="1" width="45" :name="'color-piker-'+index" height="20" >
                                        <v-icon small v-if="item==localValue.color" v-text="'mdi-check-circle'"></v-icon>
                                        <div v-else @click="localValue.color=item" style="height:100%;"></div>
                                    </v-sheet>
                                </v-col>
                            </v-row>                            
                        </v-col>

                    </v-row>
                    </form>
                </v-container>
                <small>Como mínimo debes darle un nombre a la nueva organización</small>
            </v-card-text>
            <v-card-actions>
               <v-btn v-if="this.localValue.id!=undefined" color="red darken-1" :disabled="!connected" text @click="remove">
                Eliminar
            </v-btn>
            <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="cancel">
                    Cancelar
                </v-btn>
                <v-btn color="green darken-1" text @click="save">
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
    // this.$refs.companyDialog.show()
    import { mapGetters, mapActions } from 'vuex';
    import logo from './logo';

    export default {
        components:{logo},
        props: ['value'],
        data: () => ({
            localValue: {},
            colors: [ 'red', 'pink', 'purple', 'indigo', 'blue', 'yellow', 'cyan', 'teal', 'orange', 'green', 'lime', 'brown' ],            
        }),
        watch: {
            localValue(value) {
                this.$emit('input', value);
            },
            value(value) {
                this.localValue = value
            }
        },
        computed: {
            ...mapGetters(['connected', 'COUNTRIES'])
        },
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.localValue.logo2=files[0];
            },
            ...mapActions (["COMPANY_CREATE", "COMPANY_UPDATE", "COMPANY_DESTROY", ]),
            remove(){
                if (this.localValue.id) {
                    this.COMPANY_DESTROY(this.localValue.id)
                    this.$emit('remove');
                }
            },
            async save(){
                if (this.localValue.id) {
                    await this.COMPANY_UPDATE(this.localValue);
                }else{
                    this.localValue=await this.COMPANY_CREATE(this.localValue)
                }
                this.$emit('save', this.localValue);
            },cancel(){
                this.$emit('cancel');
            },focus(){
                this.$refs.inputCompanyName.focus();
            }
        },mounted(){
            // this.$refs.clientName.focus();
            this.localValue = this.value;
            if (this.localValue==undefined) this.localValue= {};
            if (this.localValue.color==undefined||this.localValue.color=='') {
                let n = Math.floor(Math.random() * 11);
                this.$set(this.localValue, 'color', this.colors[n]);
            }
            setTimeout(() => {
                this.$refs.inputCompanyName.$refs.input.focus();
            }, 0);
        }
    }
</script>

<style>

</style>