<template>
    <FormItem :label="caption" :prop="name">
        <InputNumber :max="10" :min="1" v-model="currentValue" :placeholder="placeholder"></InputNumber>
    </FormItem>
</template>

<script>
import {FormConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-number",
    extends: FormConnectItem,
}
</script>

<style>

</style>
