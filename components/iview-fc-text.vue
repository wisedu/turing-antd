<template>
    <FormItem :label="caption" :prop="name" v-if="formReadonly !== true">
        <Input :value="value" :placeholder="placeholder" :readonly="readonly" 
        :maxlength="params.maxlength" @input="onChange" :disabled="disabled">
            <span slot="append" v-if="params.append">{{params.append}}</span>
        </Input>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></iview-fc-static>
</template>

<script>
import {FormConnectItem} from 'tg-turing'

export default {
    name:"iview-fc-text",
    extends: FormConnectItem,
    methods:{
        onChange(value){
            this.$emit("on-item-change", this.name, value, this.model)
        }
    }
}
</script>

<style>

</style>
