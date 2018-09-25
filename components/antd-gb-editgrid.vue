<template>
    <div>
        <div id="grid" ref="grid"></div>
    </div>
</template>

<script>
const Hypergrid = require('fin-hypergrid');
let grid;
export default {
    name: "antd-gb-datagrid",
    props: {
        columns: Array,
        data: {
            type:[Array, Object],
            default:function() {
                return [];
            }
        },
        pager: {
            type:Object,
            default: {}
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
        Hypergrid.defaults.hoverCellHighlight = {
            enabled: true,
            backgroundColor: 'rgba(255,255,255)'
        }
        Hypergrid.defaults.hoverRowHighlight = {
            enabled: false
        }
        Hypergrid.defaults.hoverColumnHighlight = {
            enabled: false
        }

        Hypergrid.registerTheme(require('../../grid-themes/js/excel'));
        grid = new Hypergrid(this.$refs.grid);
        Hypergrid.applyTheme('excel');
        let customSchema = [
            { name: 'name', header: 'Full Name' },
            { name: 'price', header: 'Price' },
        ];
        const data = require("../../static/data.json");
        grid.setData({data: data, schema: customSchema});
        var behavior = grid.behavior;
        var dataModel = behavior.dataModel;
        dataModel.getCellEditorAt = function(columnIndex, rowIndex, declaredEditorName, options) {
            var editorName = declaredEditorName;
            // if (...) {
                editorName = 'textfield'; // case-insensitive
            // }
            return grid.cellEditors.create(editorName, options);
        }
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
