<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--DatePicker这段是一样的-->
            <DatePicker :value="value" :type="dateType" :format="dateFormat" :placeholder="placeholder" style="width:100%" @on-change="onChange" transfer :readonly="readonly" :disabled="disabled" v-bind="params"></DatePicker>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <DatePicker :value="value" :type="dateType" :format="dateFormat" :placeholder="placeholder" style="width:100%" @on-change="onChange" transfer :readonly="readonly" :disabled="disabled" v-bind="params"></DatePicker>
        </Tooltip>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'

export default {
    name:"antd-fc-date",
    props:{
        type: String,
        format: String
    },
    data() {
        let dateFormat = 'yyyy-MM-dd';
        if(this.format){
            dateFormat = this.format;
        }else if(this.model && this.model.format){
            dateFormat = this.model.format;
        }

        let dateType = 'datetime';
        if(this.model && this.model.format){
            switch (dateFormat){
                case 'yyyy':
                    dateType = 'year';
                    break;
                case 'MM':
                    dateType = 'month';
                    break;
                case 'yyyy-MM':
                case 'yyyy-MM-dd':
                    dateType = 'date';
                    break;
            }
        }else if(this.type){
            dateType = this.type;
        }

        return {
            dateFormat: dateFormat,
            dateType: dateType
        }
    },
    extends: ConnectItem,
    methods:{
        onChange(value){
            let label = value;
            this.$emit("on-item-change", this.name, value, label, this.model)
            this.$emit("input", value)
        }
    }
}
</script>

<style>

</style>


