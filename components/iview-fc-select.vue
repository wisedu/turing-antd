<template>
    <div>
        <FormItem :label="caption">
            <Select v-model="currentValue" :placeholder="placeholder">
                <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
    </div>
</template>

<script>
import {FormConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-select",
    extends: FormConnectItem,
}
</script>

<style>

</style>
