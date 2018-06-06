<template>
    <div>
        <Button @click="handler">Halo</Button>
        <iview-fc-form ref="form" :fields="fields" type="iview" :column=4 :value="data">
            
        </iview-fc-form>
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
            },
            data:{XSBH:"111"}
        }
    },
    methods:{
        handler(){
            this.data.XSBH = "222";
            // this.$refs.form
        }
    }
}
</script>

<style>

</style>
