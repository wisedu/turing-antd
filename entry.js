import {Adapter} from './components/Adapter';
import AntdFcGroup from './components/antd-fc-group';
import AntdFcForm from './components/antd-fc-form';
import AntdFcStatic from './components/antd-fc-static';
import AntdFcText from './components/antd-fc-text';
import AntdFcTextArea from './components/antd-fc-textarea';
import AntdFcDate from './components/antd-fc-date';
import AntdFcDateRange from './components/antd-fc-date-range';
import AntdFcButtonlist from './components/antd-fc-buttonlist';
import AntdFcNumberRange from './components/antd-fc-number-range';
import AntdFcNumber from './components/antd-fc-number';
import AntdFcSelect from './components/antd-fc-select';
import AntdFcTree from './components/antd-fc-tree';
import AntdFcUploadfile from './components/antd-fc-uploadfile';
import AntdFcAutocomplete from './components/antd-fc-autocomplete';
import AntdFcRadiolist from './components/antd-fc-radiolist';
import AntdFcSwitcher from './components/antd-fc-switcher';
import AntdGcGrid from './components/antd-gc-grid';
import Form from './components/form.js';
import { defaults } from "tg-turing";

const components = {
    AntdFcGroup,AntdFcForm,AntdFcStatic,AntdFcText,AntdFcTextArea,AntdFcDate,AntdFcDateRange,AntdFcButtonlist,AntdFcNumberRange,AntdFcNumber,AntdFcSelect,AntdFcUploadfile,AntdFcTree,AntdFcAutocomplete,AntdFcRadiolist,AntdFcSwitcher,AntdGcGrid
};
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils") return;
        // Vue.customElement(components[key].name, components[key]);
        Vue.component(components[key].name, components[key]);
    });
};

defaults.antd = {
    Adapter: Adapter,
    form: Form
};
defaults.currentType = "antd";

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    Adapter,install,
    ...components,
};