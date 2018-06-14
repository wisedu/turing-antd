<template>
    <div>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
    </div>
</template>

<script>
import {ConnectItem} from 'tg-turing'
export default {
    name:"iview-fc-uploadfile",
    extends: ConnectItem,
}
</script>

<style>

</style>
