<template>
    <div>
        <antd-gb-search-container :model="model" v-model="newValue" ref="gbconstructer" style="padding:16px 0;">
            <template slot="searchitem" slot-scope="props">
              <div style="margin-bottom: 4px;">
                  <span v-for="(sub,sindex) in props.model" :key="'sub'+sindex" class="cons-item-span">
                      <span>{{sub.caption?sub.caption:sub.name}}-{{sub.builder_display?sub.builder_display:sub.builder}}-{{sub.value_display?sub.value_display:sub.value}}</span>
                      <Icon type="md-trash" @click="deleteItem(props.index,sindex,sub)" style="    vertical-align: initial;" />
                  </span>
                  <label class="add add-and" @click="addAndCb(props.index)">增加[且]条件</label>
              </div>
            </template>
            <span slot="searchbottom" class="add add-or" @click="addOrCb">增加[或]条件</span>
        </antd-gb-search-container>
        <Modal
            v-model="modalVisible"
            width="600"
            title="增加"
            :loading="isloading"
            @on-ok="ok"
            @on-cancel="cancel">
            <antd-gb-constructer-item :model="model" :selectmodel="selectmodel" :value="selectvalue" :type="addType" :builderlists="builderlists" ref="consadd"></antd-gb-constructer-item>
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
      value1:Array,
      builderlists:Object
  },
  data() {
    return {
      addType:'',
      targetIndex:'',
      modalVisible:false,
      selectmodel:'',
      selectvalue:'',
      isloading:true
    };
  },
  watch: {
    // modalVisible(){
    //   debugger;
    //   this.selectmodel = '';
    //   this.selectvalue = '';
    // }
  },
  computed:{
    newValue(){
      return this.value1;
    }
  },
  methods: {
    addAndCb(index){
      this.addType = 'and';
      this.targetIndex = index;
      this.$refs['consadd'].clear();
      this.modalVisible = true;
    },
    addOrCb() {
      this.addType = 'or';
       this.modalVisible = true;
    },
    ok() {
      // debugger;
      // this.$Message.info("Clicked ok");
      var result = this.$refs['consadd'].getResult();
      if (!result) {
        this.isloading = false;
        this.modalVisible = true;
      } else {
        if(this.addType === 'and'){
          this.value1[this.targetIndex].push(result);
        }else {
          this.value1.push([result]);
        }
        this.modalVisible = false;
      }
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
    },
    getResult() {
        return this.value1;
    },
    deleteItem(index,sindex,sub){
      this.newValue[index].splice(sindex,1);
    }
  },
  mounted() {
    var that = this;
    // debugger
  }
};
</script>

<style>
.add {
  margin: 0 8px;
  display: inline-block;
  font-size: 12px;
  padding: 0 2px;
  color: #2e8cf0;
}
.add-and {
    border:solid 1px #2e8cf0;
    margin-left:1px;
    margin-top: 2px;
}
.add-or {
    border:solid 1px #2e8cf0;
    margin-left:1px;
}
.cons-item-span {
    border: solid 1px #2e8cf0;
    display: inline-block;
    vertical-align: top;
    margin: 0 4px 2px 0;
    padding: 2px 4px;
    font-size: 14px;
}
</style>
