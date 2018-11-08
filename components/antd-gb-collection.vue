<template >
    <div class="antd-gb-grid-wrap">
        <div class="tg-mb-16">
            
        </div>
        <div class="tg-clear-child" v-if="total > 0">
            <Page v-if="!!pager" class="tg-right" :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator show-sizer
                @on-change="onChangePage" @on-page-size-change="onChangePageSize" :page-size-opts="options">
                <slot name="pagerTotal"></slot>
            </Page>
        </div>
    </div>
</template>

<script>
export default {
    name: "antd-gb-collection",
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
            options: this.pager.options || [10, 20, 50, 100]
        }
    },
    computed:{
        total:function(){
            let total = 0;
            if (this.data !== undefined && this.data.count !== undefined) {
                total = this.data.count;
            }
            return total;
        },
        pageNumber:{
            get: function () {
                return this.pager.index || 1;
            },
            set: function (newValue) {
                this.pager.index = newValue;
            }
        },
        pageSize: {
            get: function () {
                return this.pager.size || 10;
            },
            set: function (newValue) {
                this.pager.size = newValue;
            }
        }
    },
    methods: {
        onHighlight(currentRow, oldCurrentRow) {
            this.$emit("on-highlight", currentRow, oldCurrentRow);
        },
        onSelectAll(selection) {
            this.$emit("on-select-all", selection);
        },
        onSelectionChange(selection) {
            this.$emit("on-selection-change", selection);
        },
        onChangePage(pageNumber) {
            this.pageNumber = pageNumber;
            this.$emit("reload", pageNumber, this.pageSize)
        },
        onChangePageSize(pageSize) {
            //改变分页大小后，自动跳回第一页
            this.pageSize = pageSize;
            this.$emit("reload", 1, pageSize)
        },
        onSortChange(params) {
            this.$emit("on-sort-change", params.column, params.key, params.order)
        },
    }
}
</script>

<style>
th.antd-gb-grid__header--center{
    text-align: center!important;
}
</style>
