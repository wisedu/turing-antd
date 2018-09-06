export default {
    "static": {
        name: "antd-fc-static"
    },
    "text": {
        name: "antd-fc-text",
        required: {
            trigger: "blur,change",
            message: "不能为空"
        }
    },
    "textarea": {
        name: "antd-fc-textarea",
        required: {
            trigger: "blur,change",
            message: "不能为空"
        }
    },
    "date": {
        name: "antd-fc-date",
        required: {
            trigger: "blur,change",
            message: "不能为空"
        }
    },
    "date-range": {
        name: "antd-fc-date-range",
        required: {
            trigger: "blur,change",
            type: "array",
            message: "不能为空"
        }
    },
    "date-local": {
        name: "antd-fc-date",
        required: {
            trigger: "blur,change",
            message: "不能为空"
        }
    },
    "date-full": {
        name: "antd-fc-date",
        required: {
            trigger: "blur,change",
            message: "不能为空"
        }
    },
    "select": {
        name: "antd-fc-select",
        default: {
            async: false
        },
        required: {
            trigger: "change",
            message: "请选择一项"
        }
    },
    "multi-select": {
        name: "antd-fc-select",
        default: {
            multiple: true
        },
        required: {
            trigger: "change",
            type: 'array',
            min: 1,
            message: "请选择一项"
        }
    },
    "buttonlist": {
        name: "antd-fc-buttonlist"
    },
    "number-range": {
        name: "antd-fc-number-range"
    },
    "number": {
        name: "antd-fc-number",
        required: {
            trigger: "blur,change",
            type: "number",
            message: "请填写数字"
        }
    },
    "uploadfile": {
        name: "antd-fc-uploadfile"
    },
    "tree": {
        name: "antd-fc-tree",
        required: {
            trigger: "change",
            message: "请选择一项"
        }
    },
    "autocomplete": {
        name: "antd-fc-autocomplete"
    },
    "selecttable": {
        name: "antd-fc-autocomplete"
    },
    "radiolist": {
        name: "antd-fc-radiolist",
        required: {
            trigger: "change",
            message: "请选择一项"
        }
    },
    "checkboxlist": {
        name: "antd-fc-checkboxlist",
        required: {
            trigger: "change",
            type: 'array',
            min: 1,
            message: "请选择一项"
        }
    },
    "switcher": {
        name: "antd-fc-switcher"
    }
}