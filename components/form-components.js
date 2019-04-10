
import Select from './search_item_select.vue';
import Cascader from './search_item_cascader.vue';
import Datepicker from './search_item_datepicker.vue';
export default {
    'text': 'Input', 					//文本，
    'switcher': 'iSwitch',			//开关
    'textarea': 'Input', 				//文本域
    'number': 'Input', 				//数字
    'select': Select,				//下拉(带搜索功能)
    // 'multi-select': Select,			//多选下拉(有复选框)(带搜索功能)
    // 'multi-select2': Select,			//多选下拉(旧)(带搜索功能)
    // 'time': 'DatePicker',         //时间
    'date-local': Datepicker,	//日期
    'date-ym': Datepicker,
    'date-full': Datepicker,		//日期及时间
    'date-range': Datepicker,
    // 'radiolist': Selectlist,			//单选组
    // 'checkboxlist': Selectlist,        //多选组
    // 'uploadsingleimage': UploadImage,        //单图片上传
    // 'uploadmuiltimage': UploadImage,        //多图片上传
    // 'selecttable': Selecttable,        //下拉表格
    // 'uploadfile': AttachmentList,        //上传文件（只读）
    // 'buttonlist': Buttonlist,        //按钮组
    // 'multi-buttonlist': Buttonlist,        //多选按钮组
    // 'multi-tree': Tree,        //多选下拉树
    'tree': Cascader        //下拉树
};