<template>
    <v-card class="new-client">
        <v-card-title>
            <span class="headline">{{localValue.id==undefined? 'Nuevo':'Editar'}} cliente</span>
        </v-card-title>
        <v-card-text>
            <v-container style="margin-bottom:20px;">
                <form v-focus-next-on-enter >
                <v-tabs v-model="tab" fixedd-tabs >
                    <v-tab>Básico</v-tab>
                    <v-tab>Dirección</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>                        
                            <v-row>
                                <v-col cols="12" class="pb-0 pr-0 pl-0">
                                    <v-text-field @focus="$event.target.select()" v-model="localValue.name" ref="clientName" label="Nombre comercial" filled required></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pt-0 pb-0 pr-0 pl-0">
                                    <v-text-field  @focus="$event.target.select()" v-model="localValue.tradename" label="Razon social"
                                        hint="" filled ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="pt-0 pb-0 pl-0">
                                    <v-text-field @focus="$event.target.select()"  v-model="localValue.nif" label="Nif/Cif" hint="" filled >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6" class="pt-0 pb-0 pr-0">
                                    <v-text-field @focus="$event.target.select()"  v-model="localValue.email" label="Email" hint="" filled >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="6" class="pt-0 pb-0 pl-0">
                                    <v-text-field @focus="$event.target.select()"  v-model="localValue.phone" label="Teléfono" hint="" filled >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6" class="pt-0 pb-0 pr-0">
                                    <v-text-field @focus="$event.target.select()"  v-model="localValue.mobile" label="Móvil" hint="" filled >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" class="pa-0">
                                    <v-text-field @focus="$event.target.select()" v-model="localValue.iban" label="Iban" hint="" filled >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="6" class="pt-0 pb-0 pl-0">
                                    <v-text-field @focus="$event.target.select()" v-model="localValue.swift" label="Swift" hint="" filled >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6" class="pa-0">
                                    <v-checkbox @focus="$event.target.select()" v-model="localValue.lopd" label="El usuario ha aceptado los términos de la ley de Protección de Datos lopd."></v-checkbox>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-textarea @focus="$event.target.select()" v-model="localValue.notes" label="Notas" auto-grow rows="2" row-height="30"
                                        hint="Puedes añadir algún comentario a la información de tu cliente." filled >
                                    </v-textarea>
                                </v-col>
                            </v-row>                       
                    </v-tab-item>

                    <v-tab-item>
                        <v-row>
                        <v-col cols="12" class="pb-0 pr-0 pl-0">
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
                             <v-autocomplete autocomplete="nope" @focus="$event.target.select()" filled v-model="localValue.countries" auto-select-first  item-text="name" item-value="id" :items="COUNTRIES" label="País" ></v-autocomplete>
                        </v-col>
                    </v-row>
                    </v-tab-item>
                    </v-tabs-items>
                     </form>
            </v-container>
            <small></small>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="this.localValue.id!=undefined" color="red darken-1" :disabled="!connected" text @click="remove">
                Eliminar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="cancel">
                Cancelar
            </v-btn>
            <v-btn color="green darken-1" :disabled="!connected" text @click="save">
                Guardar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['value'],
    data: () => ({
        tab:0,
        localValue: {
            address:{}
        },
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
        ...mapActions(['CLIENT_CREATE', 'CLIENT_UPDATE', 'CLIENT_DESTROY']),
        remove(){
            if (this.localValue.id) {
                 this.CLIENT_DESTROY(this.localValue.id)
                this.$emit('remove');
            }
        },
        async save(){
            if (this.localValue.id) {
                await this.CLIENT_UPDATE(this.localValue);
            }else{
                this.localValue=await this.CLIENT_CREATE(this.localValue)
            }
            this.$emit('save', this.localValue);
        },cancel(){
             this.$emit('cancel');
        },focus(){
            this.$refs.clientName.focus();
        }
    },mounted(){
        // this.$refs.clientName.focus();
        this.localValue = this.value
    },
}
</script>

<style lang="scss">
.new-client{
    /* .v-text-field__details{
        display:none;
    }*/
    .v-input__slot{
        padding: 0 20px !important;
        margin-bottom:0px;
    } 
    .v-input--checkbox{
        margin-top:0px;
    }
}
    
</style>