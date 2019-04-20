<template>
    <FormItem :label="caption" :label-width="params.labelWidth" >
        <div class="antd-fc-static-readonly">{{display !== undefined ? display : displayValue}}&nbsp;</div>
    </FormItem>
</template>

<script>
import {ConnectItem} from 'tg-turing'

export default {
    name:"antd-fc-static",
    extends: ConnectItem,
    computed:{
        displayValue(){
        	if (Array.isArray(this.value)) {
        		return this.value.join(',');
        	} else {
        		return this.value;
        	}
        }
    }
}
</script>

<style>
.antd-fc-static-readonly{
    padding-left: 8px;
}
</style>
