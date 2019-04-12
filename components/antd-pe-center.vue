<template >
    <div class="antd-pe-center">
        <div class="tjyh-main-middle">
            <div class="tjyh-main-middle-top">
                <span>待选人员</span> <span class="tjyh-main-middel-count">{{options.length}}</span>
            </div>
            <div class="tjyh-main-middle-main">
                <div class="tjyh-middle-table">
                    <span v-if="options.length == 0" style="color: #999">无数据</span>
                    <template v-if="options.length != 0 && type ==='checkbox'">
                        <Row>
                            <Col span="2">
                                <Checkbox v-model="isCheckedAll" @on-change="checkAll"></Checkbox>
                            </Col>
                            <Col span="6">
                                <B>{{theadData.XM}}</B>
                            </Col>
                            <Col span="8">
                                <B>{{theadData.ZGH}}</B>
                            </Col>
                            <Col span="8">
                                <B>{{theadData.deptName}}</B>
                            </Col>
                        </Row>
                        <div class="tjyh-middle-scroll">
                            <div v-for="option in options" class="gm-member-row tjyh-middle-item">
                                <Col span="2">
                                    <Checkbox v-model="option._isSelected" @on-change="checkOne(option)" :disabled="option._disabled"></Checkbox>
                                </Col>
                                <Col span="6" :title="option.XM" class="xm word_overflow">
                                    {{option.XM}}
                                </Col>
                                <Col span="8" :title="option.ZGH" class="zgh word_overflow">
                                    {{option.ZGH}}
                                </Col>
                                <Col span="8" :title="option.deptName" class="dept word_overflow">
                                    {{option.deptName}}
                                </Col>
                            </div>
                            <div v-show="isShowLoadmore" class="tjyh-middle-page"><a href="javascript:void(0);" @click="searchUser('loadmore')">加载更多</a></div>
                        </div>
                    </template>
                    <template v-if="options.length != 0 && type ==='radio'">
                        <Row>
                            <Col span="2">
                                 <Radio disabled style="visibility: hidden;"></Radio>
                            </Col>
                            <Col span="6">
                                <B>{{theadData.XM}}</B>
                            </Col>
                            <Col span="8">
                                <B>{{theadData.ZGH}}</B>
                            </Col>
                            <Col span="8">
                                <B>{{theadData.deptName}}</B>
                            </Col>
                        </Row>
                        <div class="tjyh-middle-scroll">
                            <div v-for="option in options" class="gm-member-row tjyh-middle-item">
                                <Col span="2">
                                    <Radio v-model="option._isSelected" @on-change="checkOne(option)" :disabled="option._disabled"></Radio>
                                </Col>
                                <Col span="6" :title="option.XM" class="xm word_overflow">
                                    {{option.XM}}
                                </Col>
                                <Col span="8" :title="option.ZGH" class="zgh word_overflow">
                                    {{option.ZGH}}
                                </Col>
                                <Col span="8" :title="option.deptName" class="dept word_overflow">
                                    {{option.deptName}}
                                </Col>
                            </div>
                            <div v-show="isShowLoadmore" class="tjyh-middle-page"><a href="javascript:void(0);" @click="searchUser('loadmore')">加载更多</a></div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "antd-pe-center",
    props: {
        users: Array,
        type: {
            type: String,
            default: 'checkbox'
        },
        isShowLoadmore: {  //是否显示加载更多
            type: Boolean,
            default: false
        },
        result: [Array],
        theadData: {
            type: Object,
            default:function() {
                return {
                    XM: '姓名',
                    ZGH: '工号',
                    deptName: '组织结构'
                };
            }
        }
    },
    data() {
        return {
            selected: [],
            options: [], // 页面渲染源数据，数据来源基于父级users
            isCheckedAll: false,
        }
    },
    watch: {
        users: function(values){
            var _result = [],
                _that = this,
                flag = true;
            // 获取antd-pe-right的selected数据
            this.result.map(function(obj){
                _result.push(obj.ZGH);
            });
            // 脱离vue中数组监听
            var arr = JSON.parse(JSON.stringify(values));
            arr.map(function(val){
                if(_result.indexOf(val.ZGH) > -1){
                    val._isSelected = true;
                }else{
                    flag = false;
                    val._isSelected = false;
                }
                return val;
            });
            this.options = arr;
            this.isCheckedAll = flag;
        }
    },
    methods: {
        checkOne: function(option){
            if(this.type === 'checkbox') {
                // 联动是否全选
                var flag = true;
                this.options.forEach(function(user){
                    if(!user._isSelected) flag = false;
                });
                this.isCheckedAll = flag;
                // 获取选中只向外抛出
                this.$emit("on-check", option);
            }else{
                this.options.forEach(function(user){
                    if(user.ZGH !== option.ZGH) {
                        user._isSelected = false;
                    }
                });
                this.$emit("on-check", [option]);
            }
        },
        checkAll: function(value){
            var _that = this;
            var arr = JSON.parse(JSON.stringify(this.options));
            this.options = [];
            arr.map(function(obj){
                obj._isSelected = value;
                _that.options.push(obj);
            });
            this.$emit("on-check", this.options);
        },
        searchUser(ele){
            this.$emit("on-search-user", ele);
        }
    }
}
</script>

