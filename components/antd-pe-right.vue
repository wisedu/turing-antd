<template >
    <div class="antd-pe-right">
        <div class="tjyh-main-right">
            <div class="tjyh-main-right-top">
                <span>已选 <span class="tjyh-main-right-count">{{selected.length}}</span></span>
                <div v-if="selected.length>1">
<!--                     <a @click="selectAllOrClear">全选/清除 </a>|<a @click="setTop"> 置顶 </a>|<a @click="setBottom"> 置底 </a>|<a @click="moveUp"> 上移 </a>|<a @click="moveDown"> 下移 </a>|<a @click="deleteRecords"> 删除</a> -->
                </div>
            </div>
            <div class="tjyh-main-right-main">
                <div v-for="item in selected" class="gm-member-row bh-clearfix tjyh-selected-item" :class="{'bh-ch-active': item.active}" @click="selectOne(item)" >
                    <Col span="10" :title="item.XM" class="xm word_overflow">
                        {{item.XM}}
                    </Col>
                    <Col span="10" :title="item.ZGH" class="zgh word_overflow">
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
            this.$emit('input',this.selected);
            this.$emit('on-delete',item);
        },
        selectOne: function(user){
            // var index = this.selected.indexOf(user);
            // if(user.active === true){
            //     user.active = false;
            //     this.$set(this.selected, index, user);
            //     this.isSelectedAll = false;
            // }else{
            //     user.active = true;
            //     this.$set(this.selected, index, user);
            //     判断是否已经全选
            //     var selectedUsers = this.selected.filter(function(item){
            //         return item._isSelected == true
            //     });
            //     if(selectedUsers.length == this.selected.length && selectedUsers.length != 0){
            //         this.isSelectedAll = true;
            //     }else{
            //         this.isSelectedAll = false;
            //     }
            // }

        }
    }
}
</script>

<style>
.antd-pe-right{
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

.antd-pe-person .tjyh-main-left, .antd-pe-person .tjyh-main-right{
    height: 386px
}

.antd-pe-person .tjyh-main-right:before {
    border: 44px solid transparent;
    border-left: 14px solid #e8e0eb;
    top: 128px;
    left: 0;
}

.antd-pe-person .tjyh-main-right:after {
    border: 44px solid transparent;
    border-left: 14px solid #F7F8FC;
    top: 128px;
    left: -1px;
    pointer-events: none;
}

.antd-pe-person .tjyh-main-right:after,
.antd-pe-person .tjyh-main-right:before {
    width: 0;
    height: 0;
    content: ' ';
    position: absolute;
}

.antd-pe-person .tjyh-main-right {
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

.antd-pe-person .tjyh-main-right {
    vertical-align: top;
}

.antd-pe-person .tjyh-main-right-top {
    padding: 16px 8px 16px 16px;
    position: relative;
}

.antd-pe-person .tjyh-main-right-top>div {
    position: absolute;
    right: 8px;
    top: 16px;
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

.antd-pe-person .gm-member-row {
    overflow: hidden;
    background-color: #fff;
}

.antd-pe-person .gm-member-row:hover {
    background-color: #DDEDFB;
}

.antd-pe-person .tjyh-main-right-main {
    padding-left: 16px;
    padding-right: 8px;
    height: 310px;
    overflow-y: auto;
    overflow-x: hidden;
}

.antd-pe-person .gm-member-row.bh-ch-active {
    background-color: #d3eafd
}

.antd-pe-person .tjyh-main-right-top a {
    cursor: pointer;
}

.antd-pe-person .tjyh-main-right-top {
    user-select: none;
    -webkit-user-select: none;
}

.antd-pe-person .tjyh-footer {
    margin-left: 12px;
    float: right;
    border: none;
    width: auto !important;
    padding: 10px 0px;
}

.antd-pe-person {
    font-size: 12px;
}
.antd-pe-person .us-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: .3;
}
.antd-pe-person .us-content {
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
.antd-pe-person .us-content h2{
    margin-bottom: 16px;
}
.antd-pe-person .closeIcon{
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
}

.antd-pe-person .tjyh-main-left .jqx-tabs-titleContentWrapper{
    margin-top: 0 !important;
}
.antd-pe-person .tjyh-main-left .jqx-tabs-titleWrapper{
    height: auto !important;
}
.antd-pe-person .tjyh-main-left .jqx-tabs-content-element{
    height: auto !important;
}
.antd-pe-person .tjyh-search-key{
    margin-bottom: 0;
}

.antd-pe-person .ivu-modal-header{
    padding: 0px;
    padding-bottom: 14px;
}
</style>
