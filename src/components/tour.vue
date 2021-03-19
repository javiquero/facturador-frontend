<template>
    <v-dialog v-model="showModal" persistent max-width="600px">

        <v-tabs-items v-model="tab">
            <v-tab-item>  
                <v-sheet color="blue" height="400px" tile dark class="pa-10">
                    <v-row class="fill-height" align="center" justify="center" >
                        <div class="display-3 text-center">Bienvenido</div>
                        <div class="display-1 text-justify mb-5">En primer lugar tenemos que crear nuestra empresa para poder empezar a trabajar.
                        </div>
                        <v-btn x-large @click="tab=1">Empecemos</v-btn>
                    </v-row>
                </v-sheet>
            </v-tab-item>
            <v-tab-item>
                <new-company ref="newCompany"></new-company>
            </v-tab-item>
        </v-tabs-items>
    </v-dialog>
</template>

<script>
    import newCompany from '@/views/private/companies/new';
        import { mapGetters } from 'vuex';
    export default {
        components:{newCompany},
        data: () => ({
            tab:0,
            showModal:false
        }),
        watch:{
            tab(val){
                if (val==1) setTimeout(()=>{this.$refs.newCompany.focus();},1) 
            },
            COMPANIES(val){
                this.showModal=val.length<1;
            }
        },
        computed:{
            ...mapGetters(["COMPANIES"])
        },
        methods: {
            show() {
                this.showModal = true; 
            },           
            close(){
                this.showModal = false;
            }
        },mounted(){
                 
        }
    }
</script>

<style>

</style>