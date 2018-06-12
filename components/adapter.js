import {utils, DataFilter} from 'tg-turing';
export function Adapter(type, model, params){
    let iviewModel = [];
    switch (type) {
        case "table":
            for(let prop in model){
                if (model[prop].hidden === true){
                    continue;
                }
                let newTableItem = utils.extend({}, {
                    title:model[prop].caption, 
                    key:prop, 
                    minWidth:120
                }, model[prop], params);
                if (newTableItem.dict !== undefined && newTableItem.dict.display !== undefined) {
                    newTableItem["key"] = newTableItem.dict.display;
                }
                if (newTableItem.filters !== undefined){
                    newTableItem.filterRemote = function(value,key,column) {
                        column.selectedFilterValue = value;
                    }
                }
                iviewModel.push(newTableItem);
            }
            break;
        case "form":
            for(let prop in model){
                if (prop.startsWith("group:[")) {
                    let groupItem = model[prop];
                    let newFormGroup = {
                        name: prop, items:[], title: groupItem.title, desc:groupItem.desc
                    };
                    for(let item in groupItem.items){
                        let newFormItem = adapterNewFormItem(item, groupItem.items[item], params);
                        newFormGroup.items.push(newFormItem);
                    }
                    iviewModel.push(newFormGroup);
                } else {
                    let newFormItem = adapterNewFormItem(prop, model[prop], params);
                    iviewModel.push(newFormItem);
                }
            }
            break;
        case "tree":
            let datas = model;
            let root = params.root;
            model.map(item => {
                item.title = item[params.label]
            })
            delete params.label;
            delete params.root;
            iviewModel = utils.toTreeData(datas, root, utils.extend({toCKey:'children'}, params))
            break;
        case "dict":
            
            break;
        default:
            break;
    }
    
    return iviewModel;
}

function adapterNewFormItem(key, itemModel, params){
    let newFormItem = utils.extend({}, {
        name: key, 
        xtype: "text"
    }, itemModel, params);
    if (itemModel.xtype !== undefined && itemModel.options === undefined){
        itemModel.options = [];
    }
    return newFormItem;
}

export function getDictData(dict, callback) {
    utils.Get(dict.url).then(result => {
        callback(DataFilter.dictFilter(result).map(item => {
            return {
                label: item[dict.label],
                value: item[dict.value]
            }
        }));
    })
}