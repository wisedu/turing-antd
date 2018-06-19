<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Select :value="value" :placeholder="placeholder" filterable remote :remote-method="search" @on-change="onChange" label-in-value :label="display">
            <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></iview-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"iview-fc-select",
    extends: ConnectItem,
    data(){
        return {
            localOptions:[]
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
    methods:{
        loadData(){
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, datas => {
                    this.localOptions = datas;
                });
            }
        },
        onChange(item){
            this.$emit("on-item-change", this.name, item.value, item.label, this.model)
        },
        search(key){
            this.loadData()
        }
    }
}
</script>

<style>

</style>
