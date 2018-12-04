<template>
    <div class="us-modal">
        <div class="tjyh-main">
            <antd-pe-left :treeData="treeData" :tabData="tabData" @on-select="treeItemSelect_p"></antd-pe-left>
            <antd-pe-center ref="antd-pe-center" :users="users" @on-check="check_p" type="radio"></antd-pe-center>
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
            treeData: []
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
        }
    },
    methods: {
        treeItemSelect_p(data){
            console.log(data)
            //取到树节点去查询
            this.users = [
                {XM: '张三',ZGH: '01120010',deptName: '学工',_disabled: false},
                {XM: '李四',ZGH: '01120011',deptName: '人事',_disabled: false},
                {XM: '王五',ZGH: '01120012',deptName: '教务',_disabled: false}
            ]
        },
        check_p(data){
            this.selected = data;
        },
        getCurrentVal(){
            console.log(this.selected);
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
