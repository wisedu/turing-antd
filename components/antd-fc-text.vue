<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--input这段是一样的-->
            <Input ref="input_com" :value="value" :placeholder="placeholder" :readonly="readonly" v-bind="params" @input="onChange" :disabled="disabled">
                    <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
                    <span slot="append" v-if="params.append">{{params.append}}</span>
            </Input>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <!--input这段是一样的-->
            <Input ref="input_com" :value="value" :placeholder="placeholder" :readonly="readonly" v-bind="params" @input="onChange" :disabled="disabled">
                <span slot="prepend" v-if="params.prepend">{{params.prepend}}</span>
                <span slot="append" v-if="params.append">{{params.append}}</span>
            </Input>
        </Tooltip>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-text",
    extends: ConnectItem,
    methods:{
        onChange(value){
            if (event.isComposing !== true) {
                let label = value;
                this.$emit("on-item-change", this.name, value, label, this.model)
                this.$emit("input", value)
            }
        }
    },
    mounted(){
        if (this.formReadonly !== true){
            this.$refs.input_com.$el.addEventListener('compositionstart', onCompositionStart)
            this.$refs.input_com.$el.addEventListener('compositionend', onCompositionEnd)
        }
    }
}

function onCompositionStart (e) {
  e.target.composing = true
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) return
  e.target.composing = false
  trigger(e.target, 'input')
}

function trigger (el, type) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

</script>

<style>
.input-hasTip.ivu-tooltip{
    width:100%;
}
.input-hasTip.ivu-tooltip .ivu-tooltip-rel{
    width:100%;
}
.input-hasTip .ivu-input{
    border-color: #ff9900;
}
.input-hasTip .ivu-input:focus{
    box-shadow: 0 0 0 2px rgba(255,153,00,.2)
}
</style>
