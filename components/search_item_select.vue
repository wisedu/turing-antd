<template>
    <Select filterable>
        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>

export default {

    name: 'search_item_select',

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
            currentValue: this.value
        };
    },
    computed: {
        // param() {
        //     return this.model.initParam;
        // },
        // selectType() {
        //     if (this.model.xtype === 'select') {
        //         return 'select';
        //     }
        //     if (this.model.xtype === 'multi-select' || this.model.xtype === 'multi-select2') {
        //         return 'multi-select';
        //     }
        // }
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
        // handleDisplayChange(val) {
        //     this.$emit('update:displayValue', val);
        // }
    },

    components: {
    }
}
</script>
<style lang="css">
</style>