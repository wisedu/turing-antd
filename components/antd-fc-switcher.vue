<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <i-switch :value="value" :true-value="true" :false-value="false" @on-change="onChange" v-bind="params"></i-switch>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-switcher",
    extends: ConnectItem,
    methods: {
        onChange(val) {
            this.$emit("on-item-change", this.name, val, val, this.model)
            this.$emit("input", val)
        }
    }
}
</script>

<style>

</style>
