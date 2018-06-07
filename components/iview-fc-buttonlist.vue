<template>
    <FormItem :label="caption" :prop="name">
        <RadioGroup v-model="pData" type="button" @on-change="onChange">
            <Radio :label="item.value" v-for="item in options" :key="item.value">
                {{item.label}}
            </Radio>
        </RadioGroup>
    </FormItem>
</template>

<script>
import {FormConnectItem} from 'tg-turing'
import {getDictData} from "./Adapter";
export default {
    name:"iview-fc-buttonlist",
    extends: FormConnectItem,
    data(){
        return {
            pData:this.value
        }
    },
    methods: {
        onChange(value){
            let label = "";
            let item = this.options.filter(item=>item.value === value);
            if (item.length > 0) {
                label = item[0].label;
            }
            this.$emit("on-item-change", this.name, value, this.model, label);
        }
    },
    created(){
        if (this.model.dict !== undefined) {
            getDictData(this.model.dict, datas => {
                this.options = datas;
            });
        }
    }
}
</script>

<style>

</style>
