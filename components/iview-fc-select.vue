<template>
    <FormItem :label="caption" :prop="name" v-if="formReadonly !== true">
        <Select :value="value" :placeholder="placeholder" filterable remote :remote-method="search" @on-change="onChange" label-in-value :label="display">
            <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></iview-fc-static>
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
        },
        search(key){
            this.loadData()
        }
    }
}
</script>

<style>

</style>
