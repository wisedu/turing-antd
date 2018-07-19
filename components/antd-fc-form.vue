<template>
    <div :class={readonly:readonly}>
        <Form :model="formValue" ref="form" :label-width="labelWidth" :rules="ruleValidate">
            <tg-listview :datas="tglistFields" :grid="{gutter:0, column:column}">
                <template slot="beforeTemplate">
                    <slot name="before"></slot>
                </template>
                <template slot="itemTemplate" slot-scope="props" v-if="props.data.hidden !== true">
                    <slot :name="props.data.name" :model="props.data" :value="formValue[props.data.name]" :display="formValue[props.data.name + displayFieldFormat]" :ref="'field_' + props.data.name" :formReadonly="readonly">
                        <component :ref="'field_' + props.data.name" :model="props.data" :is="registedComponentList(props.data, antdForm, 'antd-fc-static', props.index)" 
                        v-model="formValue[props.data.name]" :display="formValue[props.data.name + displayFieldFormat]" :formReadonly="readonly"
                        @on-item-change="updateValue" v-bind="mergeDefaultParams(props.data)"></component>
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
import AntdFcStatic from "./antd-fc-static";
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
            ruleValidate: {}
        }
    },
    computed:{
        tglistFields: function(){
            let rules = {};
            let _newFields = this.fields.map(item => {
                if (item.hidden === true) {
                    item._lv_hidden = true;
                } else {
                    rules[item.name] = []
                    if (item.required === true) {
                        rules[item.name].push({
                            required: true, trigger: 'blur', message: `不能为空`
                        });
                    }
                }
                return item;
            })

            for(let key in rules) {
                if (rules[key].length === 0){
                    delete rules[key];
                }
            }
            this.ruleValidate = rules;
            return _newFields;
        }
    },
    methods: {
        validate(callback){
            this.$refs.form.validate(callback)
        },
        validateField(){
            this.$refs.form.validateField(prop, callback)
        },
        resetFields(){
            this.$refs.form.resetFields();
        },
        mergeDefaultParams(model){
            let defaultParams = JSON.parse(JSON.stringify(antdForm[model.xtype]));
            delete defaultParams.name;
            return Object.assign({}, defaultParams, model);
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
