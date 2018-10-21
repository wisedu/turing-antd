<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <Row>
            <Col span="11">
                <Input ref="input_min" :value="value[0]" placeholder="最小" number v-bind="params" @input="onChangeMin" :disabled="disabled" type="number">
                    <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
                    <span slot="append" v-if="params.append">{{params.append}}</span>
                </Input>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
                <Input ref="input_max" :value="value[1]" placeholder="最大" number v-bind="params" @input="onChangeMax" :disabled="disabled" type="number">
                    <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
                    <span slot="append" v-if="params.append">{{params.append}}</span>
                </Input>
            </Col>
        </Row>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value.join(' - ')"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-number-range",
    extends: ConnectItem,
    props:{
        value:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    data(){
        return {
            min:this.value[0],
            max:this.value[1],
        }
    },
    methods:{
        onChangeMin(value){
            this.min = value;
            let newValue = [this.min, this.max];
            if (newValue[0] === undefined || newValue[0] === "" || newValue[0] === null) newValue[0] = 0;
            if (newValue[1] === undefined || newValue[1] === "" || newValue[1] === null) newValue[1] = 99999;
            this.$emit("on-item-change", this.name, newValue, newValue, this.model)
            this.$emit("input", newValue)
        },
        onChangeMax(value){
            this.max = value;
            let newValue = [this.min, this.max];
            if (newValue[0] === undefined || newValue[0] === "" || newValue[0] === null) newValue[0] = 0;
            if (newValue[1] === undefined || newValue[1] === "" || newValue[1] === null) newValue[1] = 99999;
            this.$emit("on-item-change", this.name, newValue, newValue, this.model)
            this.$emit("input", newValue)
        }
    }
}
</script>

<style>

</style>
