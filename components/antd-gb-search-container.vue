<template>
    <div>
        <slot name="searchhead"></slot>
        <div v-if="value && value.length>0">
            <div v-for="(item,index) in value">
                <slot name="searchitem" :model="item" :index="index" @on-item-change="handle"></slot>
            </div>
        </div>
        <!-- <div v-else>
            <div v-for="(item,index) in model">
                <slot name="searchitem" :model="item" v-model="formValue[item.name]" @on-item-change="handle"></slot>
            </div>
        </div> -->
        <slot name="searchbottom"></slot>
    </div>
</template>

<script>
import {FormConnector} from "tg-turing";
export default {
    name: "antd-gb-search-container",
    props:{
        model:{
            default:[]
        },
        value:[Object, Array],
    },
    data(){
        return {
        }
    },
    computed:{
        formValue:function () {
            // debugger;
            if (Array.isArray(this.value)) {
                var tmp = {};
                this.value.map(function(item) {
                    tmp[item.name] = item.value;
                });
                return tmp;
            } else {
                return this.value;
            }
        }
    },
    created() {
        // debugger
        console.log(this)
    },
    methods: {
        getResult() {
            return this.formValue;
        }
    },
    components: {
    },
}
</script>

<style>

</style>
