import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import iView from 'bh-antd';
import 'bh-antd/dist/styles/antd.css';
Vue.use(iView);
import tgTuring from 'tg-turing';
import 'tg-turing/dist/css/default/tg-turing.min.css';
import 'tg-turing/dist/style/default/tg-turing.css';
Vue.use(tgTuring);
window["tg-turing"] = tgTuring;

import home from './pages/home.vue';

import COMS from "../entry";
Vue.use(COMS)
COMS.init()

Vue.use(VueRouter)

if(process.env.NODE_ENV === 'development'){
    window.apiPath = "http://amptest.wisedu.com";
}else{
    window.apiPath = ".";
}

const routes = [
    { path: '/', component: home, name:"首页" },
]
const router = new VueRouter({
    routes,
})

  
new Vue({
    el:"#root",
    render:h=>h(App),
    router
})
