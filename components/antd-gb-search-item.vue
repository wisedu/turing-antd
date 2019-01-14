<template>
    <div style="display:inline-block;">
        <Input v-if="model.xtype==='text'" v-model="formValue" placeholder="Enter something..." style="width: 300px" @input="handleItem" />
        <i-switch v-else-if="model.xtype==='switcher'" v-model="formValue" @on-change="handleItem" />
        <Input v-else v-model="formValue" placeholder="Enter something..." style="width: 300px" @input="handleItem" />
    </div>
</template>

<script>
import {FormConnector} from "tg-turing";
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
            formValue:this.value
        }
    },
    computed: {
        
        // shownFields() {
        //     return this.fields.filter(item => item.hidden !== true);
        // }
    },
    methods: {
        handleItem() {
            this.$emit("on-item-change", this.formValue,this.model.name,this.model.xtype,this.model.defaultBuilder);
        }
    },
    created(){
        //debugger;
        console.log('111111111',this.model)
    }
}
</script>

<style>

</style>
