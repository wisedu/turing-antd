<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <CheckboxGroup :value="value" @on-change="onChange" :vertical="params.direction === 'v'">
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
        onChange(vals) {
            let label = [];
            this.options.map(item => {
                vals.map(val => {
                    if (item.value || item.id === val) {
                        label.push(item.label);
                    }
                })
            })
            this.$emit("on-item-change", this.name, vals, label, this.model)
            this.$emit("input", vals)
        }
    }
}
</script>

<style>

</style>
