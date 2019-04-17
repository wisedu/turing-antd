<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <template v-if="params.tooltip !== 0 && !params.tooltip === true">
            <!--input这段是一样的-->
            <Input ref="input_com" :value="value" type="textarea" :placeholder="placeholder" :readonly="readonly" v-bind="params" @input="onChange" :disabled="disabled">
            </Input>
        </template>
        <Tooltip v-else :content="params.tooltip" class="input-hasTip">
            <!--input这段是一样的-->
            <Input ref="input_com" :value="value" type="textarea" :placeholder="placeholder" :readonly="readonly" v-bind="params" @input="onChange" :disabled="disabled">
            </Input>
        </Tooltip>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-textarea",
    extends: ConnectItem,
    methods:{
        onChange(value){
            if (event === undefined || event === null) {
                //FF 是不支持event & ie9
                let label = value;
                this.$emit("on-item-change", this.name, value, label, this.model)
                this.$emit("input", value)
            } else if (event.isComposing !== true) {
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

</style>
