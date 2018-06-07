<template>
    <FormItem :label="caption" :prop="name">
        <Select :value="value" :placeholder="placeholder" @on-open-change.once="loadData" filterable @on-change="onChange" label-in-value>
            <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </FormItem>
</template>

<script>
import {FormConnectItem} from 'tg-turing'
import {getDictData} from "./Adapter";
export default {
    name:"iview-fc-select",
    extends: FormConnectItem,
    methods:{
        loadData(){
            if (this.model.dict !== undefined) {
                getDictData(this.model.dict, datas => {
                    this.options = datas;
                });
            }
        },
        onChange(item){
            this.$emit("on-item-change", this.name, item.value, this.model, item.label)
        }
    }
}
</script>

<style>

</style>
