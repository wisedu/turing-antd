<template>
    <div class="us-modal">
        <div class="tjyh-main">
            <antd-pe-left :treeData="treeData" :tabData="tabData" @on-select="treeItemSelect_p"></antd-pe-left>
            <antd-pe-center :users="users" @on-check="check_p" :isShowLoadmore="isShowLoadmore" @on-searchUser="searchUser" ref="antd-pe-center" :type="type"></antd-pe-center>
            <antd-pe-right  v-model="selected" @on-delete="handleDelete" ref="antd-pe-right"></antd-pe-right>
            <button @click="getCurrentVal">获取当前选中值</button>
        </div>
    </div>
</template>

<script>
import AntdPeLeft from '../../components/antd-pe-left';
import AntdPeCenter from '../../components/antd-pe-center';
import AntdPeRight from '../../components/antd-pe-right';
import tgTurning from 'tg-turing';
export default {
    components:{
        AntdPeLeft,
        AntdPeCenter,
        AntdPeRight
    },
    data() {
        return {
            users:[],
            tabData: [],
            selected:[],
            // tabData: [{id: '1',name: '组织机构'},{id: '2',name: '学工机构'}],
            treeData: [],
            type: 'checkbox',
            isShowLoadmore: true,
            totalSize: 15,
        }
    },
    watch: {
        users(val){
            if(this.totalSize > val.length){
                this.isShowLoadmore = true
            }else{
                this.isShowLoadmore = false
            } 
        }
    },
    methods: {
        treeItemSelect_p(data){
            //取到树节点去查询
            if(data[0].DM === '4'){
                this.users = [
                    {XM: '啊哈哈',ZGH: '01120000',deptName: '学工',_disabled: false},
                    {XM: '张三',ZGH: '01120010',deptName: '董事会',_disabled: false},
                ]
            }else{
                this.users = [
                    {XM: '张三',ZGH: '01120010',deptName: '学工',_disabled: false},
                    {XM: '李四',ZGH: '01120011',deptName: '人事',_disabled: false},
                    {XM: '王五',ZGH: '01120012',deptName: '教务',_disabled: false},
                    {XM: '陈六',ZGH: '01120013',deptName: '教务',_disabled: false},
                ]
            }
            if(data[0].DM === '4'){
                this.totalSize = 1
            }else{
                this.totalSize = 6
            }
        },
        check_p(data){
            // 单选radio
            if(this.type === 'radio') {
                this.selected = data;
                return
            }
            // 多选checkbox
            var arr = [];
            this.selected.map(function(obj){
                arr.push(obj.ZGH);
            });
            var _that = this,index;
            if(Object.prototype.toString.call(data) === '[object Array]'){
                data.map(function(obj){
                    index = arr.indexOf(obj.ZGH);
                    if(index === -1){
                        if(obj._isSelected) _that.selected.push(obj);
                    }else{
                        if(obj._isSelected){
                            _that.selected[index] = obj;
                        }else{
                            arr.splice(index,1);
                            _that.selected.splice(index,1); 
                        }
                    }
                });
            }else{
                index = arr.indexOf(data.ZGH);
                if(index === -1){
                    if(data._isSelected) this.selected.push(data);
                }else{
                    if(data._isSelected){
                        this.selected[index] = data; 
                    }else{
                        this.selected.splice(index,1);
                    }
                }
            }
        },
        handleDelete(data){
            var antdPeCenterVM = this.$refs['antd-pe-center'];
            if(Object.prototype.toString.call(data) === '[object Object]'){
                antdPeCenterVM.options.map(function(option){
                    if(data.ZGH === option.ZGH) {
                        antdPeCenterVM.isCheckedAll = false;
                        option._isSelected = false;
                    }
                    return option
                });
            }else{
                // 删除全部,多选checkbox专有特性
                var arr = [];
                data.map(function(obj){
                    arr.push(obj.ZGH);
                });
                antdPeCenterVM.options.map(function(option){
                    if(arr.indexOf(option.ZGH)>-1) {
                        antdPeCenterVM.isCheckedAll = false;
                        option._isSelected = false;
                    }
                    return option
                });
                console.log(antdPeCenterVM.options)
            }
        },
        getCurrentVal() {
            console.log(this.selected);
        },
        searchUser(element){
            if(element == 'loadmore'){
                this.users = this.users.concat([
                        {XM: '阿三',ZGH: '01120014',deptName: '学工',_disabled: false},
                        {XM: '阿斯',ZGH: '01120015',deptName: '人事',_disabled: false},
                        {XM: '阿武',ZGH: '01120016',deptName: '人事',_disabled: false},
                    ]);
            }
        }
    },
    mounted(){
        var that = this;
        tgTurning.utils.Get('../static/cxzzry.json').then(function(res){
            var rows = res.data.cxzzry.rows;
            that.treeData = tgTurning.utils.toTreeData(rows, null, {ukey:"DM", pkey:'LS', toCKey:'children'})
        });
    }
}
</script>

<style>
  
</style>
