<template>
    <div class="f-logo">
        <div class="not-found" v-if="localValue==undefined">
            <p>Without logo</p> 
        </div>        
        <img v-else :src="pathImages+'/api/v1/data/companies/logo/get/'+ localValue + '?token=' + $store.state.auth.token" alt="">    
        <input v-if="edit==true" id="image-upload" @change="uploadFieldChange" name="images" :accept="accept" type="file">    
    </div>
</template>

<script>
 import { mapActions } from 'vuex';
 import config from "@/config/index.js"
export default {
    name: 'logo',
    props: ['value', 'edit'],
    data: () => ({ 
        localValue:undefined,
        pathImages: config.socketUrl,
    }),
    watch: {
        localValue(value) {
            this.$emit('input', value);
        },
        value(value) {
            this.localValue = value
        }
    },
    methods:{
        ...mapActions (["SEND_LOGO"]),
        async uploadFieldChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length)  return false
            // for (let i = 0; i < files.length; i++) {
                // this.createImage(files[i]);
            // }
            this.localValue = await this.SEND_LOGO(files[0]);
            if (document.getElementById('image-upload')) {
                document.getElementById('image-upload').value = []
            }
        },
    },mounted(){
        this.localValue=this.value
    }
}
</script>

<style lang="scss">
    .f-logo{
        width: 100%;   
        height:100%;
        padding-bottom: 28px;
        position: relative;
        text-align:center;
        img {
            height:100%;max-width:100%;
        }
        .not-found{
            font-weight: bold;
            font-size: 50px;
            border: 1px solid lightgray; 
            color:lightgray; 
            text-align:center;
            height:100%;
            border-radius: 3px;
            p{
                margin: 0;
                line-height:50px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -60%);
            }
       
        }        
            #image-upload {
                opacity: 0.0;

                /* IE 8 */
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";

                /* IE 5-7 */
                filter: alpha(opacity=0);
                
                /* Netscape or and older firefox browsers */
                -moz-opacity: 0.0;

                /* older Safari browsers */
                -khtml-opacity: 0.0;

                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height:100%;
                cursor: pointer;
            }
    }
</style>