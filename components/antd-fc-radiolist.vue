<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <RadioGroup :value="value" @on-change="onChange">
            <Radio v-for="item in options" :label="item.value !== undefined ? item.value : item" :key="item.value !== undefined ? item.value : item">
                {{ item.label || item }}
            </Radio>
        </RadioGroup>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-radiolist",
    extends: ConnectItem,
    methods: {
        onChange(item) {
            let label = value;
            this.$emit("on-item-change", this.name, value, label, this.model)
        }
    }
}
</script>

<style>

</style>
