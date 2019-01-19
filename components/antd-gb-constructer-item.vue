<template>
    <div class="">
        <Select v-model="selectValue" :label-in-value="true" @on-change="selectChange" style="width:200px" filterable>
            <Option v-for="item in model" :value="item.name" :key="item.name">{{ item.caption }}</Option>
        </Select>
        <Select v-show="buildVisible" v-model="buildvalue" :label-in-value="true" @on-change="buildChange" style="width:100px" filterable>
            <Option v-for="item in currentBuilder" :value="item.name" :key="item.name">{{ item.caption }}</Option>
        </Select>
        <antd-gb-search-item  :model="smodel" v-model="formValue" @on-item-change="handle"></antd-gb-search-item>
    </div>
</template>

<script>
import AntdGbSearchItem from "./antd-gb-search-item.vue";
import {FormConnector} from "tg-turing";
export default {
    name: "antd-gb-constructer-item",
    extends: FormConnector,
    props:{
        model:{
            default:[]
        },
        selectmodel:'',
        selectvalue:'',
        type:'',
        value:"",
        builderlists:Object,
        buildValue:""
    },
    watch:{
        model(val){
            //debugger;
            this.builderlistName = val[0].builderList;
        },
        selectValue(val){
            // debugger;
            this.formValue = '';
        },
        builderlistName(val){
            //debugger
            this.currentBuilder = this.builderlists[val];
        }
    },
    data(){
        return {
            selectValue:this.selectmodel,
            selectLabel:'',
            formValue:this.selectvalue,
            buildVisible:true,
            buildvalue:this.buildValue,
            builderlistName:"",
            currentBuilder:[],
            value_display:''
        }
    },
    computed: {
        smodel(){
            var that = this;
            if(that.selectValue){
                for (let index = 0; index < that.model.length; index++) {
                    const element = that.model[index];
                    if(element.name === that.selectValue){
                        return element;
                    }
                }
            }else {
                return {}
            }
        },
    },
    methods: {
        buildChange(param){

        },
        selectChange(param){
            if (param) {
                this.selectLabel = param.label;
                this.builderlistName = this.smodel.builderList;
            }else {
                this.selectLabel = '';
                this.builderlistName='';
            }
        },
        getResult() {
            var result = this.validate();
            if (!result) {
                return { 
                    name: this.selectValue,
                    value: this.formValue,
                    linkOpt: this.type,
                    builder: this.buildvalue?this.buildvalue:this.smodel.defaultBuilder,
                    caption:this.selectLabel,
                    value_display:this.value_display
                };
            } else {
                this.$Message.info(result);
                return '';
            }
        },
        handle(val,name,xtype,builder,val_display) {
            this.value_display = val_display;
            this.formValue=val;
        },
        validate(){
            if (this.formValue ) {
                if (this.formValue.length > this.smodel.dataSize) {
                    return '请输入'+this.smodel.dataSize+'个字符以内';
                }
                if (this.smodel.dataType == 'Int') {
                    if (isNaN(this.formValue)) {
                        return '请输入数字';
                    } else {
                        return '';
                    }
                }
                return '';
            }else {
                return '';
            }
        },
        clear(){
            this.selectValue = '';
            this.formValue = '';
            this.buildvalue = '';
            this.value_display = '';
        }
    },
    created(){
        // debugger
        console.log(this)
    },
    components: {
        AntdGbSearchItem
    },
}
</script>

<style>
.cons-items{
    border: solid 1px #ddd;
    padding: 16px;
}
.cons-item {
    padding:4px;
    margin: 4px;
    /* display: inline-block; */
}


</style>
