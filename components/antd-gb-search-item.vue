<template>
    <div class="search-item">
        <component :model="newModel" :is="componentMap[newModel.xtype] || componentMap['text']" :options="options" :type="newModel.itype || 'text'" v-model="formValue" @input="handleItem" :ref="'field' + newModel.name"></component>
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
    watch:{
        model(val){
            // debugger
            console.log(val)
        }
    },
    data(){
        return {
            formValue:this.value,
            options:[]
        }
    },
    watch:{
        model(){
            var that = this;
            if (this.model.url) {
                axios({ 
                    method: 'get',
                    url:this.model.url,
                    params: {} 
                }).then(results => {
                    that.options = [];
                    console.log(results.data);
                    if (results.data.length>0) {
                        results.data.forEach(element => {
                            that.options.push(element);
                        });
                    }
                }).catch(err =>{
                    console.log(this)
                })
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
                    break;
                case 'date-ym':
                    tmpModel.itype = 'year';
                    break;
                case 'date-full':
                    tmpModel.itype = 'datetime';
                    break;
                case 'date-range':
                    tmpModel.itype = 'daterange';
                    break;
                default:
                    tmpModel.itype = 'text';
                    break;
            }
            return tmpModel;
        }
    },
    methods: {
        handleItem() {
            this.$emit("on-item-change", this.formValue,this.newModel.name,this.newModel.xtype,this.newModel.defaultBuilder);
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
