<template>
    <div>
        <div ref="editableGrid"></div>
    </div>
</template>

<script>
import {defaults} from 'tg-turing'
export default {
    name: "antd-gb-editgrid",
    props: {
        columns: Array,
        value: {
            type:Array,
            default:function() {
                return [];
            }
        },
        loading: Boolean,
        displayFieldFormat: {
            type:String,
            default:""
        },
        rowRending: Function
    },
    data() {
        return {
        }
    },
    mounted(){
        let EditableGrid = window["tg-editable-grid"].default;
        let inst = new EditableGrid(this.$refs.editableGrid, {displayFieldFormat:this.displayFieldFormat});
        inst.onEditorLoadData = function(model, value, callback) {
            switch (model.xtype) {
                case "tree":
                    if (model.dict !== undefined) {
                        defaults.getDictTreeData[0](model.dict, {key:value}, datas => {
                            let treedatas = inst.utils.toTreeData(datas, "", {ukey:"id", pkey:'pId', toCKey:'children'})
                            callback(treedatas);
                        });
                    }
                    break;
                default:
                    if (model.dict !== undefined) {
                        defaults.getDictData[0](model.dict, {key:value}, datas => {
                            callback(datas);
                        });
                    }
                    break;
            }
        }
        inst.setData(this.value, this.columns);
    },
    methods:{
        addrow(){
            grid.setData([{"name":"a","price":123}]);
        }
    }
}
</script>

<style>

</style>
