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
import AntdFcAutocomplete from './components/antd-fc-autocomplete.vue';
import AntdFcRadiolist from './components/antd-fc-radiolist.vue';
import AntdFcCheckboxlist from './components/antd-fc-checkboxlist.vue';
import AntdFcSwitcher from './components/antd-fc-switcher.vue';
import AntdGbGrid from './components/antd-gb-grid.vue';
import AntdGbSearch from './components/antd-gb-search.vue';
import LayoutTmb from './layout/layout-tmb.vue';
import Form from './components/form.js';
import { defaults } from "tg-turing";

const components = {
    AntdFcGroup,AntdFcForm,AntdFcStatic,AntdFcText,AntdFcTextArea,AntdFcDate,AntdFcDateRange,AntdFcButtonlist,AntdFcNumberRange,AntdFcNumber,AntdFcSelect,AntdFcUploadfile,AntdFcTree,AntdFcAutocomplete,AntdFcRadiolist,AntdFcSwitcher,AntdGbGrid,AntdGbSearch,AntdFcCheckboxlist,
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