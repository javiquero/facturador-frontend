<template>
    <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="new-password-form text-xs-center">
            <div class="display-1 mb-3" style="display:flex">
                <i class="mr-2 fad fa-dot-circle" style=" font-size:40px"></i>
                <!-- <v-icon class="mr-2" large="large"></v-icon>  -->
                <span style="font-weight:bold">Facturador</span>
            </div>
            <v-card light="light">
                <v-card-text>
                    <div class="subheading mb-5">
                        <template>Actualizar contraseña</template>
                    </div>
                    <v-form v-focus-next-on-enter @submit="onSubmit">
                        <v-text-field v-model="password" autocomplete="new-password" ref="inputPassChange" prepend-icon="mdi-lock" label="Contraseña" hint="Introduce tu nueva contraseña." type="password">
                        </v-text-field>
                        <v-text-field v-model="confirm" autocomplete="new-password" prepend-icon="mdi-lock" label="Confirmar" hint="Vuelve a introducir tu nueva contraseña." type="password">
                        </v-text-field>
						<v-alert transition="scale-transition" v-if="interval"  outlined type="success" text >
                        	Tu contraseña ha sido cambiada<br/>seras redirigido en {{redirect}} sec.
                    	</v-alert>
						<v-alert transition="scale-transition" v-if="error!=''" outlined type="error" text >
							<div v-html="error"></div>
						</v-alert>
                        <div v-show="!error" style="height:30px;display:block;">&nbsp; </div>

                        <v-btn v-if="!interval" dark x-large :loading="loading" block="block" type="submit">Guardar</v-btn>
						<v-btn v-else dark x-large block to="/private">Ir al area privada</v-btn>
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
	data(){
		return {
			password:'',
			confirm: '',
			error:'',
			redirect:0,
			interval: undefined,
			loading:false,
		}
	},mounted() {
            setTimeout(() => {
                this.$refs.inputPassChange.focus();
            }, 1)

        }, methods:{
		 initCounter: function() {
			this.redirect = 5;
			this.interval = window.setInterval(() => {
				if (this.redirect > 0) {
					this.redirect -= 1;
				} else {
					this.$router.push({
						name: 'dashboard'
					});
					window.clearInterval(this.interval);
				}
			}, 1000);
		},
		 onSubmit(evt) {
            evt.preventDefault();
			let token = this.$route.query.token;
			if (!token) return this.error = "Token inválido, reintentalo o contacta con nuestro soporte.";
			if (this.password != this.confirm) return this.error="La contraseña debe ser la misma en las 2 casillas.";
			
			this.loading=true;
			this.$store.dispatch('AUTH_PASSWORD_CHANGE', {token:token, password: this.password}).then(() => {
				this.initCounter();
				this.loading=false;
			}).catch(error => {
				this.loading=false;
				if (error.response) {
					if (error.response.status == '498' || error.response.status == '403') {
						this.error = "El token proporcionado está caducado, no es válido o ya está agotado.";
					} else if (error.response.status == '409') {
						this.error = "La dirección de correo electrónico ya no está disponible. Vuelve a crear la cuenta.";
					} else{
						this.error = "Error al guardar la nueva contraseña.";
					}
				} else {
					this.error = "Error al guardar la nueva contraseña";
				}
			});
		}, mounted() {
			this.loading=false;
			let token = this.$route.query.token;
            if (!token) this.$router.push('/home')
		},
	}
}
</script>

<style lang="scss"> 
	.new-password-form{
        max-width: 500px !important;
        a {
            text-decoration: none;
        }
    }
</style>
