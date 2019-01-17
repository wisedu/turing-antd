<template>
    <div class="">
        <Select v-model="selectValue" :label-in-value="true" @on-change="selectChange" style="width:100px">
            <Option v-for="item in model" :value="item.name" :key="item.name">{{ item.caption }}</Option>
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
        value:'',
        type:''
    },
    watch:{
        selectValue(val){
            // debugger;
            this.formValue = '';
        }
    },
    data(){
        return {
            selectValue:this.selectmodel,
            selectLabel:'',
            formValue:this.selectvalue
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
        selectChange(param){
            // debugger
            this.selectLabel = param.label;
        },
        getResult() {
            return { 
                name: this.selectValue,
                value: this.formValue,
                linkOpt: this.type,
                builder: this.smodel.defaultBuilder,
                caption:this.selectLabel
             };
        },
        handle(val,name,xtype,builder) {
            //debugger
            this.formValue=val;
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
