<template>
  <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="signup-form text-xs-center">
            <div class="display-1 mb-3" style="display:flex">
                <i class="mr-2 fad fa-dot-circle" style=" font-size:40px"></i>
                <!-- <v-icon class="mr-2" large="large"></v-icon>  -->
                <span style="font-weight:bold">Facturador</span>
            </div>
            <v-card >
                <v-card-text>
                    <div class="subheading mb-5">
                        <template>Empieza gratis ya</template>
                    </div>
                    <v-form v-focus-next-on-enter @submit="onSubmit">
                        <v-row>
                            <v-col cols="12" sm="6" class="pt-0 pb-0">
                                <v-text-field ref="inputLoginName" autocomplete="name" v-model="form.name" required label="Nombre" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" class="pt-0 pb-0">
                                <v-text-field v-model="form.surname" autocomplete="surname" required label="Apellido" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-0">
                                <v-text-field v-model="form.phone" autocomplete="tel" required label="Teléfono" type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-0">
                                <v-text-field v-model="form.email" autocomplete="email" required label="Email" type="email"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-0">
                                <v-text-field v-model="form.password" required label="Contraseña" type="password"></v-text-field>
                            </v-col>
                            <v-col  cols="12" class="pt-0 pb-0">
                                <v-alert icon="mdi-shield-lock-outline" v-show="error" outlined color="deep-orange" type="error" text transition="scale-transition">
                                    <v-row align="center">
                                        <v-col class="grow">
                                            {{error}}
                                        </v-col>
                                    </v-row>
                                </v-alert>
                                <v-alert  v-show="signupSuccess==true"  outlined type="success" text transition="scale-transition">
                                    <v-row align="center">
                                        <v-col class="grow">
                                            Te hemos enviado un email para activar la cuenta
                                        </v-col>
                                    </v-row>
                                </v-alert>
                                <div v-show="!error&&!signupSuccess" style="height:30px;display:block;">&nbsp; </div>
                            </v-col>
                            <v-col cols="12" class="pt-0 pb-0">
                                <v-checkbox v-model="check1" class="mt-0">
                                    <template v-slot:label>
                                        <span class="text-justify"> He leído y acepto la <a href="/es/privacidad" target="_blank">Política de Privacidad</a> y los <a href="/es/tyc" target="_blank">Términos y Condiciones</a>, y consiento el tratamiento de mis datos personales
                                        </span>
                                    </template>
                                </v-checkbox>
                                <v-checkbox v-model="check2" class="mt-0">
                                    <template v-slot:label>
                                        <span class="text-justify"> Consiento el envío de newsletters o comunicaciones comerciales
                                        </span>
                                    </template>
                                </v-checkbox>
                            </v-col>
                        </v-row>
                        <v-btn :disabled="signupSuccess" :loading="loading" :dark="!signupSuccess" x-large block type="submit">Empezar ya</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <div class="mt-2 text-center">
                ¿Ya tienes cuenta?
                <a  href="/login">Accede</a>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                form: {
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    password: ''
                },
                check1: false,
                check2: false,
                error: '',
                signupSuccess: false
            }
        },
        watch: {
            error(val) {
                if (val != '' && val != undefined) {
                    setTimeout(() => {
                        this.error = ''
                    }, 3000)
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.$refs.inputLoginName.focus();
            }, 1)

        },
        methods: {
            checkEmailAddress: function(value) {
                if (!value || typeof value !== 'string') {
                    return false;
                }

                return (function() {
                    function _isByteLength(str, min, max) {
                        var len = encodeURI(str).split(/%..|./).length - 1;
                        return len >= min && (typeof max === 'undefined' || len <= max)
                    }
                    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
                    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;

                    function _isFQDN(str) {
                        var options = {
                            require_tld: !0,
                            allow_underscores: !1,
                            allow_trailing_dot: !1
                        };
                        if (options.allow_trailing_dot && str[str.length - 1] === '.') {
                            str = str.substring(0, str.length - 1)
                        }
                        var parts = str.split('.');
                        if (options.require_tld) {
                            var tld = parts.pop();
                            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                                return !1
                            }
                        }
                        for (var part, i = 0; i < parts.length; i++) {
                            part = parts[i];
                            if (options.allow_underscores) {
                                if (part.indexOf('__') >= 0) {
                                    return !1
                                }
                                part = part.replace(/_/g, '')
                            }
                            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                                return !1
                            }
                            if (/[\uff01-\uff5e]/.test(part)) {
                                return !1
                            }
                            if (part[0] === '-' || part[part.length - 1] === '-' || part.indexOf('---') >= 0) {
                                return !1
                            }
                        }
                        return !0
                    };
                    return function(str) {
                        var parts = str.split('@'),
                            domain = parts.pop(),
                            user = parts.join('@');
                        var lower_domain = domain.toLowerCase();
                        if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
                            user = user.replace(/\./g, '').toLowerCase()
                        }
                        if (!_isByteLength(user, 0, 64) || !_isByteLength(domain, 0, 256)) {
                            return !1
                        }
                        if (!_isFQDN(domain)) {
                            return !1
                        }
                        if (user[0] === '"') {
                            user = user.slice(1, user.length - 1);
                            return quotedEmailUserUtf8.test(user)
                        }
                        var pattern = emailUserUtf8Part;
                        var user_parts = user.split('.');
                        for (var i = 0; i < user_parts.length; i++) {
                            if (!pattern.test(user_parts[i])) {
                                return !1
                            }
                        }
                        return !0
                    }
                })()(value);
            },
            validateEmailAddress: function(value) {
                return new Promise((resolve, reject) => {
                    if (value === '') {
                        reject(new Error('El correo electrónico no puede estar vacío'));
                    } else if (!this.checkEmailAddress(value)) {
                        reject(new Error('Dirección de correo electrónico no válida!'));
                    } else {
                        resolve();
                    }
                })
            },
            onSubmit(evt) {
                this.loading=true;
                evt.preventDefault();
                this.validateEmailAddress(this.form.email).then(() => {
                    const _this = this;
                    this.$store.dispatch('AUTH_SIGNUP_REQUEST', {
                        name: this.form.name,
                        surname: this.form.surname,
                        email: this.form.email,
                        phone: this.form.phone,
                        password: this.form.password,
                        privacity: this.check1,
                        lopd: this.check2
                    }).then(() => {
                        this.signupSuccess = true;
                        this.loading=false;
                        //this.$router.push({name:'dashboard'});
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status == "409") {
                                this.loading=false;
                                return this.error = "La dirección de correo electrónico proporcionada ya está en uso.";
                            } else if (error.response.status == "400") {
                                console.log(error.response);
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
                        return this.error = "Error en el proceso de registro.";
                    });
                }).catch((error) => {
                    this.loading=false;
                    console.log(error);
                    this.error = error;
                })
            }
        }
    }

</script>
<style lang="scss">
    .signup-form {
        max-width: 700px !important;

        a {
            text-decoration: none;
        }
    }
</style>
