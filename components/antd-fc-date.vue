<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--DatePicker这段是一样的-->
            <DatePicker :value="value" type="date" :placeholder="placeholder" style="width:100%" @on-change="onChange" transfer></DatePicker>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <DatePicker :value="value" type="date" :placeholder="placeholder" style="width:100%" @on-change="onChange" transfer></DatePicker>
        </Tooltip>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'

export default {
    name:"antd-fc-date",
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


