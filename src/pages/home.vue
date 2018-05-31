<template>
    <div>
        <tg-form :fields="fields" type="iview"></tg-form>
    </div>
</template>

<script>
import User from "../models/User";
let user = new User();
export default {
    data(){
        return {
            fields:user.view("默认表单:form"),
            param:{
                append:"11"
            }
        }
    }
}
</script>

<style>

</style>
