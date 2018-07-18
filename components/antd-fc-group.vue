<template>
    <div class="tg-mb-24">
        <h4 class="antd-fc-group-title">{{name}}</h4>
        <label>{{desc}}</label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"antd-fc-group",
    props: {
        name: String,
        desc: String
    }
}
</script>

<style>
.antd-fc-group-title {
    font-size: 16px;
    font-weight: 700;
    border-left: 4px solid #3E50B4;
    padding-left: 8px;
    line-height: 16px;
    min-height: 0;
    margin-bottom: 16px
}
</style>
