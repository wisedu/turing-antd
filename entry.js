import {Adapter} from './components/adapter';
import AntdFcGroup from './components/antd-fc-group.vue';
import AntdFcForm from './components/antd-fc-form.vue';
import AntdFcStatic from './components/antd-fc-static.vue';
import AntdFcText from './components/antd-fc-text.vue';
import AntdFcTextArea from './components/antd-fc-textarea.vue';
import AntdFcDate from './components/antd-fc-date.vue';
import AntdFcDateRange from './components/antd-fc-date-range.vue';
import AntdFcButtonlist from './components/antd-fc-buttonlist.vue';
import AntdFcNumberRange from './components/antd-fc-number-range.vue';
import AntdFcNumber from './components/antd-fc-number.vue';
import AntdFcSelect from './components/antd-fc-select.vue';
import AntdFcTree from './components/antd-fc-tree.vue';
import AntdFcUploadfile from './components/antd-fc-uploadfile.vue';
import AntdFcUploadfileSync from './components/antd-fc-uploadfile-sync.vue';
import AntdFcAutocomplete from './components/antd-fc-autocomplete.vue';
import AntdFcRadiolist from './components/antd-fc-radiolist.vue';
import AntdFcCheckboxlist from './components/antd-fc-checkboxlist.vue';
import AntdFcSwitcher from './components/antd-fc-switcher.vue';
import AntdFcEditor from './components/antd-fc-editor.vue';
import AntdGbGrid from './components/antd-gb-grid.vue';
import AntdGbCollection from './components/antd-gb-collection.vue';
import AntdGbSearch from './components/antd-gb-search.vue';
import AntdPeLeft from './components/antd-pe-left.vue';
import AntdPeCenter from './components/antd-pe-center.vue';
import AntdPeRight from './components/antd-pe-right.vue';
import LayoutTmb from './layout/layout-tmb.vue';
import { defaults } from "tg-turing";
import comDefs from "./Defaults";

import alignCenter from "./src/icons/align-center.svg";
import alignLeft from "./src/icons/align-left.svg";
import alignRight from "./src/icons/align-right.svg";
import bold from "./src/icons/bold.svg";
import checklist from "./src/icons/checklist.svg";
import code from "./src/icons/code.svg";
import github from "./src/icons/github.svg";
import image from "./src/icons/image.svg";
import italic from "./src/icons/italic.svg";
import link from "./src/icons/link.svg";
import ol from "./src/icons/ol.svg";
import paragraph from "./src/icons/paragraph.svg";
import quote from "./src/icons/quote.svg";
import remove from "./src/icons/remove.svg";
import strike from "./src/icons/strike.svg";
import ul from "./src/icons/ul.svg";
import underline from "./src/icons/underline.svg";

const components = {
    AntdFcGroup,AntdFcForm,AntdFcStatic,AntdFcText,AntdFcTextArea,AntdFcDate,AntdFcDateRange,AntdFcButtonlist,AntdFcNumberRange,AntdFcNumber,AntdFcSelect,AntdFcUploadfile,AntdFcTree,AntdFcAutocomplete,AntdFcRadiolist,AntdFcSwitcher,AntdFcEditor,AntdGbGrid,AntdGbSearch,AntdFcCheckboxlist,AntdFcUploadfileSync,AntdGbCollection,AntdPeLeft,AntdPeCenter,AntdPeRight,
    LayoutTmb
};
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils") return;
        // Vue.customElement(components[key].name, components[key]);
        Vue.component(components[key].name, components[key]);
    });
};


if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }
            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),
                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),
                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),
                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}

defaults.antd = {
    Adapter: Adapter,
    form: comDefs.form,
    table: comDefs.table
};
defaults.currentType = "antd";
defaults.test = function(){
    console.log(2);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    Adapter,install,
    ...components,
};