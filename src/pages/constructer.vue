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
          caption: "姓名1",
          name: "XM1",
          xtype: "switcher",
          defaultBuilder: "equal",
          defaultBuilderName: "相等"
        }
      ],
      value1: [
        [{ name: "col3", value: "b", linkOpt: "and", builder: "include" }],
        [
          { name: "col1", value: "a", linkOpt: "and", builder: "include" },
          { name: "col2", value: "x", linkOpt: "or", builder: "equal" }
        ],
        [{ name: "col4", value: "c", linkOpt: "and", builder: "include" }]
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
.add {
  margin: 0 8px;
  display: inline-block
}
.add-and {
    border:solid 1px red;
    margin-left:1px;
}
.add-or {
    border:solid 1px green;
    margin-left:1px;
}
</style>