<style>
.antd-pe-center{
    width: calc(100% / 3 - 3px);
    float: left;
}


.tjyh-main .word_overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.antd-pe-person .tjyh-search {
    width: 470px;
    padding-bottom: 10px;
}

.antd-pe-person .tjyh-main {
    width: 100%;
    height: 360px;
    display: table;
    background: #F7F8FC;
    border: 1px solid #D8DCF0;
}

.antd-pe-person .tjyh-main>div {
    display: inline-block;
    position: relative;
    width: calc(100% / 3 - 3px);
}

.antd-pe-person .tjyh-main-middle:before{
    border: 44px solid transparent;
    border-left: 14px solid #e8e0eb;
    top: 128px;
    left: 0;
}

.antd-pe-person .tjyh-main-middle:after{
    border: 44px solid transparent;
    border-left: 14px solid #F7F8FC;
    top: 128px;
    left: -1px;
    pointer-events: none;
}

.antd-pe-person .tjyh-main-middle:after,
.antd-pe-person .tjyh-main-middle:before{
    width: 0;
    height: 0;
    content: ' ';
    position: absolute;
}

.antd-pe-person .tjyh-main-middle{
    border-left: 1px solid #e8e0eb;
}

.antd-pe-person .tjyh-tree .jqx-widget-content {
    position: relative!important;
    height: initial!important;
}

.antd-pe-person .tjyh-tree .jqx-scrollbar {
    display: none;
}

.antd-pe-person .tjyh-tree {
    left: 0px;
    overflow-y: auto;
    overflow-x: hidden;
}

.antd-pe-person .tjyh-tree>div,
.antd-pe-person .tjyh-tree>div>div {
    height: initial!important;
}

.antd-pe-person .tjyh-main-middle {
    vertical-align: top;
}

.antd-pe-person .tjyh-main-middle-top{
    padding: 16px 8px 16px 16px;
    position: relative;
}

.antd-pe-person .tjyh-main-middle-top>div{
    position: absolute;
    right: 16px;
    top: 16px;
}

.antd-pe-person .tjyh-main-middle-top>div>select {
    width: 100px;
}

.antd-pe-person .tjyh-main-middle-main {
    padding-left: 16px;
    padding-right: 16px;
    height: 335px;
    overflow-y: auto;
    overflow-x: hidden;
    border-color: transparent;
    background-color: transparent;
}

.antd-pe-person .tjyh-main-middle-main table {
    border-right: 0px;
}

.antd-pe-person .tjyh-middle-scroll {
    height: 286px;
    overflow-x: hidden;
}

.antd-pe-person .tjyh-middle-page{
    margin: 0 auto;
    height: 24px;
    line-height: 24px;
    display: table;
    text-align: center;
}

.antd-pe-person .select-all-wrap {
    float: left;
    padding-right: 8px;
}

.antd-pe-person .select-all-text {
    display: inline-block;
    top: -3px;
    color: #333;
    vertical-align: text-bottom
}

.antd-pe-person .gm-member-row:after {
    content: "";
    clear: both;
}


.antd-pe-person .gm-member-row .bh-checkbox,
.antd-pe-person .gm-member-row .bh-radio {
    top: -9px !important;
    padding-top: 0 !important; 
    position: absolute !important;
}

.antd-pe-person .gm-member-row:nth-child(2n) {
    background-color: #f8f8f8;
}

.antd-pe-person .gm-member-row:hover {
    background-color: #DDEDFB;
}

.antd-pe-person .tjyh-middle-scroll .gm-member-row:nth-child(2n) {
    background-color: #fff;
}

.antd-pe-person .tjyh-middle-scroll .gm-member-row {
    background-color: #f8f8f8;
}
.antd-pe-person .tjyh-middle-scroll .gm-member-row .zgh{
    word-break: break-all;
}
.antd-pe-person .gm-member-row .zgh,.antd-pe-person .gm-member-row .dept{
    /* padding-left: 4px; */
}

</style>
