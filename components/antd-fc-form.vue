<template>
    <div :class={readonly:readonly}>
        <Form :model="formValue" ref="form" :label-width="labelWidth" :rules="validateRules">
            <tg-listview :datas="fields" :grid="{gutter:0, column:column}">
                <template slot="beforeTemplate">
                    <slot name="before"></slot>
                </template>
                <template slot="itemTemplate" slot-scope="props" v-if="props.data.hidden !== true">
                    <slot :name="props.data.name" :model="props.data" :value="formValue[props.data.name]" :display="formValue[props.data.name + displayFieldFormat]" :ref="'field_' + props.data.name" :formReadonly="readonly">
                        <component :ref="'field_' + props.data.name" :model="props.data" :is="registedComponentList(props.data, antdForm, 'static', props.index)" 
                        v-model="formValue[props.data.name]" :display="formValue[props.data.name + displayFieldFormat]" :formReadonly="readonly"
                        :loaddata="loaddata" @on-item-change="updateValue" v-bind="mergeDefaultParams(props.data)"></component>
                    </slot>
                </template>
                <template slot="afterTemplate">
                    <slot name="after"></slot>
                </template>
            </tg-listview>
        </Form>
    </div>
</template>

<script>
import antdForm from "./form";
import AntdFcStatic from "./antd-fc-static.vue";
import {FormConnector} from "tg-turing";
export default {
    name:"antd-fc-form",
    extends: FormConnector,
    components: {
        AntdFcStatic
    },
    data(){
        return {
            //当前字段隐藏时，让listview组件所占位的格子也隐藏
            antdForm: antdForm,
        }
    },
    methods: {
        validate(callback) {
            this.$refs.form.validate(callback)
        },
        validateField() {
            this.$refs.form.validateField(prop, callback)
        },
        resetFields() {
            this.$refs.form.resetFields();
        },
        mergeDefaultParams(model) {
            if (antdForm[model.xtype] !== undefined) {
                let defaultParams = antdForm[model.xtype].default;
                if (defaultParams !== undefined) {
                    return Object.assign({}, JSON.parse(JSON.stringify(defaultParams)), model);
                } else {
                    return model;
                }
            } else {
                return model;
            }
        }
    }
}
</script>

<style>
.readonly .ivu-form{
    border-top: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
}
.readonly .ivu-form .ivu-form-item-label{
    background-color: #f8f8f9;
    border-bottom: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
}
.readonly .ivu-form .ivu-form-item{
    margin-bottom: 0;
    display: flex;
}
.readonly .ivu-form .ivu-form-item-content{
    border-bottom: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
    width: calc(100% - 100px);
    margin-left: 0!important;
}
.readonly .ivu-form .ivu-upload-select{
    display: none;
}
</style>
