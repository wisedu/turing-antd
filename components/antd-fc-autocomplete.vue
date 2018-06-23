<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <AutoComplete :value="value" icon="ios-search" :placeholder="placeholder" style="width:100%">
            <div class="demo-auto-complete-item" v-for="item in options" :key="item.id">
                <div class="demo-auto-complete-group">
                    <span>{{ item.title }}</span>
                    <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
                </div>
                <Option v-for="option in item.children" :value="option.title" :key="option.title">
                    <span class="demo-auto-complete-title">{{ option.title }}</span>
                    <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
                </Option>
            </div>
            <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
        </AutoComplete>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem, defaults} from 'tg-turing'
export default {
    name:"antd-fc-autocomplete",
    extends: ConnectItem,
}
</script>

<style>

</style>
