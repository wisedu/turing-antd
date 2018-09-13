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
import upload from './pages/upload.vue';

import COMS from "../entry";
Vue.use(COMS)

Vue.use(VueRouter)

if(process.env.NODE_ENV === 'development'){
    window.apiPath = "http://amptest.wisedu.com";
}else{
    window.apiPath = ".";
}

const routes = [
    { path: '/', component: home, name:"首页" },
    { path: '/table', component: table, name:"table" },
    { path: '/upload', component: upload, name:"upload" },
]
const router = new VueRouter({
    routes,
})

  
new Vue({
    el:"#root",
    render:h=>h(App),
    router
})
