<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <InputNumber :max="10" :min="1" :value="value" :placeholder="placeholder" @on-change="onChange"></InputNumber>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value"></iview-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-number",
    extends: ConnectItem,
    methods:{
        onChange(item){
            let label = value;
            this.$emit("on-item-change", this.name, value, label, this.model)
        }
    }
}
</script>

<style>

</style>
