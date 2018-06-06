<template>
    <FormItem :label="caption" :prop="name">
        <Input :value="value" :placeholder="placeholder" :readonly="readonly" 
        :maxlength="params.maxlength" @input="onChange" :disabled="disabled">
            <span slot="append" v-if="params.append">{{params.append}}</span>
        </Input>
    </FormItem>
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
