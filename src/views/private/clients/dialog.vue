<template>
    <v-dialog v-model="showModal" persistent max-width="600px">
       <new-client v-model="localValue" @save="closeReturnValue" @remove="close" @cancel="close" ref="formClient"/>
    </v-dialog>
</template>

<script>
    import newClient from './new';
    export default {
        components:{newClient},
        props: ['value'],
        data: () => ({
            showModal:false,     
            localValue:{}
        }),
        watch: {
            localValue(value) {
                this.$emit('input', value);
            },
            value(value) {
                this.localValue = value
                 if (this.localValue==undefined) this.localValue={address:{}};
            }
        },
        methods: {
            show() {
                this.showModal = true;  
                setTimeout(() => {
                    this.$refs.formClient.focus();
                }, 0);
            },
            closeReturnValue(){                
                this.showModal = false;
                this.$emit('close', this.localValue);
            },
            close(){
                this.showModal = false;
            }
        },mounted(){
            this.localValue=this.value;
            if (this.localValue==undefined) this.localValue={address:{}};
            // this.show();             
        }
    }
</script>

<style>

</style>