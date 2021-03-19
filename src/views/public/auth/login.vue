<template>
    <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="login-form text-xs-center">
            <div class="display-1 mb-3" style="display:flex">
                <i class="mr-2 fad fa-dot-circle" style=" font-size:40px"></i>
                <!-- <v-icon class="mr-2" large="large"></v-icon>  -->
                <span style="font-weight:bold">Facturador</span>
            </div>
            <v-card light="light">
                <v-card-text>
                    <div class="subheading mb-5">
                        <template>Accede a tu cuenta</template>
                    </div>
                    <v-form v-focus-next-on-enter @submit="onSubmit">
                        <v-text-field ref="inputLoginEmail" autocomplete="email" v-model="form.email" prepend-icon="mdi-email" label="Email"
                            type="email"></v-text-field>
                        <v-text-field v-model="form.password" autocomplete="current-password" prepend-icon="mdi-lock" label="Password" type="password">
                        </v-text-field>

                        <v-alert icon="mdi-shield-lock-outline" v-show="error" prominentt outlined color="deep-orange"
                            type="error" text transition="scale-transition">
                            <v-row align="center">
                                <v-col class="grow">
                                    {{error}}
                                </v-col>
                            </v-row>
                        </v-alert>
                        <div v-show="!error" style="height:30px;display:block;">&nbsp; </div>

                        <v-btn dark x-large :loading="loading" block="block" type="submit">Entrar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <div class="mt-2">
                <a href="/signup">Crear cuenta</a>
                <a style="float:right" href="/recover">Recuperar contraseña</a>
            </div>
        </v-flex>
    </v-layout>

</template>


<script>
    export default {
        data() {
            return {
                loading:false,
                form: {
                    email: '',
                    password: ''
                },
                error: '',
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
                this.$refs.inputLoginEmail.focus();
            }, 1)

        },
        methods: {
            checkEmailAddress: function (value) {
                if (!value || typeof value !== 'string') {
                    return false;
                }

                return (function () {
                    function _isByteLength(str, min, max) {
                        var len = encodeURI(str).split(/%..|./).length - 1;
                        return len >= min && (typeof max === 'undefined' || len <= max)
                    }
                    var emailUserUtf8Part =
                        /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
                    var quotedEmailUserUtf8 =
                        /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;

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
                            if (part[0] === '-' || part[part.length - 1] === '-' || part.indexOf('---') >=
                                0) {
                                return !1
                            }
                        }
                        return !0
                    };
                    return function (str) {
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
            validateEmailAddress: function (value) {
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
                    this.$store.dispatch('AUTH_REQUEST', {
                        email: this.form.email,
                        password: this.form.password
                    }).then(() => {
                        this.$router.push('/private').catch(() => {});
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status == '403') {
                                this.loading=false;
                                return this.error = "El correo electrónico o la contraseña no son válidos.";
                            } else if (error.response.status == '401') {
                                this.loading=false;
                                return this.error = "El correo electrónico proporcionado pertenece a una cuenta que aún no se ha activado.";
                            }
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log('Error', error.message);
                        }
                        this.loading=false;
                        return this.error = "Error de autenticación.";
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
    .login-form {
        max-width: 500px !important;

        a {
            text-decoration: none;
        }
    }
</style>