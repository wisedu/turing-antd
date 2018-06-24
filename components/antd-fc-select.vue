<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Select :value="value" :placeholder="placeholder" filterable clearable @on-open-change.once="loadData('')" @on-change="onChange" @on-query-change="search" label-in-value>
            <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-select",
    extends: ConnectItem,
    data(){
        return {
            localOptions:[],
            localSelectedItem:{
                label:"",
                value:"",
                lastQuery:"",
            },
        }
    },
    computed:{
        fullOptions(){
            if (this.localOptions.length > 0) {
                return this.localOptions;
            } else {
                return this.options;
            }
        }
    },
    created(){
        if (this.model.async === false) {
            this.loadData('');
        }
    },
    methods:{
        loadData(key){
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, {key}, datas => {
                    this.localOptions = datas;
                });
            }
        },
        onChange(item){
            let selected = item;
            if (selected === undefined) {
                selected = {
                    label:undefined,
                    value:undefined
                }
            }
            this.localSelectedItem["label"] = selected.label;
            this.localSelectedItem["value"] = selected.value;
            this.$emit("on-item-change", this.name, selected.value, selected.label, this.model)
            this.$emit("input", selected.value)
        },
        search(key){
            if (key !== this.localSelectedItem.value){
                this.loadData(key)
            } else if (key === this.localSelectedItem.value && this.localSelectedItem.lastQuery !== key) {
                this.loadData('')
            }
            this.localSelectedItem.lastQuery = key;
        }
    }
}
</script>

<style>

</style>
