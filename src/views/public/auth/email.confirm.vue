<template>
    <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="confirm-email-form text-xs-center">
            <div class="display-1 mb-3" style="display:flex">
                <i class="mr-2 fad fa-dot-circle" style=" font-size:40px"></i>
                <!-- <v-icon class="mr-2" large="large"></v-icon>  -->
                <span style="font-weight:bold">Facturador</span>
            </div>
            <v-card light="light">
                <v-card-text>
                    <div class="subheading mb-5">
                        <template>Verificación de correo</template>
                    </div>
                    <v-alert  v-if="interval"  outlined type="success" text >
                        Tu cuenta ha sido activada <br /> seras redirigido en {{redirect}} sec.
                    </v-alert>
                    <v-alert  v-if="errorMsg!=''" outlined type="error" text >
                        <div v-html="errorMsg"></div>
                    </v-alert>
                    <v-btn v-show="!errorMsg" dark x-large block to="/private">Ir al area privada</v-btn>
                </v-card-text>
            </v-card>           
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                errorMsg: '',
                redirect: 0,
                interval: undefined
            }
        },
        methods: {
            initCounter: function() {
                this.redirect = 5;
                this.interval = window.setInterval(() => {
                    if (this.redirect > 0) {
                        this.redirect -= 1;
                    } else {
                        this.$router.push({name: 'dashboard'});
                        window.clearInterval(this.interval);
                    }
                }, 1000);
            }
        },
        mounted: function() {
            this.initCounter();
            let token = this.$route.query.token;
            if (!token) return this.errorMsg = 'Token no válido, por favor vuelve <br />  al correo electrónico y inténtalo de nuevo.';
		
			this.$store.dispatch('AUTH_EMAIL_CONFIRM', token).then(() => {
				this.initCounter();
			}).catch(error => {
				if (error.response) {
					if (error.response.status == '498' || error.response.status == '403') {
						this.errorMsg = "El token proporcionado está vencido, no es válido <br/> o ya está agotado.";
					} else if (error.response.status == '409') {
						this.errorMsg = "La dirección de correo electrónico ya no está disponible. Vuelve a crear la cuenta.";
					} else{
						this.errorMsg = "Error al validar la cuenta de correo electrónico.";
					}
				} else {
					this.errorMsg = "Error al validar la cuenta de correo electrónico.";
				}
			});			
        }
    }

</script>

<style lang="scss">
    .confirm-email-form{
        max-width: 500px !important;
        a {
            text-decoration: none;
        }
    }
</style>
