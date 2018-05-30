<template>
    <div>
        <iview-md-form :fields="fields"></iview-md-form>
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
