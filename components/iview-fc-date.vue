<template>
    <FormItem :label="caption" :prop="name">
        <DatePicker v-model="currentValue" type="date" :placeholder="placeholder" style="width:100%"></DatePicker>
    </FormItem>
</template>

<script>
import {FormConnectItem} from 'tg-turing'

export default {
    name:"iview-fc-date",
    extends: FormConnectItem,
}
</script>

<style>

</style>


