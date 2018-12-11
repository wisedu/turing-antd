<template>
    <div class="us-modal">
        <div class="tjyh-main">
            <antd-pe-left :treeData="treeData" :tabData="tabData" @on-select="treeItemSelect_p"></antd-pe-left>
            <antd-pe-center ref="antd-pe-center" :users="users" @on-check="check_p" :isShowLoadmore="isShowLoadmore" @on-searchUser="searchUser"></antd-pe-center>
            <antd-pe-right  v-model="selected"></antd-pe-right>
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
            isShowLoadmore: true,
            totalSize: 15,
        }
    },
    watch: {
        selected: {
            handler:function(newVal){
                var arr = newVal.map(function(val){
                    return val.ZGH;
                });
                this.users.forEach(function(user){
                    if(arr.indexOf(user.ZGH) === -1) user._isSelected = false;
                    return user
                });
                this.$refs['antd-pe-center'].dataChange(this.users);
            },
            deep:true
        },
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
            console.log(data)
            //取到树节点去查询
            if(data[0].DM === '4'){
                this.users = [
                    {XM: '啊哈哈',ZGH: '01120000',deptName: '学工',_disabled: false},
                ]
            }else{
                this.users = [
                    {XM: '张三',ZGH: '01120010',deptName: '学工',_disabled: false},
                    {XM: '李四',ZGH: '01120011',deptName: '人事',_disabled: false},
                    {XM: '王五',ZGH: '01120012',deptName: '教务',_disabled: false},
                ]
            }
            if(data[0].DM === '4'){
                this.totalSize = 1
            }else{
                this.totalSize = 15
            }
        },
        check_p(data){
            this.selected = data;
        },
        getCurrentVal(){
            console.log(this.selected);
        },
        searchUser(element){
            if(element == 'loadmore'){
                this.users = this.users.concat(this.users);
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
