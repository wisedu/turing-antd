<template>
    <div>
        <p class="tools"><button >高级搜索</button></p>

        <antd-gb-advancedsearch :model="model" v-model="value" ref="gbsearch" style="padding:16px 0;">
        </antd-gb-advancedsearch>

        <p class="tools"><button @click="getSearchValue">获取搜索值</button></p>
        <div>结果是:<div id="result"></div>
        </div>
    </div>
</template>

<script>
import AntdGbAdvancedsearch from "../../components/antd-gb-advancedsearch";
import tgTurning from "tg-turing";
export default {
  components: {
    AntdGbAdvancedsearch,
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
    getSearchValue() {
      var result = this.$refs["gbsearch"].getResult();
      document.getElementById("result").innerHTML = JSON.stringify(result);
    }
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
