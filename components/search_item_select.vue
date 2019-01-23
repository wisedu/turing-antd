<template>
    <Select filterable v-model="currentValue" @on-change="selectChange" :label-in-value="true">
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
    },

    watch: {
        currentValue(val){
            // console.log('currentValue',val)
        }
    },
    created(){
        console.log(this)
    },
    methods: {
        selectChange(val){
            this.$emit('input',{
                value:val.value,
                label:val.label,
                key:this.model.name
            });
        }
    },

    components: {
    }
}
</script>
<style lang="css">
</style>