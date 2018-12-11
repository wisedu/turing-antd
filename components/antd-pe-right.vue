<template >
    <div class="antd-pe-right">
        <div class="tjyh-main-right">
            <div class="tjyh-main-right-top">
                <span>已选 <span class="tjyh-main-right-count">{{selected.length}}</span></span>
                <div>
                    <a @click="selectAllOrClear">全选/清除 </a>|<a @click="setTop"> 置顶 </a>|<a @click="setBottom"> 置底 </a>|<a @click="moveUp"> 上移 </a>|<a @click="moveDown"> 下移 </a>|<a @click="deleteRecords"> 删除</a>
                </div>
            </div>
            <div class="tjyh-main-right-main">
                <div v-for="item in selected" class="gm-member-row bh-clearfix tjyh-selected-item" :class="{'bh-ch-active': item.active}" @click="selectOne(item)" >
                    <Col span="10" :title="item.XM" class="xm">
                        {{item.XM}}
                    </Col>
                    <Col span="10" :title="item.ZGH" class="zgh">
                        {{item.ZGH}}
                    </Col>
                    <Col span="2" class="">
                        <Icon type="md-trash" size="16" @click.native.stop="deleteRecords_in(item)"/>
                    </Col>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "antd-pe-right",
    props: {
        value: Array
    },
    data() {
        return {
            selected: this.value,
            isSelectedAll: false, // 左侧已选择区域 控制是否全选/清除
        }
    },
    watch:{
        value: {
            handler:function(newVal){
                this.selected = newVal;
            },
            deep:true
        }
    },
    methods: {
        selectAllOrClear: function(){
            var vm = this;
            this.isSelectedAll = !this.isSelectedAll;
            this.selected.forEach(function(obj,i){
              vm.$set(obj, '_isSelected', vm.isSelectedAll);
            });
          },
        setTop: function(){
            if(!this.isSelectedAll){
              var obj = this.splitSelected();
              this.selected = obj.leftSelected.concat(obj.leftUnselected);
            }
          },
        setBottom: function(){
            if(!this.isSelectedAll){
              var obj = this.splitSelected();
              this.selected = obj.leftUnselected.concat(obj.leftSelected);
            }
          },
        moveUp: function(){
            if(!this.isSelectedAll){
              var vm = this;
              var obj = this.splitSelected();
              obj.leftSelected.forEach(function(o, i){
                var index = vm.selected.indexOf(o) - 1;
                if(index < 0) index = 0;
                if(obj.leftSelected.indexOf(obj.leftUnselected[index]) == -1){
                  obj.leftUnselected.splice(index, 0, o);
                }else{
                  obj.leftUnselected.splice(index + 1, 0, o);
                }
              });
              this.selected = obj.leftUnselected;
            }
        },
        moveDown: function(){
            if(!this.isSelectedAll){
              var vm = this;
              var obj = this.splitSelected();
              obj.leftSelected.forEach(function(o, i){
                var index = vm.selected.indexOf(o) + 1;
                obj.leftUnselected.splice(index, 0, o);
              });
              this.selected = obj.leftUnselected;
            }
        },
        splitSelected: function(){
            var leftSelected = [];
            var leftUnselected = [];
    
            this.selected.forEach(function(obj, i){
              if(obj._isSelected){
                leftSelected.push(obj);
              }else{
                leftUnselected.push(obj);
              }
            });
    
            return {
              leftSelected: leftSelected,
              leftUnselected: leftUnselected
            };
        },
        deleteRecords: function(){
            this.isCheckedAll = false;
            this.users.forEach(function(obj, i){
                if(obj._isSelected){
                    obj._isLeftSelected = false;
                }
            });
            this.selected = this.selected.filter(function(item){
              return !item._isSelected;
            });
            this.$emit("on-delete",this.selected);
        },
        deleteRecords_in: function(item){
            // this.isCheckedAll = false;
            this.selected = this.selected.filter(function(obj){
              return item.ZGH !== obj.ZGH;
            });
            console.log(this.selected)
            this.$emit('input',this.selected);
        },
        selectOne: function(user){
            var index = this.selected.indexOf(user);
            if(user.active === true){
                user.active = false;
                this.$set(this.selected, index, user);
                this.isSelectedAll = false;
            }else{
                user.active = true;
                this.$set(this.selected, index, user);
                // 判断是否已经全选
                var selectedUsers = this.selected.filter(function(item){
                    return item._isSelected == true
                });
                if(selectedUsers.length == this.selected.length && selectedUsers.length != 0){
                    this.isSelectedAll = true;
                }else{
                    this.isSelectedAll = false;
                }
            }

        }
    }
}
</script>

<style>
.antd-pe-right{
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
.us-modal .tjyh-main-left, .us-modal .tjyh-main-right{
    height: 386px
}

.us-modal .tjyh-main-right:before {
    border: 44px solid transparent;
    border-left: 14px solid #e8e0eb;
    top: 128px;
    left: 0;
}

.us-modal .tjyh-main-right:after {
    border: 44px solid transparent;
    border-left: 14px solid #F7F8FC;
    top: 128px;
    left: -1px;
    pointer-events: none;
}

.us-modal .tjyh-main-right:after,
.us-modal .tjyh-main-right:before {
    width: 0;
    height: 0;
    content: ' ';
    position: absolute;
}

.us-modal .tjyh-main-right {
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

.us-modal .tjyh-main-right {
    vertical-align: top;
}

.us-modal .tjyh-main-right-top {
    padding: 16px 8px 16px 16px;
    position: relative;
}

.us-modal .tjyh-main-right-top>div {
    position: absolute;
    right: 8px;
    top: 16px;
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
    overflow: hidden;
    background-color: #fff;
}

.us-modal .gm-member-row:hover {
    background-color: #DDEDFB;
}

.us-modal .tjyh-main-right-main {
    padding-left: 16px;
    padding-right: 8px;
    height: 310px;
    overflow-y: auto;
    overflow-x: hidden;
}

.us-modal .gm-member-row.bh-ch-active {
    background-color: #d3eafd
}

.us-modal .tjyh-main-right-top a {
    cursor: pointer;
}

.us-modal .tjyh-main-right-top {
    user-select: none;
    -webkit-user-select: none;
}

.us-modal .tjyh-footer {
    margin-left: 12px;
    float: right;
    border: none;
    width: auto !important;
    padding: 10px 0px;
}

.us-modal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000000;
    font-size: 12px;
}
.us-modal .us-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: .3;
}
.us-modal .us-content {
    position: fixed;
    left: 50%;
    top: 44%;
    margin-left: -512px;
    margin-top: -277px;
    width: 1024px;
    min-height: 200px;
    padding: 18px 16px 0 16px;
    background: #fff;
    line-height: 1.6;
    border: 1px solid transparent;
    box-shadow: 0 6px 24px rgba(0,0,0,.24);
}
.us-modal .us-content h2{
    margin-bottom: 16px;
}
.us-modal .closeIcon{
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
}

.us-modal .tjyh-main-left .jqx-tabs-titleContentWrapper{
    margin-top: 0 !important;
}
.us-modal .tjyh-main-left .jqx-tabs-titleWrapper{
    height: auto !important;
}
.us-modal .tjyh-main-left .jqx-tabs-content-element{
    height: auto !important;
}
.us-modal .tjyh-search-key{
    margin-bottom: 0;
}

.us-modal .ivu-modal-header{
    padding: 0px;
    padding-bottom: 14px;
}
</style>
