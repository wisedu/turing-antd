<template>
    <div>
        <antd-fc-form :fields="shownFields" :value="formValue" :displayFieldFormat="displayFieldFormat"
            :column="column" :labelWidth="labelWidth" @on-value-change="updateValue" :readonly="readonly">
            <slot :name="'search-' + model.name" :slot="model.name" v-for="model in shownFields"></slot>
            <div slot="after">
                <FormItem>
                    <Button @click="search" type="primary" shape="circle" icon="ios-search">查询</Button>
                    <Button @click="clear" type="default" shape="circle">清空</Button>
                </FormItem>
            </div>
        </antd-fc-form>
    </div>
</template>

<script>
import {FormConnector} from "tg-turing";
export default {
    name: "antd-gb-search",
    extends: FormConnector,
    props:{
        column:{
            default:3
        }
    },
    computed: {
        shownFields() {
            return this.fields.filter(item => item.hidden !== true);
        }
    },
    methods: {
        search() {
            this.$emit("search", this.formValue);
        },
        clear() {
            this.formValue = {}
            this.$emit("clear");
        }
    }
}
</script>

<style>

</style>
