import turing from 'tg-turing';
export function Adapter(type, model, params){
    let iviewModel = [];
    switch (type) {
        case "table":
            for(let prop in model){
                if (model[prop].hidden === true){
                    continue;
                }
                let newTableItem = turing.utils.extend({}, {
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
            iviewModel = turing.utils.toTreeData(datas, root, turing.utils.extend({toCKey:'children'}, params))
            break;
        case "dict":
            
            break;
        default:
            break;
    }
    
    return iviewModel;
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

export function getDictData(dict, callback) {
    turing.utils.Get(dict.url).then(result => {
        let datas;
        try{
            datas = turing.DataFilter.dictFilter[0](result).map(item => {
                return {
                    label: item[dict.label],
                    value: item[dict.value]
                }
            })
            callback(datas);
        } catch (e) {
            console.error(e, result, turing.DataFilter.dictFilter[0], datas);
        }
    })
}