<template>
    <!-- <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true"> -->
        <file-upload v-model="files" :post-action="postUrl" @input-file="inputFile">
        上传文件
        </file-upload>
    <!-- </FormItem> -->
    
</template>

<script>
import {ConnectItem,utils,uuid, axios} from 'tg-turing'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
export default {
    name:"antd-fc-uploadfile-emap",
    extends: ConnectItem,
    components: {
        FileUpload: FileUpload
    },
    props:["scope"],
    data(){
        return {
            files:[],
            token: this.value,
            // postData:this.params,
            saveFileUrl: window.apiPath + '/saveFile',
        }
    },
    created() {
        axios({ method: 'get', url: utils.getContextPath() + "/sys/emapcomponent/file/upload/getFileConfig.do", params: {storeId:'file'} }).then(results => {
            console.log(results.data);
        })
        if (this.token === undefined || this.token === null) {
            this.token = uuid();
            this.$set(this.params, "token", this.token);
        } else {
            this.getFileList(this.token);
        }
    },
    computed:{
        postUrl:function(){
            return utils.getContextPath() + `/sys/emapcomponent/file/uploadTempFile/${this.scope}/${this.token}.do`;
        }
    },
    watch:{
        value:function(newValue) {
            if (newValue === undefined || newValue === null) {
                this.token = uuid();
                this.params.token = uuid();
            } else {
                this.token = newValue;
                this.params.token = newValue;
            }
            this.getFileList(this.token);
        }
    },
    methods: {
        getFileList(val) {
            utils.Get(window.apiPath + "/getFileMeta/" + val).then(results => {
                this.files = results.data;
            })
        },
        preview(file) {
            window.open(window.apiPath + file.url)
        },
        uploaded(token){
            this.$emit("on-item-change", this.name, this.token, "", this.model)
            this.$emit("input", this.token)
        },
        remove(file, fileList) {
            utils.Get(window.apiPath + "/removeFile/" + file).then(results => {
                this.token = results.data;
                this.$emit("on-item-change", this.name, this.token, "", this.model)
                this.$emit("input", this.token)
            })
        },
        inputFile(){
            debugger;
        }
    }
}
</script>

<style>

</style>
