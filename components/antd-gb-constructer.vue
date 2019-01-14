<template>
    <div>
        <antd-gb-search-container :model="model" v-model="value1" ref="gbconstructer" style="padding:16px 0;">
            <template slot="searchitem" slot-scope="props">
              <div>
                  <span v-for="(sub,sindex) in props.model" :key="'sub'+sindex" class="cons-item-span">
                      {{sub.name}}-{{sub.builder}}-{{sub.value}}
                  </span>
                  <label class="add add-and" @click="addAndCb(props.index)">增加且条件</label>
              </div>
            </template>
            <span slot="searchbottom" class="add add-or" @click="addOrCb">增加或条件</span>
        </antd-gb-search-container>
        <Modal
            v-model="modal1"
            title="Common Modal dialog box title"
            @on-ok="ok"
            @on-cancel="cancel">
            <antd-gb-constructer-item :model="model" selectmodel1="" value2="" :type="addType" ref="consadd"></antd-gb-constructer-item>
        </Modal>
    </div>
</template>

<script>
import AntdGbSearchContainer from "./antd-gb-search-container";
import AntdGbConstructerItem from "./antd-gb-constructer-item";
// import AntdGbConstructerAdd from "../../components/antd-gb-constructer-add";
import tgTurning from "tg-turing";
export default {
    name: "antd-gb-constructer",
  components: {
    AntdGbConstructerItem,
    AntdGbSearchContainer
  },
  props:{
      model:Array,
      value1:Array
  },
  data() {
    return {
      addType:'',
      targetIndex:'',
      modal1:false,
      selectmodel1:'',
      value2:'',
    };
  },
  watch: {},
  methods: {
    addAndCb(index){
      this.addType = 'and';
      this.targetIndex = index;
      this.modal1 = true;
    },
    addOrCb() {
      this.addType = 'or';
       this.modal1 = true;
    },
    ok() {
      // debugger;
      this.$Message.info("Clicked ok");
      var result = this.$refs['consadd'].getResult();
      if(this.addType === 'and'){
        this.value1[this.targetIndex].push(result);
      }else {
        this.value1.push([result]);
      }
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getResult() {
        return this.value1;
    //   this.result = this.value1;

    //   document.getElementById("result").innerHTML = JSON.stringify(this.result);
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
