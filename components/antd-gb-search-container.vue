<template>
    <div>
        <slot name="searchhead"></slot>
        <div v-if="newValue && newValue.length>0">
            <div v-for="(item,index) in newValue">
                <slot name="searchitem" :model="item" :index="index" @on-item-change="handle"></slot>
            </div>
        </div>
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
            newValue:[]
        }
    },
    computed:{
    },
    watch:{
        value(val){
            this.adapter(val);
        }
    },
    created() {
        // debugger;
        this.adapter(this.value);
    },
    methods: {
        adapter(arr){
            var that = this;
            that.newValue = [];
            if (arr && arr.length>0) {
                arr.forEach(element => {
                    var subValue = [];
                    element.forEach(ele => {
                        var builderDisplay = that.searchBuilder(ele);
                        ele.builder_display = builderDisplay;
                        subValue.push(ele);
                    }); 
                    that.newValue.push(subValue);
                });
            }
        },
        searchBuilder(obj){
            var tmpDisplay = '';
            switch (obj.builder) {
                case 'equal':
                    tmpDisplay = '等于';
                    break;
                case 'upper_equal':
                    tmpDisplay = '转大写等于';
                    break;
                case 'notEqual':
                    tmpDisplay = '不等于';
                    break;
                case 'include':
                    tmpDisplay = '包含';
                    break;
                case 'upper_include':
                    tmpDisplay = '转大写包含';
                    break;
                case 'notInclude':
                    tmpDisplay = '不包含';
                    break;
                case 'more':
                    tmpDisplay = '大于';
                    break;
                case 'less':
                    tmpDisplay = '小于';
                    break;
                case 'moreEqual':
                    tmpDisplay = '大于等于';
                    break;
                case 'lessEqual':
                    tmpDisplay = '小于等于';
                    break;
                case 'm_value_include':
                    tmpDisplay = '多值包含';
                    break;
                case 'm_value_equal':
                    tmpDisplay = '多值相等';
                    break;
                case 'm_value_not_include':
                    tmpDisplay = '多值不包含';
                    break;
                case 'm_value_not_equal':
                    tmpDisplay = '多值不相等';
                    break;
                case 'two_include':
                    tmpDisplay = '两列包含';
                    break;
                case 'more_include':
                    tmpDisplay = '多列包含';
                    break;
                case 'more_equal':
                    tmpDisplay = '多列相等';
                    break;
                case 'beginWith':
                    tmpDisplay = '以...开始';
                    break;
                case 'endWith':
                    tmpDisplay = '以...结束';
                    break;
                case 'notEndWith':
                    tmpDisplay = '不以...结束';
                    break;
                case 'use_default':
                    tmpDisplay = '使用默认值';
                    break;   
                default:
                    tmpDisplay = '无此builder类型';
                    break;
            }
            return tmpDisplay;
        }
    },
    components: {
    },
}
</script>

<style>

</style>
