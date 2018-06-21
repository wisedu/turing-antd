import {Adapter} from './components/Adapter';
import AntdFcGroup from './components/antd-fc-group';
import AntdFcForm from './components/antd-fc-form';
import AntdFcStatic from './components/antd-fc-static';
import AntdFcText from './components/antd-fc-text';
import AntdFcTextArea from './components/antd-fc-textarea';
import AntdFcDate from './components/antd-fc-date';
import AntdFcButtonlist from './components/antd-fc-buttonlist';
import AntdFcNumberRange from './components/antd-fc-number-range';
import AntdFcNumber from './components/antd-fc-number';
import AntdFcSelect from './components/antd-fc-select';
import AntdFcUploadfile from './components/antd-fc-uploadfile';
import Form from './components/form.js';

const components = {
    AntdFcGroup,AntdFcForm,AntdFcStatic,AntdFcText,AntdFcTextArea,AntdFcDate,AntdFcButtonlist,AntdFcNumberRange,AntdFcNumber,AntdFcSelect,AntdFcUploadfile
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
    window["tg-turing"].antd = {
        Adapter: Adapter,
        form: Form
    };
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign({}, {
    Adapter,install, init,
    ...components,
});