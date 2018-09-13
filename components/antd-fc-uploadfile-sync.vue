<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <input type="file" :name="name" @change="onChange">
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'

export default {
    name:"antd-fc-uploadfile-sync",
    extends: ConnectItem,
    methods:{
        onChange(value){
            //上传文件，通过设置undefined，将原有的key清楚，只保留input type=file的对象
            this.$emit("on-item-change", this.name, undefined, undefined, this.model)
            this.$emit("input", undefined)
        }
    }
}
</script>

<style>

</style>
