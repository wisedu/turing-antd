export default {
    table: {
        minWidth:120,
        ellipsis: true,
        tooltip: true,
    },
    form: {
        "static": {
            name: "antd-fc-static"
        },
        "text": {
            name: "antd-fc-text",
            required: {
                trigger: "blur",
                message: "不能为空"
            }
        },
        "textarea": {
            name: "antd-fc-textarea",
            required: {
                trigger: "blur",
                message: "不能为空"
            }
        },
        "editor": {
            name: "antd-fc-editor",
            required: {
                trigger: "blur",
                message: "不能为空"
            }
        },
        "date": {
            name: "antd-fc-date",
            required: {
                trigger: "blur",
                message: "不能为空"
            }
        },
        "date-range": {
            name: "antd-fc-date-range",
            required: {
                trigger: "blur",
                type: "array",
                message: "不能为空"
            }
        },
        "date-local": {
            name: "antd-fc-date",
            required: {
                type:"date",
                trigger: "blur",
                message: "不能为空"
            }
        },
        "date-ym": {
            name: "antd-fc-date",
            default: {
                type:"month",
                format:"yyyy-MM"
            },
            required: {
                trigger: "blur",
                message: "不能为空"
            }
        },
        "date-full": {
            name: "antd-fc-date",
            default: {
                type:"datetime",
                format:"yyyy-MM-dd HH:mm",
            },
            required: {
                trigger: "blur",
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
            name: "antd-fc-uploadfile",
            required: {
                trigger: "change",
                message: "请上传一项"
            }
        },
        "uploadfile-sync": {
            name: "antd-fc-uploadfile-sync"
        },
        "tree": {
            name: "antd-fc-tree",
            required: {
                trigger: "change",
                message: "请选择一项"
            }
        },
        "multi-tree": {
            name: "antd-fc-tree",
            required: {
                trigger: "change",
                message: "请选择一项"
            }
        },
        "multi-tree2": {
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
}