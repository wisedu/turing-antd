import {Adapter} from './components/Adapter';
import IviewFcText from './components/iview-fc-text';
import IviewFcDate from './components/iview-fc-date';
import IviewFcButtonlist from './components/iview-fc-buttonlist';
import IviewFcNumberRange from './components/iview-fc-number-range';
import IviewFcNumber from './components/iview-fc-number';
import IviewFcSelect from './components/iview-fc-select';
import IviewFcUploadfile from './components/iview-fc-uploadfile';

const components = {
    IviewFcText,IviewFcDate,IviewFcButtonlist,IviewFcNumberRange,IviewFcNumber,IviewFcSelect,IviewFcUploadfile
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
    Object.assign(window["tg-turing"].iview.form, {
        "text": "iview-fc-text",
        "date": "iview-fc-date",
        "date-local": "iview-fc-date",
        "select": "iview-fc-select",
        "buttonlist": "iview-fc-buttonlist",
        "number-range":"iview-fc-number-range",
        "number":"iview-fc-number",
        "uploadfile":"iview-fc-uploadfile",
    });
    window["tg-turing"].iview.Adapter = Adapter;
    function dictfilter(result){
        return result.data.datas.code.rows;
    }
    window["tg-turing"].DataFilter.dictFilter[0] = dictfilter;
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign({}, {
    Adapter,install, init,
    ...components,
});