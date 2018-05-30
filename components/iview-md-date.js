import {ModelDrivenFormItem} from 'tg-turing'

export default {
    name:"iview-md-date",
    extends: ModelDrivenFormItem,
    template:`<div>
        <FormItem :label="caption">
            <DatePicker v-model="currentValue" type="date" :placeholder="placeholder" style="width:100%"></DatePicker>
        </FormItem>
    </div>`,
}