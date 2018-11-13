<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <CheckboxGroup :value="value" @on-change="onChange" :vertical="params.direction === 'v'">
            <Checkbox v-for="item in fullOptions" :label="item.value || item.id !== undefined ? item.value || item.id : item" :key="item.value || item.id !== undefined ? item.value || item.id : item">
                {{ item.label || item }}
            </Checkbox>
        </CheckboxGroup>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-checkboxlist",
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
        onChange(vals) {
            let label = [];
            this.fullOptions.map(item => {
                vals.map(val => {
                    if (item.value || item.id === val) {
                        label.push(item.label);
                    }
                })
            })
            this.$emit("on-item-change", this.name, vals, label, this.model)
            this.$emit("input", vals)
        }
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
