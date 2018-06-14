<template>
    <FormItem :label="caption">
        <div class="iview-fc-static-readonly">{{display !== undefined ? display : value}}&nbsp;</div>
    </FormItem>
</template>

<script>
import {ConnectItem} from 'tg-turing'

export default {
    name:"iview-fc-static",
    extends: ConnectItem,
}
</script>

<style>
.iview-fc-static-readonly{
    padding-left: 8px;
}
</style>
