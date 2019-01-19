<template>
    <div>
        <div>
            条件构造器
        </div>

        <antd-gb-constructer :model="model" :value1="value1"  ref="constructer" :builderlists="builderlists"></antd-gb-constructer>
        
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
      builderlists:{
        "cbl_String": [{
          "name": "include",
          "caption": "包含"
        }, {
          "name": "equal",
          "caption": "等于"
        }, {
          "name": "notEqual",
          "caption": "不等于"
        }, {
          "name": "notInclude",
          "caption": "不包含"
        }, {
          "name": "beginWith",
          "caption": "以..开始"
        }, {
          "name": "endWith",
          "caption": "以..结束"
        }, {
          "name": "m_value_include",
          "caption": "多值包含"
        }, {
          "name": "m_value_equal",
          "caption": "多值相等"
        }, {
          "name": "m_value_not_include",
          "caption": "多值不包含"
        }, {
          "name": "m_value_not_equal",
          "caption": "多值不相等"
        }],
        "cbl_m_List": [{
          "name": "m_value_equal",
          "caption": "相等"
        }, {
          "name": "m_value_not_equal",
          "caption": "不相等"
        }],
        "cbl_Other": [{
          "name": "equal",
          "caption": "等于"
        }, {
          "name": "notEqual",
          "caption": "不等于"
        }, {
          "name": "more",
          "caption": "大于"
        }, {
          "name": "less",
          "caption": "小于"
        }, {
          "name": "moreEqual",
          "caption": "大于等于"
        }, {
          "name": "lessEqual",
          "caption": "小于等于"
        }]
      },
      model: [{
        "name": "JZGBH",
        "caption": "教职工编号",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "search.xtype": "text",
        "dataSize": 20
      }, {
        "name": "ZGH",
        "caption": "职工号",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "quickSearch": true,
        "search.xtype": "text",
        "dataSize": 20
      }, {
        "name": "XM",
        "caption": "姓名",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 6
      }, {
        "name": "XMPY",
        "caption": "姓名拼音",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 90
      }, {
        "name": "XBDM",
        "caption": "性别",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "CSRQ",
        "caption": "出生日期",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "NL",
        "caption": "年龄",
        "dataType": "Int",
        "defaultBuilder": "equal",
        "builderList": "cbl_Other",
        "dataSize": 19
      }, {
        "name": "MZDM",
        "caption": "民族",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "SFZJLXDM",
        "caption": "身份证件类型",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "SFZJH",
        "caption": "身份证件号",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 20
      }, {
        "name": "CJGZRQ",
        "caption": "参加工作年月",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZZMMDM",
        "caption": "政治面貌",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "LXRQ",
        "caption": "来校年月",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "SZDWDM",
        "caption": "所在单位",
        "dataType": "String",
        "defaultBuilder": "m_value_equal",
        "builderList": "cbl_m_List",
        "url": "\/emap\/code\/aff964c7-eef0-44cc-8771-0feab3744af2.do",
        "search.xtype": "multi-tree",
        "xtype": "tree",
        "dataSize": 10
      }, {
        "name": "YRFSDM",
        "caption": "用人方式",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "DQZTDM",
        "caption": "当前状态",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZGXLDM",
        "caption": "最高学历",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZGXWDM",
        "caption": "最高学位",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZYJSZWDM",
        "caption": "专业技术职务",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZYJSZWJBDM",
        "caption": "专业技术职务级别",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "PRZYJSZWDM",
        "caption": "聘任专业技术职务",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "PRZYJSZWJBDM",
        "caption": "聘任专业技术职务级别",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZYGWDM",
        "caption": "主要岗位",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "SJ",
        "caption": "手机",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 30
      }, {
        "name": "DZXX",
        "caption": "电子信箱",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 40
      }, {
        "name": "GLGW",
        "caption": "管理岗位",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "ZYJSGW",
        "caption": "专业技术岗位",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "GQGW",
        "caption": "工勤岗位",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 10
      }, {
        "name": "PROPERTY",
        "caption": "人员属性",
        "dataType": "String",
        "defaultBuilder": "include",
        "builderList": "cbl_String",
        "dataSize": 100
      }],
      value1: [
        [{ name: "col3", value: "b", linkOpt: "and", builder: "include","caption":"列3","value_display":"正常办结3" }],
        
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
