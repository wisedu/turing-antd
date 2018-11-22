<template >
    <div class="antd-pe-left">
        <Tabs v-if="tabData.length > 0">
            <template v-for="item in tabData">
                <TabPane :label="item.name" :name="item.id">
                    <Tree 
                        :data="treeData"
                        empty-text="无数据"
                        @on-select-change="treeItemSelect"
                    ></Tree>
                </TabPane>
            </template>
        </Tabs>
        <Tree v-if="tabData.length == 0"
            :data="treeData"
            empty-text="无数据"
            @on-select-change="treeItemSelect"
        ></Tree>
    </div>
</template>

<script>
export default {
    name: "antd-pe-left",
    props: {
        treeData: Array,
        tabData: Array,
    },
    data() {
        return {
            
        }
    },
    computed:{
        
    },
    methods: {
        //抛出到父集去查询树节点对应的人员的数据
        treeItemSelect (data){
            this.$emit("on-treeItemSelect", data);
        },
    }
}
</script>

<style>
.antd-pe-left{
    width: calc(100% / 3 - 3px);
    float: left;
}
</style>
