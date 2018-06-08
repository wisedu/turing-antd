<template>
    <FormItem :label="caption" :prop="name" v-if="formReadonly !== true">
        <InputNumber :max="10" :min="1" :value="value" :placeholder="placeholder" @on-change="onChange"></InputNumber>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value"></iview-fc-static>
</template>

<script>
import {FormConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-number",
    extends: FormConnectItem,
    methods:{
        onChange(item){
            this.$emit("on-item-change", this.name, value, this.model)
        }
    }
}
</script>

<style>

</style>
