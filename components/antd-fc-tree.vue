<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Cascader :data="fullOptions" :value="values" :transfer="true" :placeholder="placeholder" @on-visible-change.once="initLoad" :load-data="loadData" filterable @on-change="onChange" v-bind="params"></Cascader>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-tree",
    extends: ConnectItem,
    data(){
        return {
            localOptions:[],
            values:[],
            displays:""
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
        if (this.value !== "") {
            this.getOneData(this.value);
        }
    },
    watch:{
//        先暂时注释掉，不知道这个监听是用在什么场景下
//        value: function(newValue, oldValue){
//            this.getOneData(newValue);
//        }
    },
    methods:{
        onChange(_value){
//            value取最后一个的值
            let len = _value.length;
            let value = '';
            if(len > 0){
                value = _value[_value.length - 1];
            }
            let label = value;
            this.$emit("on-item-change", this.name, value, label, this.model)
            this.$emit("input", value)
        },
        loadData(item, callback){
            if (this.model.dict !== undefined) {
                let key = ""
                if (item !== undefined) {
                    key = item.value;
                    item.loading = true;
                }
                defaults.getDictTreeData[0](this.model.dict, {key:key}, datas => {
                    if (item === undefined) {
                        this.localOptions = datas;
                    } else {
                        item.children = datas;
                        item.loading = false;
                    }
                    callback();
                });
            }
        },
        initLoad(){
            this.loadData(undefined, function(){return;})
        },
        getOneData(value){
            if (this.model.dict !== undefined) {
                defaults.getDictTreeDataAsync[0](this.model.dict, {key:value}, datas => {
                    this.localOptions = datas;
                    this.values = getChildrenValue({children:datas}, [])
                });
            }
        }
    }
}

function getChildrenValue(datas, values){
    if (datas.children !== undefined && datas.children.length === 1){
        values.push(datas.children[0].value);
        getChildrenValue(datas.children[0], values)
    }
    return values;
}
</script>

<style>

</style>
