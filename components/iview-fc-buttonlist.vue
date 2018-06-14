<template>
    <FormItem :label="caption" :prop="name" v-if="formReadonly !== true">
        <RadioGroup v-model="pData" type="button" @on-change="onChange">
            <Radio :label="item.value" v-for="item in fullOptions" :key="item.value">
                {{item.label}}
            </Radio>
        </RadioGroup>
    </FormItem>
    <iview-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></iview-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
import {getDictData} from "./Adapter";
export default {
    name:"iview-fc-buttonlist",
    extends: ConnectItem,
    data(){
        return {
            pData:this.value,
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
    methods: {
        onChange(value){
            let label = "";
            let item = this.fullOptions.filter(item=>item.value === value);
            if (item.length > 0) {
                label = item[0].label;
            }
            this.$emit("on-item-change", this.name, value, this.model, label);
        }
    },
    created(){
        if (this.model.dict !== undefined) {
            getDictData(this.model.dict, datas => {
                this.localOptions = datas;
            });
        }
    }
}
</script>

<style>

</style>
