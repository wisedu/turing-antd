<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <CheckboxGroup :value="value" @on-change="onChange">
            <Checkbox v-for="item in options" :label="item.value || item.id !== undefined ? item.value || item.id : item" :key="item.value || item.id !== undefined ? item.value || item.id : item">
                {{ item.label || item }}
            </Checkbox>
        </CheckboxGroup>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-checkboxlist",
    extends: ConnectItem,
    methods: {
        onChange(val) {
            let label = this.options.filter(item => item.value || item.id === val )[0].label;
            this.$emit("on-item-change", this.name, val, label, this.model)
            this.$emit("input", val)
        }
    }
}
</script>

<style>

</style>
