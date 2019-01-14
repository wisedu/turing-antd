<template>
    <div>
        <antd-gb-search-container :model="model" v-model="value" ref="gbsearch" style="padding:16px 0;">
            <template slot="searchitem" slot-scope="props">
            {{props.model.caption}}:<antd-gb-search-item :model="props.model" v-model="props.value" @on-item-change="handle"></antd-gb-search-item>
            </template> 
        </antd-gb-search-container>
    </div>
</template>

<script>
import AntdGbSearchContainer from "./antd-gb-search-container";
import AntdGbSearchItem from "./antd-gb-search-item";
import tgTurning from "tg-turing";
export default {
    name: "antd-gb-advancedsearch",
  components: {
    AntdGbSearchContainer,
    AntdGbSearchItem,
  },
  data() {
    return {
      model: [
        {
          caption: "姓名",
          name: "XM",
          xtype: "text",
          defaultBuilder: "include",
          defaultBuilderName: "包含"
        },
        {
          caption: "姓名1",
          name: "XM1",
          xtype: "switcher",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        }
      ],
      value: {
        XM: "张三",
        XM1: "99"
      },
      value1: [
        [{ name: "col3", value: "b", linkOpt: "and", builder: "include" }],
        [
          { name: "col1", value: "a", linkOpt: "and", builder: "include" },
          { name: "col2", value: "x", linkOpt: "or", builder: "equal" }
        ],
        [{ name: "col4", value: "c", linkOpt: "and", builder: "include" }]
      ],
    };
  },
  watch: {},
  methods: {
    getResult() {
      return this.value;
    },
    handle(val,name,xtype,builder) {
            this.value[name]=val;
        },
  },
  mounted() {
    var that = this;
  }
};
</script>

<style>
.add {
  margin: 0 2px;
}
</style>
