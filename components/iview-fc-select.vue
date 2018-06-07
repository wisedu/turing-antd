<template>
    <FormItem :label="caption" :prop="name">
        <Select v-model="currentValue" :placeholder="placeholder" @on-open-change.once="loadData" filterable>
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
                    this.spinShow = false;
                });
            }
        }
    }
}
</script>

<style>

</style>
