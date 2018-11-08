<template >
    <div class="antd-gb-collection-wrap">
        <div class="tg-mb-16">
            <tg-listview :datas="datas.rows || datas" :grid="grid">
                <template slot="itemTemplate" slot-scope="props">
                    <slot name="itemTemplate" :data="props.data" :index="props.index"></slot>
                </template>
                <template slot="alternateTemplate" slot-scope="props">
                    <slot name="alternateTemplate" :data="props.data" :index="props.index"></slot>
                </template>
            </tg-listview>
            <div class="tg-clear-child" v-if="total > 0">
                <Page v-if="!!pager" class="tg-right" :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator show-sizer
                    @on-change="onChangePage" @on-page-size-change="onChangePageSize" :page-size-opts="options">
                    <slot name="pagerTotal"></slot>
                </Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "antd-gb-collection",
    props: {
        columns: Array,
        grid:Object,
        datas: {
            type:[Array, Object],
            default:function() {
                return [];
            }
        },
        pager: {
            type:Object,
            default: {}
        },
        displayFieldFormat: {
            type:String,
            default:""
        },
    },
    data() {
        return {
            options: this.pager.options || [10, 20, 50, 100]
        }
    },
    computed:{
        total:function(){
            let total = 0;
            if (this.datas !== undefined && this.datas.count !== undefined) {
                total = this.datas.count;
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
        onChangePage(pageNumber) {
            this.pageNumber = pageNumber;
            this.$emit("reload", pageNumber, this.pageSize)
        },
        onChangePageSize(pageSize) {
            //改变分页大小后，自动跳回第一页
            this.pageSize = pageSize;
            this.$emit("reload", 1, pageSize)
        },
    },
    mounted(){
        console.log(1)
    }
}
</script>

<style>
</style>
