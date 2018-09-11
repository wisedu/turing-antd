<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <AutoComplete :value="value" icon="ios-search" :data="fullOptions" :placeholder="placeholder" style="width:100%" @on-focus.once="loadData('')" @on-change="onChange"></AutoComplete>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-autocomplete",
    extends: ConnectItem,
    methods: {
        loadData(key){
            if (this.model.dict !== undefined) {
                defaults.getDictData[0](this.model.dict, {key}, datas => {
                    this.localOptions = datas;
                });
            }
        },
    },
    computed:{
        fullOptions(){
            let opts = [];

            this.options.map(item => {
                if (opts.filter(opt => opt.value === item.value).length === 0) {
                    opts.push(item)
                }
            })
            this.localOptions.map(item => {
                if (opts.filter(opt => opt.value === item.value).length === 0) {
                    opts.push(item)
                }
            })
            return opts;
        }
    }
}
</script>

<style>

</style>
