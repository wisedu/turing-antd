<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--DatePicker这段是一样的-->
            <Select ref="ctl" :value="currentValue" :placeholder="placeholder" :disabled="readonly" dis-filterable :clearable="!readonly" @on-open-change="loadData('')" @on-change="onChange" label-in-value transfer :multiple="isMultiple" v-bind="params">
                <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <!--DatePicker这段是一样的-->
            <Select ref="ctl" :value="currentValue" :placeholder="placeholder" :disabled="readonly" dis-filterable :clearable="!readonly" @on-open-change="loadData('')" @on-change="onChange" label-in-value transfer :multiple="isMultiple" v-bind="params">
                <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Tooltip>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="currentValue" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem,defaults} from 'tg-turing'
export default {
    name:"antd-fc-select",
    extends: ConnectItem,
    props:["multiple","async"],
    data(){
        return {
            localOptions:[],
            // localSelectedItem:{
            //     label:"",
            //     value:"",
            //     lastQuery:"",
            // },
        }
    },
    computed:{
        isMultiple(){
            return this.multiple === true ? true : false;
        },
        fullOptions(){
            let opts = [];
            if (this.async === false) {

            }else{
                //YBT-3171 【表单】下拉选项列表存在空白的可选区域
                if(this.display){
                    let selected_opt = {label: this.display, value: this.value};
                    if (this.localOptions.length === 0 && this.value !== undefined) {
                        opts.push(selected_opt);
                    }
                }
            }
            this.options.map(item => {
                if (opts.filter(opt => opt.value === item.value).length === 0) {
                    opts.push(item)
                }
            })
            this.localOptions.map(item => {
                if (opts.filter(opt => opt.value === item.value).length === 0) {
                    opts.push(item)
                }
            })
            return opts;
        },
        currentValue(){
            const { value } = this;
            if(value == null){
                return ''
            }else{
                return value
            }
        }
    },
    created() {
        if (this.async === false) {
            this.loadData('');
        }
    },
    methods:{
        loadData(key){
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, {key}, datas => {
                    this.localOptions = datas;
                });
            }else{
                if (this.loaddata !== undefined) {
                    this.loaddata(this.name, items => {
                        if (Array.isArray(items) === false) {
                            this.localOptions = [];
                        } else {
                            this.localOptions = items;
                        }
                    });
                }
            }
        },
        onChange(item){
            if (this.multiple === true) {
                let values = [], labels = [];
                item.map(i => {
                    values.push(i.value);
                    labels.push(i.label);
                });
                if (item.length === 0) {
                    values = undefined;
                    labels = undefined;
                }
                this.$emit("on-item-change", this.name, values, labels, this.model)
                this.$emit("input", values)
            } else {
                let selected = item;
                if (selected === undefined) {
                    this.$refs.ctl.clearSingleSelect();
                    selected = {
                        label:undefined,
                        value:undefined
                    }
                }
                // this.localSelectedItem["label"] = selected.label;
                // this.localSelectedItem["value"] = selected.value;
                this.$emit("on-item-change", this.name, selected.value, selected.label, this.model)
                this.$emit("input", selected.value)
            }
        },
        // search(key){
        //     if (key !== this.localSelectedItem.value){
        //         this.loadData(key)
        //     } else if (key === this.localSelectedItem.value && this.localSelectedItem.lastQuery !== key) {
        //         this.loadData('')
        //     }
        //     this.localSelectedItem.lastQuery = key;
        // }
    }
}
</script>

<style>
.input-hasTip .ivu-select-selection{
    border-color: #ff9900;
}
.input-hasTip .ivu-select-input:focus{
    box-shadow: 0 0 0 2px rgba(255,153,00,.2)
}
</style>
