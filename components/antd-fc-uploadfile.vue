<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Alert type="warning">可上传图片或压缩包</Alert>
        <Upload :action="saveFileUrl" :data="this.params" :default-file-list="files" multiple
        :on-success="uploaded" :on-preview="preview" :on-remove="remove">
            <Button icon="ios-cloud-upload-outline">上传附件</Button>
        </Upload>
    </FormItem>
    <Upload v-else action :data="params" :default-file-list="files" :on-preview="preview"></Upload>
</template>

<script>
import {ConnectItem,utils,uuid} from 'tg-turing'
export default {
    name:"antd-fc-uploadfile",
    extends: ConnectItem,
    data(){
        return {
            files:[],
            token: this.value,
            // postData:this.params,
            saveFileUrl: window.apiPath + '/saveFile',
        }
    },
    created() {
        if (this.token === undefined || this.token === null || this.token === "") {
            this.token = uuid();
            this.$set(this.params, "token", this.token);
        } else {
            this.getFileList(this.token);
        }
    },
    watch:{
        value:function(newValue) {
            if (newValue === undefined || newValue === null || newValue === "") {
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
        uploaded(response, file){
            file.token = this.token;
            file.url = response[0].url;
            file.id = response[0].id;
            this.$emit("on-item-change", this.name, this.token, "", this.model)
            this.$emit("input", this.token)
        },
        remove(file, fileList) {
            utils.Get(`${window.apiPath}/removeFile/${file.id}/${file.token}`).then(results => {
                this.token = results.data;
                this.$emit("on-item-change", this.name, file.token, file.name, this.model)
                this.$emit("input", this.token)
            })
        }
    }
}
</script>

<style>

</style>
