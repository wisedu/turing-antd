import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import iView from 'bh-iview';
import 'bh-iview/dist/styles/iview.css';
Vue.use(iView);
import tgTuring from 'tg-turing';
import 'tg-turing/dist/css/default/tg-turing.min.css';
import 'tg-turing/dist/style/default/tg-turing.css';
Vue.use(tgTuring);
window["tg-turing"] = tgTuring;

import home from './pages/home.vue';
import table from './pages/table.vue';
import search from './pages/search.vue';
import constructer from './pages/constructer.vue';
import person from './pages/person.vue';
import grid from './pages/grid.vue';
import upload from './pages/upload.vue';
import editor from './pages/editor.vue';

import COMS from "../entry";
Vue.use(COMS)

Vue.use(VueRouter)

import alignCenter from "./icons/align-center.svg";
import alignLeft from "./icons/align-left.svg";
import alignRight from "./icons/align-right.svg";
import bold from "./icons/bold.svg";
import checklist from "./icons/checklist.svg";
import code from "./icons/code.svg";
import github from "./icons/github.svg";
import image from "./icons/image.svg";
import italic from "./icons/italic.svg";
import link from "./icons/link.svg";
import ol from "./icons/ol.svg";
import paragraph from "./icons/paragraph.svg";
import quote from "./icons/quote.svg";
import remove from "./icons/remove.svg";
import strike from "./icons/strike.svg";
import ul from "./icons/ul.svg";
import underline from "./icons/underline.svg";

// import svgSpriteLoader from './svg-sprite-loader'
// const __svg__ = { path: './icons/*.svg', name: './icons/svg.svg' }
// svgSpriteLoader(__svg__.filename)

tgTuring.defaults.getDictData[0] = function (dict, params, callback){
    tgTuring.utils.Get(dict.url, {"searchValue": params.key}).then(function(result) {
        var datas;
        if (result.data instanceof Array === true) {
            datas = result.data.map(function(item) {
                return {
                    label: item["name"],
                    value: item["id"]
                }
            })
            callback(datas);
        } else {
            try{
                datas = result.data.datas.code.rows.map(function(item) {
                    return {
                        label: item["name"],
                        value: item["id"]
                    }
                })
                callback(datas);
            } catch (e) {
                console.error(e, dict.url, dict, result);
            }
        }
    })
};
tgTuring.defaults.getDictTreeData[0] = function (dict, params, callback){
    var treeParams = {};
    if (params !== undefined && params.key !== undefined) {
        treeParams = {"pId": params.key};
    }
    tgTuring.utils.Get(dict.url, treeParams).then(function(result) {
        var datas;
        try{
            datas = result.data.datas.code.rows.map(function(item) {
                item["label"] = item["name"];
                item["value"] = item["id"];
                if (item["isParent"] === 1) {
                    item["children"] = [];
                    item["loading"] = false;
                }
                return item;
            })
            if (params !== undefined && params.key !== undefined) {
            }else {
                datas = window["tg-turing"].utils.toTreeData(datas, "", {ukey:"id", pkey:'pId', toCKey:'children'})
            }
            callback(datas);
        } catch (e) {
            console.error(e, dict.url, dict, result);
        }
    })
};


if(process.env.NODE_ENV === 'development'){
    window.apiPath = "http://amptest.wisedu.com";
}else{
    window.apiPath = ".";
}

const routes = [
    { path: '/', component: home, name:"首页" },
    { path: '/table', component: table, name:"table" },
    { path: '/person', component: person, name:"person" },
    { path: '/grid', component: grid, name:"grid" },
    { path: '/upload', component: upload, name:"upload" },
    { path: '/search', component: search, name:"search" },
    { path: '/constructer', component: constructer, name:"constructer" },
    { path: '/editor', component: editor, name:"editor" },
]
const router = new VueRouter({
    routes,
})

  
new Vue({
    el:"#root",
    render:h=>h(App),
    router
})
