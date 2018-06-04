import adapter from './components/adapter';
import IviewFcText from './components/iview-fc-text';
import IviewFcDate from './components/iview-fc-date';

const components = {
    adapter,IviewFcText,IviewFcDate
};
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils") return;
        // Vue.customElement(components[key].name, components[key]);
        Vue.component(components[key].name, components[key]);
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign({}, {
    install, 
    ...components,
});