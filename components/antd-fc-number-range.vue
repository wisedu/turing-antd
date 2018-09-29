<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Slider :value="value" range :min="params.min" :max="params.max" @on-change="onChange" v-bind="params"></Slider>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-number-range",
    extends: ConnectItem,
    methods:{
        onChange(value){
            let label = value;
            this.$emit("on-item-change", this.name, value, value, this.model)
            this.$emit("input", value)
        }
    }
}
</script>

<style>

</style>
