<template>
    <Cascader v-model="currentValue" :data="newOptions" filterable @on-change="cascaderChange"></Cascader>
</template>
<script>

export default {

    name: 'search_item_cascader',

    props: {
        model: {
            type: Object,
            default: function() {
                return {};
            }
        },
        options:Array,
        value: { default: '' },
        displayValue: { default: '' }
    },
    data() {
        return {
            currentValue: this.value?this.value:[]
        };
    },
    computed: {
        newOptions() {
            let data = this.options;
            // 属性配置信息
            let attributes = {
                id: 'id',
                parentId: 'pId',
                name: 'name',
                rootId: ""
            };
            let treeData = this.toTreeData(data, attributes);
            return treeData;
        }
    },

    watch: {
        // value(val) {
        //     this.currentValue = val;
        // },
        // currentValue(val) {
        //     this.$emit('input', val);
        // }
    },
    created(){
        //debugger
        console.log(this)
    },
    methods: {
        cascaderChange(val,val2){
            // debugger
            // this.$emit('input',val[0],val2[0].label,this.model.name);
            this.$emit('input',{
                value:val[0],
                label:val2[0].label,
                key:this.model.name
            });
        },
        toTreeData (data, attributes) {
            let resData = data;
            let tree = [];

            for (let i = 0; i < resData.length; i++) {
                if (!resData[i][attributes.parentId]) {
                let obj = {
                    value: resData[i][attributes.id],
                    label: resData[i][attributes.name],
                    children: []
                };
                tree.push(obj);
                resData.splice(i, 1);
                i--;
                }
            }
            run(tree);
            function run(chiArr) {
                if (resData.length !== 0) {
                    for (let i = 0; i < chiArr.length; i++) {
                        for (let j = 0; j < resData.length; j++) {
                        if (chiArr[i].value === resData[j][attributes.parentId]) {
                            let obj = {
                                value: resData[j][attributes.id],
                                label: resData[j][attributes.name],
                                children: []
                            };
                            chiArr[i].children.push(obj);
                            resData.splice(j, 1);
                            j--;
                        }
                        }
                        run(chiArr[i].children);
                    }
                }
            }
            return tree;
        }
    },

    components: {
    }
}
</script>
<style lang="css">
</style>