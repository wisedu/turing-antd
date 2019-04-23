<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <CheckboxGroup :value="currentValue" @on-change="onChange" :vertical="params.direction === 'v'">
            <Checkbox v-for="item in fullOptions" :label="item.value || item.id !== undefined ? item.value || item.id : item" :key="item.value || item.id !== undefined ? item.value || item.id : item">
                {{ item.label || item }}
            </Checkbox>
        </CheckboxGroup>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="valueDisplay" :display="display"></antd-fc-static>
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
        },
        currentValue(){
            const { value } = this;
            if(Object.prototype.toString.call(value) !== "[object Array]"){
                if (this.formReadonly) {
                    return value;
                } else if (value) {
                    if(Object.prototype.toString.call(value) === "[object String]"){
                        if (value.indexOf(',')>-1) {
                            return value.split(',');
                        } else {
                            return [value];
                        }
                    }
                } else {
                    return [];
                }
            }else{
                return value;
            }
        },
        valueDisplay(){
            if (this.currentValue) {
                return this.currentValue.join(',');
            }else {
                return this.currentValue;
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
        if (this.model.dict !== undefined) {
            defaults.getDictData[0](this.model.dict, {}, datas => {
                this.localOptions = datas;
            });
        }else{
            if (this.loaddata !== undefined) {
                this.loaddata(this.name, items => {
                    this.localOptions = items;
                });
            }
        }
    },
    mounted: function () {
        if(!this.formReadonly){
//            初始化时，form上的默认数据是数组，导致checkbox上未做任何数据点击时，校验不通过
            let value = this.currentValue;
            this.onChange(value);
        }
    }
}
</script>

<style>

</style>
