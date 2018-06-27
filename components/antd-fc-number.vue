<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Input ref="input_com" :value="value" :placeholder="placeholder" :readonly="readonly" number :icon="params.icon" :clearable="params.clearable" :maxlength="params.maxlength" @input="onChange" :disabled="disabled">
            <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
            <span slot="append" v-if="params.append">{{params.append}}</span>
        </Input>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-number",
    extends: ConnectItem,
    methods:{
        onChange(value){
            let label = value;
            this.$emit("on-item-change", this.name, value, label, this.model)
            this.$emit("input", value)
        }
    }
}
</script>

<style>

</style>
