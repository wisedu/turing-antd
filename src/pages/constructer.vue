<template>
    <div>
        <div>
            条件构造器
        </div>

        <antd-gb-constructer :model="model" :value1="value1"  ref="constructer"></antd-gb-constructer>
        
        <p class="tools"><button @click="getSearchValue">获取搜索值</button></p>
        <div>结果是:<div id="result"></div></div>
    </div>
</template>

<script>
// import AntdGbSearchContainer from "../../components/antd-gb-search-container";
// import AntdGbConstructerItem from "../../components/antd-gb-constructer-item";
import AntdGbConstructer from "../../components/antd-gb-constructer";
import tgTurning from "tg-turing";
export default {
  components: {
    AntdGbConstructer,
    // AntdGbConstructerItem,
    // AntdGbSearchContainer
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
          caption: "开关",
          name: "XM1",
          xtype: "switcher",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "大文本",
          name: "XM2",
          xtype: "textarea",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "数字",
          name: "XM4",
          xtype: "number",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "日期（年月日）",
          name: "XM5",
          xtype: "date-local",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "日期（年月）",
          name: "XM6",
          xtype: "date-ym",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "日期（年月日时分）",
          name: "XM7",
          xtype: "date-full",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "日期范围",
          name: "XM8",
          xtype: "date-range",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        },
        {
          caption: "下拉",
          name: "XM9",
          xtype: "select",
          url:'/sys/1.do',
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        }
      ],
      value1: [
        [{ name: "col3", value: "b", linkOpt: "and", builder: "include","caption":"列3","value_display":"正常办结3" }],
        [
          { name: "col1", value: "a", linkOpt: "and", builder: "include","caption":"列1","value_display":"正常办结1" },
          { name: "col2", value: "x", linkOpt: "or", builder: "equal","caption":"列2","value_display":"正常办结2" }
        ],
        [{ name: "col4", value: "c", linkOpt: "and", builder: "include","caption":"列4","value_display":"正常办结4" }]
      ],
      result: "",
      modal1: false,
      selectmodel1:'',
      value2:'',
      addType:'',
      targetIndex:''
    };
  },
  watch: {},
  methods: {
    getSearchValue() {
      this.result = this.$refs['constructer'].getResult();
      document.getElementById("result").innerHTML = JSON.stringify(this.result);
    }

  },
  mounted() {
    var that = this;
  }
};
</script>

<style>

</style>
