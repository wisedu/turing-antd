<template>
    <FormItem :label="caption" :prop="name" :label-width="params.labelWidth" v-if="formReadonly !== true">
        <i-switch :value="value" :true-value="trueValue" :false-value="falseValue" @on-change="onChange" v-bind="params" size="large" :disabled="disabled || readonly">
            <template v-for="item in options">
                <span :slot="item.value" :key="item.value">{{item.label}}</span>
            </template>
        </i-switch>
    </FormItem>
    <antd-fc-static v-else :caption="caption" :prop="name" :value="value" :display="display"></antd-fc-static>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"antd-fc-switcher",
    extends: ConnectItem,
    mounted() {
        // console.log(this.options);
    },
    methods: {
        onChange(val) {
            this.$emit("on-item-change", this.name, val, val, this.model)
            this.$emit("input", val)
        },
    },
    computed: {
        trueValue() {
            if (this.options instanceof Array && this.options.length >= 2) {
                return this.options[0].value;
            } else {
                return true;
            }
        },
        falseValue() {
            if (this.options instanceof Array && this.options.length >= 2) {
                return this.options[1].value;
            } else {
                return false;
            }
        }
    }
}
</script>

<style>

</style>
