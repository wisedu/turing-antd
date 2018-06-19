<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Input :value="value" :placeholder="placeholder" :readonly="readonly" :icon="params.icon" :clearable="params.clearable"
        :maxlength="params.maxlength" @input="onChange" :disabled="disabled">
            <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
            <span slot="append" v-if="params.append">{{params.append}}</span>
        </Input>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></iview-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-text",
    extends: ConnectItem,
    methods:{
        onChange(value){
            let label = value;
            this.$emit("on-item-change", this.name, value, label, this.model)
        }
    }
}
</script>

<style>

</style>
