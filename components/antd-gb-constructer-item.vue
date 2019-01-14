<template>
    <div class="">
        <Select v-model="selectmodel2" style="width:200px">
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
        selectmodel1:'',
        value2:'',
        type:''
    },
    data(){
        return {
            selectmodel2:this.selectmodel1,
            formValue:this.value2
        }
    },
    computed: {
        smodel(){
            // debugger
            var that = this;
            if(that.selectmodel2){
                for (let index = 0; index < that.model.length; index++) {
                    const element = that.model[index];
                    if(element.name === that.selectmodel2){
                        return element;
                    }
                }
                // that.model.map(function (param) {
                //     if(param.name === that.selectmodel2){
                //         return param;
                //     }
                // })
            }else {
                return {}
            }
        }
    },
    methods: {
        getResult() {
            return { name: this.selectmodel2, value: this.formValue, linkOpt: this.type, builder: this.smodel.defaultBuilder };
        },
        handle(val,name,xtype,builder) {
            //debugger
            this.formValue=val;
        }
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
.cons-item-span {
    border: solid 1px purple;
    display: inline-block;
    vertical-align: top;
    margin:0 8px;
}

</style>
