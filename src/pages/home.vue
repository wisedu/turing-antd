<template>
    <div>
        <tg-form :fields="fields" type="iview" :column=4></tg-form>
    </div>
</template>

<script>
import Student from "../models/Student";
let inst = new Student();
export default {
    data(){
        return {
            fields: inst.view("默认表单:form"),
            param:{
                append:"11"
            }
        }
    }
}
</script>

<style>

</style>
