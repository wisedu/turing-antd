<template>
    <DatePicker v-model="currentValue" :type="type" placeholder="请选择" @on-change="datepickerChange"></DatePicker>
</template>
<script>

export default {

    name: 'search_item_datepicker',

    props: {
        model: {
            type: Object,
            default: function() {
                return {};
            }
        },
        value: { default: '' },
        type:String,
        format:String,
    },
    data() {
        return {
            currentValue: this.value
        };
    },
    computed: {
    },

    watch: {

    },
    created(){
        console.log(this)
    },
    methods: {
        datepickerChange(val){
            this.$emit('input',{
                value:val,
                label:val,
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