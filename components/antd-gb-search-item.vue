<template>
    <div class="search-item">
        <component :model="newModel" :is="componentMap[newModel.xtype] || componentMap['text']" :options="options" :type="newModel.itype || 'text'" v-model="formValue" @input="handleItem" :ref="'field' + newModel.name" v-bind="newModel.bind"></component>
    </div>
</template>

<script>
// import {FormConnector} from "tg-turing";
import {ConnectItem,utils,uuid, axios} from 'tg-turing'
import Components from './form-components.js';
export default {
    name: "antd-gb-search-item",

    props:{
        model:{},
        value:""
    },
    data(){
        return {
            formValue:this.value,
            options:[]
        }
    },
    watch:{
        value(val){
            this.formValue = val;
        },
        model(){
            var that = this;
            if (this.model && this.model.url) {
                axios({ 
                    method: 'get',
                    url:this.model.url,
                    params: {} 
                }).then(results => {
                    that.options = [];
                    console.log(results.data);
                    if (results.data.datas.code.rows.length>0) {
                        results.data.datas.code.rows.forEach(element => {
                            element.label = element.name;
                            element.value = element.id;
                            that.options.push(element);
                        });
                    }
                }).catch(err =>{
                    console.log(this)
                })
            }else {
               that.options = []; 
            }
        }
    },
     computed: {
        componentMap() {
            // let map = {};
            // //debugger
            // var mixComponents = Object.assign({},Components);
            // Object.keys(mixComponents).forEach(function(key) {
            //     map[key] = key;
            // });
            //debugger
            return Object.assign({}, Components);
        },
        newModel(){
            var that = this;
            var tmpModel = JSON.parse(JSON.stringify(this.model));
            tmpModel['bind'] = {};
            switch (tmpModel.xtype) {
                case 'text':
                case 'textarea':
                case 'number':
                    tmpModel.itype = tmpModel.xtype;
                    break;
                case 'select':
                    tmpModel.itype = 'select';
                    break;
                case 'date-local':
                    tmpModel.itype = 'date';
                    tmpModel.bind.format = 'yyyy-MM-dd';
                    break;
                case 'date-ym':
                    tmpModel.itype = 'month';
                    tmpModel.bind.format = 'yyyy-MM';
                    break;
                case 'date-full':
                    tmpModel.itype = 'datetime';
                    tmpModel.bind.format = 'yyyy-MM-dd HH:mm:ss';
                    break;
                case 'date-range':
                    tmpModel.itype = 'daterange';
                    tmpModel.bind.format = 'yyyy-MM-dd';
                    break;
                default:
                    tmpModel.itype = 'text';
                    break;
            }
            return tmpModel;
        }
    },
    methods: {
        handleItem(param) {
            // debugger
            if (param.key) {
                this.$emit("on-item-change", param.value,this.newModel.name,this.newModel.xtype,this.newModel.defaultBuilder,param.label);
            } else {
                this.$emit("on-item-change", this.formValue,this.newModel.name,this.newModel.xtype,this.newModel.defaultBuilder);
            }
        }
    },
    created(){
        var that = this;
        if (this.model.url) {
            axios({ 
                method: 'get',
                url: this.model.url,
                params: {} 
            }).then(results => {
                that.options = [];
                console.log(results.data);
                if (results.data.datas.code.rows.length>0) {
                    results.data.datas.code.rows.forEach(element => {
                        element.label = element.name;
                        element.value = element.id;
                        that.options.push(element);
                    });
                }
            }).catch(err =>{
                console.log(this)
            })
        }
        console.log('111111111',this.newModel)
    }
}
</script>

<style>
.search-item {
    display:inline-block;
    width: 250px;
}
</style>
