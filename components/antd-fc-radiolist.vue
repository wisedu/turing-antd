<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <RadioGroup :value="value" @on-change="onChange">
            <Radio v-for="item in fullOptions" :label="item.value || item.id !== undefined ? item.value || item.id : item" :key="item.value || item.id !== undefined ? item.value || item.id : item">
                {{ item.label || item }}
            </Radio>
        </RadioGroup>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-radiolist",
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
    methods: {
        onChange(val) {
            let option = this.fullOptions.find(item => item.value || item.id === val );
            let label = option !== undefined ? option.label : "";
            this.$emit("on-item-change", this.name, val, label, this.model)
            this.$emit("input", val)
        },
    },
    created(){
        if (this.loaddata !== undefined) {
            this.loaddata(this.name, items => {
                this.localOptions = items;
            });
        } else {
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, {}, datas => {
                    this.localOptions = datas;
                });
            }
        }
    }
}
</script>

<style>

</style>
