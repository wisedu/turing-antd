<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="!params.tooltip === true">
            <!--DatePicker这段是一样的-->
            <Select ref="ctl" :value="value" :placeholder="placeholder" dis-filterable clearable @on-open-change.once="loadData('')" @on-change="onChange" label-in-value transfer>
                <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <!--DatePicker这段是一样的-->
            <Select ref="ctl" :value="value" :placeholder="placeholder" dis-filterable clearable @on-open-change.once="loadData('')" @on-change="onChange" label-in-value transfer>
                <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Tooltip>
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
            let selected_opt = {label: this.display, value: this.value};
            let opts = [];
            if (this.localOptions.length === 0 && this.value !== undefined) {
                opts.push(selected_opt);
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
        }
    },
    created(){
        // const def_async = defaults.antd.form["select"].async;
        // if (this.model.async === undefined && def_async === false || this.model.async === false) {
        //     this.loadData('');
        // }
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
                this.$refs.ctl.clearSingleSelect();
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
.input-hasTip .ivu-select-selection{
    border-color: #ff9900;
}
.input-hasTip .ivu-select-input:focus{
    box-shadow: 0 0 0 2px rgba(255,153,00,.2)
}
</style>
