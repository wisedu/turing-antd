<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <AutoComplete ref="input_com" :value="value" icon="ios-search" :data="fullOptions" :placeholder="placeholder" style="width:100%" @on-search="loadData" @on-focus.once="loadData('')" @input="onChange"></AutoComplete>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-autocomplete",
    extends: ConnectItem,
    data(){
        return {
            localOptions:[]
        }
    },
    methods: {
        loadData(key){
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, {key,pageSize:8}, datas => {
                    this.localOptions = datas;
                });
            }
        },
        onChange(value){
            // if (event.isComposing !== true) {
                let label = value;
                this.$emit("on-item-change", this.name, value, label, this.model)
                this.$emit("input", value)
            // }
        }
    },
    computed:{
        fullOptions(){
            let opts = [];

            this.options.map(item => {
                if (opts.filter(opt => opt === item).length === 0) {
                    opts.push(item.label)
                }
            })
            this.localOptions.map(item => {
                if (opts.filter(opt => opt === item).length === 0) {
                    opts.push(item.label)
                }
            })
            return opts;
        }
        
    },
    mounted(){
        // if (this.formReadonly !== true){
        //     this.$refs.input_com.$children[0].$children[0].$el.addEventListener('compositionstart', onCompositionStart)
        //     this.$refs.input_com.$children[0].$children[0].$el.addEventListener('compositionend', onCompositionEnd)
        // }
    }
}

// function onCompositionStart (e) {
//   e.target.composing = true
// }

// function onCompositionEnd (e) {
//   // prevent triggering an input event for no reason
//   if (!e.target.composing) return
//   e.target.composing = false
//   trigger(e.target, 'input')
// }

// function trigger (el, type) {
//   const e = document.createEvent('HTMLEvents')
//   e.initEvent(type, true, true)
//   el.dispatchEvent(e)
// }

</script>

<style>

</style>
