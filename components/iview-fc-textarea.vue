<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Input :value="value" type="textarea" :placeholder="placeholder" :readonly="readonly"
        :maxlength="params.maxlength" @input="onChange" :disabled="disabled" :rows="params.rows" :autosize="params.autosize">
        </Input>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></iview-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-textarea",
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
