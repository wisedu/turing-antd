<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <RadioGroup v-model="pData" type="button" @on-change="onChange">
            <Radio :label="item.value" v-for="item in fullOptions" :key="item.value">
                {{item.label}}
            </Radio>
        </RadioGroup>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-buttonlist",
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
            this.$emit("on-item-change", this.name, value, label, this.model);
        }
    },
    created(){
        if (this.model.dict !== undefined) {
            defaults.getDictData[0](this.model.dict, {}, datas => {
                this.localOptions = datas;
            });
        }
    }
}
</script>

<style>

</style>
