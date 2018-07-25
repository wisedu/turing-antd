<template>
    <layout-tmb v-bind="header">
        <div slot="content">
            <router-view></router-view>
        </div>
    </layout-tmb>
</template>
<script>
import layoutTmb from '../layout/layout-tmb.vue';
export default {
    data(){
        return {
            header:{
                appName: "测试的应用",
                activeName:"B",
                logo:"http://my.wisedu.com/new/portal/custom/img/logo/logo-mini.png",
                userImage:"http://my.wisedu.com/portal/img/icon/user-role-teacher.png",
                userName:"qiyu",
                menu:[{
                    name:"A",
                    icon:"ios-people",
                    url:"http://www.baidu.com"
                },{
                    name:"B",
                    url:"#/table"
                },{
                    name:"C",
                    url:""
                },{
                    name:"D",
                    url:"",
                    icon:"stats-bars",
                    items:[{
                        name:"DD",
                        icon:"settings",
                        url:""
                    }]
                }],
                dropMenu:[{
                    name:"个人中心",
                    callback: function() {
                        alert("个人中心");
                    }
                },{
                    name:"退出",
                    url:"http://www.baidu.com",
                    callback: function() {
                        alert("退出");
                    }
                }],
                footer:{
                    type:"text",
                    data:"金智教育1"
                }
            }
        };
    },
    components:{
        layoutTmb
    }
}
</script>
<style>
.layout{
    padding:8px;
}
</style>