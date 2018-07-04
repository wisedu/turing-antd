<template>
    <div class="antd-gc-grid-wrap">
        <div class="tg-mb-16">
            <Table :columns="columns" :data="data.rows || data" border highlight-row 
                @on-current-change="onHighlight" @on-select-all="onSelectAll" @on-selection-change="onSelectionChange">
                <slot :name="model.name" :slot="model.name" v-for="model in columns" slot-scope="scope" ></slot>
            </Table>
        </div>
        <div class="tg-clear-child">
            <Page v-if="!!pager" class="tg-right" :total="pager.total" :page-size="pageSize" show-total show-elevator show-sizer
                @on-change="onChangePage" @on-page-size-change="onChangePageSize" :page-size-opts="options">
                <slot name="pagerTotal"></slot>
            </Page>
        </div>
    </div>
</template>

<script>
export default {
    name: "antd-gc-grid",
    props: {
        columns: Array,
        data: [Array, Object],
        pager: Object,
    },
    data() {
        return {
            options: this.pager.options || [10, 20, 50, 100],
            pageNumber: this.pager.index || 1,
            pageSize: this.pager.size || 10
        }
    },
    watch:{
        data:{
            handler(newValue) {
                if (newValue.total !== undefined) {
                    this.pager.total = newValue.total;
                }
            },
            deep: true
        }
    },
    created() {
        if (this.data.total !== undefined) {
            if (this.pager === undefined) {
                this.pager = {};
            }
            this.pager.total = this.data.total;
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
        }
    }
}
</script>

<style>

</style>
