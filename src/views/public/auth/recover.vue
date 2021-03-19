<template>
    <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="pass-recover-form text-xs-center">
            <div class="display-1 mb-3" style="display:flex">
                <i class="mr-2 fad fa-dot-circle" style=" font-size:40px"></i>
                <span style="font-weight:bold">Facturador</span>
            </div>
            <v-card light="light">
                <v-card-text>
                    <div class="subheading mb-5">
                        <template>Recuperar contraseña
                        </template>
                    </div>
                    <v-form @keydown.enter.native="onSubmit" @submit="onSubmit">
                        <v-text-field ref="inputRecoverEmail" v-model="form.email" prepend-icon="mdi-email" label="Email" type="email" hint="Introduzca su email y le enviaremos instrucciones para cambiar la contraseña.">
                        </v-text-field>
                        <v-alert  v-show="responseSuccess==true"  outlined type="success" text transition="scale-transition">
                            <v-row align="center">
                                <v-col class="grow">
                                    Mail de recuperación enviado
                                </v-col>
                            </v-row>
                        </v-alert>
                        <v-alert icon="mdi-shield-lock-outline" v-show="error" prominentt outlined color="deep-orange" type="error" text transition="scale-transition">
                            <v-row align="center">
                                <v-col class="grow">
                                    {{error}}
                                </v-col>
                            </v-row>
                        </v-alert>
                        <div v-show="!error&&!responseSuccess" style="height:30px;display:block;">&nbsp; </div>

                         <v-btn :disabled="responseSuccess" :loading="loading" :dark="!responseSuccess" x-large block type="submit">Enviar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <div class="mt-2 text-center">
                Volver a 
                <a  href="/Login">Inicio</a>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    email: ''
                },
                error: '',
                loading:false,
                responseSuccess: false,
            }
        },mounted() {
            setTimeout(() => {
                this.$refs.inputRecoverEmail.focus();
            }, 1)

        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.loading=true;
                this.$store.dispatch('AUTH_RECOVER', this.form.email).then(() => {
                    this.responseSuccess = true;
                    this.loading=false;
                    //this.$router.push({name:'dashboard'});
                }).catch(error => {
                    if (error.response) {
                        if (error.response.status == "500") {
                            this.loading=false;
                            return this.error = error.response.data;
                        } else {
                            console.log(error.response);
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error);
                    }
                    this.loading=false;
                    return this.error = "Error del servidor.";
                });

            }
        }

    }

</script>
<style lang="scss">
    .pass-recover-form {
        max-width: 500px !important;

        a {
            text-decoration: none;
        }
    }
</style>
