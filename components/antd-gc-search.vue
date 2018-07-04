<template>
    <div>
        <antd-fc-form :fields="fields" :value="formValue" :displayFieldFormat="displayFieldFormat"
            :column="column" :labelWidth="labelWidth" @on-value-change="updateValue" :readonly="readonly">
            <slot :name="'search-' + model.name" :slot="model.name" v-for="model in fields"></slot>
            <div slot="after">
                <FormItem>
                    <Button @click="search" type="primary">查询</Button>
                    <Button @click="clear" type="default">清空</Button>
                </FormItem>
            </div>
        </antd-fc-form>
    </div>
</template>

<script>
import {FormConnector} from "tg-turing";
export default {
    name: "antd-gc-search",
    extends: FormConnector,
    methods: {
        search() {
            this.$emit("search", this.formValue);
        },
        clear() {
            this.formValue = {};
        }
    }
}
</script>

<style>

</style>
