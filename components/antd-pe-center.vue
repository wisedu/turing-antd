<template >
    <div class="antd-pe-center">
        <div class="tjyh-main-middle">
            <div class="tjyh-main-middle-top">
                <span>待选人员</span> <span class="tjyh-main-middel-count">{{users.length}}</span>
            </div>
            <div class="tjyh-main-middle-main">
                <div class="tjyh-middle-table">
                    <span v-if="users.length == 0" style="color: #999">无数据</span>
                    <template v-if="users.length != 0">
                        <Row>
                            <Col span="2">
                                <Checkbox v-model="isCheckedAll" @on-change="checkAll"></Checkbox>
                            </Col>
                            <Col span="6">
                                <B>姓名</B>
                            </Col>
                            <Col span="6">
                                <B>工号</B>
                            </Col>
                            <Col span="10">
                                <B>组织机构</B>
                            </Col>
                        </Row>
                        <div class="tjyh-middle-scroll">
                            <div v-for="user in users" class="gm-member-row tjyh-middle-item">
                                <Col span="2">
                                    <Checkbox v-model="user._isLeftSelected" @on-change="checkOne(user)" :disabled="user._disabled"></Checkbox>
                                </Col>
                                <Col span="6" :title="user.XM" class="xm">
                                    {{user.XM}}
                                </Col>
                                <Col span="6" :title="user.ZGH" class="zgh">
                                    {{user.ZGH}}
                                </Col>
                                <Col span="10" :title="user.deptName" class="dept">
                                    {{user.deptName}}
                                </Col>
                            </div>
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
        users: {
            type:[Array, Object],
            default:function() {
                return [];
            }
        },
    },
    data() {
        return {
            isCheckedAll: false,
            selected: [], // 选中值
            isSelectedAll: false, // 左侧已选择区域 控制是否全选/清除
        }
    },
    computed:{
        
    },
    methods: {
        checkOne: function(user){
            var i = this.selected.indexOf(user);
            if(!user._isLeftSelected){
                this.selected.splice(i, 1);
                this.isCheckedAll = false;
            }else{
                if(i == -1){
                    this.selected.push(user);
                    if(this.selected.length == this.users.length){
                        this.isCheckedAll = true;
                    }
                }
            }
            this.$emit("on-check", this.selected);
        },
        checkAll: function(){
            var vm = this;
            if(this.isCheckedAll){
              this.selected = this.users.filter(function(item){
                return !item._isSelected;
              });
              this.users.forEach(function(obj,i){
                vm.$set(obj, '_isLeftSelected', true);
              });
            }else{
              this.selected = [];
              this.users.forEach(function(obj,i){
                vm.$set(obj, '_isLeftSelected', false);
              });
            }
            this.$emit("on-check", this.selected);
        },
    }
}
</script>

<style>
.antd-pe-center{
    width: calc(100% / 3 - 3px);
    float: left;
}

.tgPerson .ivu-tabs-bar{
    margin-bottom: 0px;
    display: none;
}
.tgPerson .tgPerson__content{
    padding-top: 20px;
}
.tgPerson .tgPerson__content .ivu-row{
    border: 1px solid gainsboro;
}
.tgPerson .tgPerson__content .ivu-transfer-list-header{
    border-radius: 0px;
    border: 0px;
    border-left: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
}
.tgPerson .tgPerson__content .ivu-transfer-list-header-title{
    font-size: 14px;
}
.tgPerson .tgPerson__content .tgPerson__content-header{
    padding: 8px 16px;
    background: #f9fafc;
    color: #515a6e;
    /* border-bottom: 1px solid #e8eaec; */
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
}
.tgPerson .tgPerson__content .ivu-transfer-list{
    height: 360px;
    width:225px;
    overflow: auto;
}
.tgPerson .tgPerson__content .ivu-transfer-list-body{
    border-radius: 0px;
    border: 0px;
    border-left: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
}



.us-modal .tjyh-search {
    width: 470px;
    padding-bottom: 10px;
}

.us-modal .tjyh-main {
    width: 100%;
    height: 360px;
    display: table;
    background: #F7F8FC;
    border: 1px solid #D8DCF0;
}

.us-modal .tjyh-main>div {
    display: inline-block;
    position: relative;
    width: calc(100% / 3 - 3px);
}

.us-modal .tjyh-main-middle:before{
    border: 44px solid transparent;
    border-left: 14px solid #e8e0eb;
    top: 128px;
    left: 0;
}

.us-modal .tjyh-main-middle:after{
    border: 44px solid transparent;
    border-left: 14px solid #F7F8FC;
    top: 128px;
    left: -1px;
    pointer-events: none;
}

.us-modal .tjyh-main-middle:after,
.us-modal .tjyh-main-middle:before{
    width: 0;
    height: 0;
    content: ' ';
    position: absolute;
}

.us-modal .tjyh-main-middle{
    border-left: 1px solid #e8e0eb;
}

.us-modal .tjyh-tree .jqx-widget-content {
    position: relative!important;
    height: initial!important;
}

.us-modal .tjyh-tree .jqx-scrollbar {
    display: none;
}

.us-modal .tjyh-tree {
    left: 0px;
    overflow-y: auto;
    overflow-x: hidden;
}

.us-modal .tjyh-tree>div,
.us-modal .tjyh-tree>div>div {
    height: initial!important;
}

.us-modal .tjyh-main-middle {
    vertical-align: top;
}

.us-modal .tjyh-main-middle-top{
    padding: 16px 8px 16px 16px;
    position: relative;
}

.us-modal .tjyh-main-middle-top>div{
    position: absolute;
    right: 16px;
    top: 16px;
}

.us-modal .tjyh-main-middle-top>div>select {
    width: 100px;
}

.us-modal .tjyh-main-middle-main {
    padding-left: 16px;
    padding-right: 16px;
    height: 335px;
    overflow-y: auto;
    overflow-x: hidden;
    border-color: transparent;
    background-color: transparent;
}

.us-modal .tjyh-main-middle-main table {
    border-right: 0px;
}

.us-modal .tjyh-middle-scroll {
    /* width: 293px; */
    height: 286px;
    overflow-x: hidden;
}

.us-modal .tjyh-middle-page{
    /*text-align: center;*/
    margin: 0 auto;
    height: 24px;
    line-height: 24px;
    display: table;
    text-align: center;
    width: 293px;
}

.us-modal .select-all-wrap {
    float: left;
    padding-right: 8px;
}

.us-modal .select-all-text {
    display: inline-block;
    top: -3px;
    color: #333;
    vertical-align: text-bottom
}

.us-modal .gm-member-row:after {
    content: "";
    clear: both;
}

.us-modal .gm-member-row {
    height: 24px;
    /* line-height: 24px; */
}

.us-modal .gm-member-row .bh-checkbox,
.us-modal .gm-member-row .bh-radio {
    top: -9px !important;
    padding-top: 0 !important; 
    position: absolute !important;
}

.us-modal .gm-member-row:nth-child(2n) {
    background-color: #f8f8f8;
}

.us-modal .gm-member-row {
    background-color: #fff;
}

.us-modal .gm-member-row:hover {
    background-color: #DDEDFB;
}

.us-modal .tjyh-middle-scroll .gm-member-row:nth-child(2n) {
    background-color: #fff;
}

.us-modal .tjyh-middle-scroll .gm-member-row {
    background-color: #f8f8f8;
}
</style>
