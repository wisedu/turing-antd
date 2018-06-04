<template>
    <div>
        <div v-for="item in options" :key="item.value">
            <Button @click="clickHandler($event, item)">{{item.label}}</Button>
        </div>
    </div>
</template>

<script>
import {FormConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-buttonlist",
    extends: FormConnectItem,
    methods: {
        clickHandler(event, item){
            this.$emit("onChange", item.value, item, event);
        }
    }
}
</script>

<style>

</style>
