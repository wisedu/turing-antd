import {Adapter} from './components/Adapter';
import IviewFcForm from './components/iview-fc-form';
import IviewFcStatic from './components/iview-fc-static';
import IviewFcText from './components/iview-fc-text';
import IviewFcDate from './components/iview-fc-date';
import IviewFcButtonlist from './components/iview-fc-buttonlist';
import IviewFcNumberRange from './components/iview-fc-number-range';
import IviewFcNumber from './components/iview-fc-number';
import IviewFcSelect from './components/iview-fc-select';
import IviewFcUploadfile from './components/iview-fc-uploadfile';
import Form from './components/form.js';

const components = {
    IviewFcForm,IviewFcStatic,IviewFcText,IviewFcDate,IviewFcButtonlist,IviewFcNumberRange,IviewFcNumber,IviewFcSelect,IviewFcUploadfile
};
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils") return;
        // Vue.customElement(components[key].name, components[key]);
        Vue.component(components[key].name, components[key]);
    });
};
const init = function () {
    window["tg-turing"].iview = {
        Adapter: Adapter,
        form: Form
    };
    
    window["tg-turing"].DataFilter.dictFilter[0] = function dictfilter(result){
        return result.data.datas.code.rows;
    };
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign({}, {
    Adapter,install, init,
    ...components,
});