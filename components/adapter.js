import turing from 'tg-turing';
import defaults from '../Defaults';
export function Adapter(type, model, params){
    let antdModel = [];
    switch (type) {
        case "table":
            for(let prop in model){
                if (model[prop].hidden === true){
                    continue;
                }
                let newTableItem = turing.utils.extend({}, {
                    title:model[prop].caption, 
                    key:prop,
                    className: "antd-gb-grid__header--center"
                }, defaults.table, model[prop], params);
                if (newTableItem.dict !== undefined && newTableItem.dict.display !== undefined) {
                    newTableItem["key"] = newTableItem.dict.display;
                }
                if (newTableItem.filters !== undefined){
                    newTableItem.filterRemote = function(value,key,column) {
                        column.selectedFilterValue = value;
                    }
                }
                antdModel.push(newTableItem);
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
                    antdModel.push(newFormGroup);
                } else {
                    let newFormItem = adapterNewFormItem(prop, model[prop], params);
                    antdModel.push(newFormItem);
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
            antdModel = turing.utils.toTreeData(datas, root, turing.utils.extend({toCKey:'children'}, params))
            break;
        case "dict":
            
            break;
        default:
            break;
    }
    
    return antdModel;
}

function adapterNewFormItem(key, itemModel, params){
    let newFormItem = turing.utils.extend({}, {
        name: key, 
        xtype: "text"
    }, itemModel, params);
    if (itemModel.xtype !== undefined && itemModel.options === undefined){
        itemModel.options = [];
    }
    return newFormItem;
}
