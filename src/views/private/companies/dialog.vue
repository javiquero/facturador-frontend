<template>
    <v-dialog v-model="showModal" persistent max-width="600px">
       <new-company v-model="localValue" @save="closeReturnValue" @remove="close" @cancel="close" ref="formCompany"/>
    </v-dialog>
</template>

<script>
    import newCompany from './new';
    export default {
        components:{newCompany},
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
                 if (this.localValue==undefined) this.localValue={};
            }
        },
        methods: {
            show() {
                this.showModal = true;  
                setTimeout(() => {
                    this.$refs.formCompany.focus();
                }, 0);
            },
            closeReturnValue(){                
                this.showModal = false;
                this.$emit('close', this.localValue);
            },
            close(){
                this.showModal = false;
                 this.$emit('close');
            }
        },mounted(){
            this.localValue=this.value;
            if (this.localValue==undefined) this.localValue={};
            // this.show();             
        }
    }
</script>

<style>

</style>