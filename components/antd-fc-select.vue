<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--DatePicker这段是一样的-->
            <Select ref="ctl" :is-from-antd="true" :filterable="false" :value="currentValue" :page-total="localTotal" :page-current="page.index" :placeholder="placeholder" :disabled="readonly" dis-filterable :clearable="!readonly" @page-change="pageChange" @search-key-change="searchKeyChange"  @on-open-change="onOpenChange" @on-change="onChange" label-in-value transfer :multiple="isMultiple" v-bind="params">
                <Option v-for="item in fullOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <!--DatePicker这段是一样的-->
            <Select ref="ctl" :is-from-antd="true" :filterable="false" :value="currentValue" :page-total="localTotal" :page-current="page.index" :placeholder="placeholder" :disabled="readonly" dis-filterable :clearable="!readonly" @page-change="pageChange" @search-key-change="searchKeyChange"  @on-open-change="onOpenChange" @on-change="onChange" label-in-value transfer :multiple="isMultiple" v-bind="params">
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
            allOptions: [],
            localTotal: 0,
            localOptions:[],
            page: {
                index: 1,
                size: 50
            },
            searchKey: '',
            showPage: true,
            filterField: 'label'
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
//            this.options.map(item => {
//                if (opts.filter(opt => opt.value === item.value).length === 0) {
//                    opts.push(item)
//                }
//            })
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
            }else if(this.multiple){
                return String(value).split(',');
            }else {
                return value;
            }
        }
    },
    created() {
        if (this.async === false) {
            this.loadData('');
        }else if(this.options && this.options.length > 0){
            this.loadData('');
        }
    },
    methods:{
        onOpenChange(){
            if(this.allOptions.length === 0){
                this.loadData('');
            }
        },
        setOptionsToLocal(){
            let allOptions = this.allOptions;
            let count = allOptions.length;
            let searchKey = this.searchKey;
            let searchRe = new RegExp(`${searchKey}`);
            let localOptions = [];
            for(let i=0; i<count; i++){
                let item = allOptions[i];
                if(searchKey){
                    if(searchRe.test(item[this.filterField])){
                        localOptions.push(item);
                    }
                }else{
                    localOptions.push(item);
                }
            }

            let pageIndex = this.page.index;
            let pageSize = this.page.size;
            let startIndex = (pageIndex - 1) * pageSize - 1;
            let endIndex = startIndex + pageSize;
            if(startIndex < 0){
                startIndex = 0;
            }

            let localTotal = localOptions.length;
            let showPage = localTotal > pageSize ? true : false;

            localOptions = localOptions.slice(startIndex, endIndex);

            this.$set(this, 'localOptions', localOptions);
            this.$set(this, 'localTotal', localTotal);
            this.$set(this, 'showPage', showPage);
        },
        loadData(key){
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, {key}, datas => {
                    this.$set(this, 'allOptions', datas);
                    this.setOptionsToLocal();
//                    this.localOptions = datas;
                });
            }else{
                if (this.loaddata !== undefined) {
                    this.loaddata(this.name, items => {
                        if (Array.isArray(items) === false) {
//                            this.localOptions = [];
                            this.$set(this, 'allOptions', []);
                            this.setOptionsToLocal();
                        } else {
//                            this.localOptions = items;
                            this.$set(this, 'allOptions', items);
                            this.setOptionsToLocal();
                        }
                    });
                }
            }

            if(this.options && this.options.length > 0){
                this.$set(this, 'allOptions', this.options);
                this.setOptionsToLocal();
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
        pageChange(page){
            this.$set(this.page, 'index', page);
            this.setOptionsToLocal();
        },
        searchKeyChange(key){
            this.$set(this.page, 'index', 1);
            this.$set(this, 'searchKey', key);
            this.setOptionsToLocal();
        }
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
