<template>
    <FormItem :label="caption" :prop="name" v-if="formReadonly !== true">
        <DatePicker :value="value" type="date" :placeholder="placeholder" style="width:100%" @on-change="onChange"></DatePicker>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value"></iview-fc-static>
</template>

<script>
import {FormConnectItem} from 'tg-turing'

export default {
    name:"iview-fc-date",
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


