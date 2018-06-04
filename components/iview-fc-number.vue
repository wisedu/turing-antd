<template>
    <div>
        <FormItem :label="caption">
            <InputNumber :max="10" :min="1" v-model="currentValue" :placeholder="placeholder"></InputNumber>
        </FormItem>
    </div>
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
