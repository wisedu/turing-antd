<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--input这段是一样的-->
            <Input ref="input_com" :value="value" :placeholder="placeholder" :readonly="readonly" number v-bind="params" @input="onChange" :disabled="disabled">
                <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
                <span slot="append" v-if="params.append">{{params.append}}</span>
            </Input>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <!--input这段是一样的-->
            <Input ref="input_com" :value="value" :placeholder="placeholder" :readonly="readonly" number v-bind="params" @input="onChange" :disabled="disabled">
                <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
                <span slot="append" v-if="params.append">{{params.append}}</span>
            </Input>
        </Tooltip>
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
