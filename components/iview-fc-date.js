import {FormConnectItem} from 'tg-turing'

export default {
    name:"iview-fc-date",
    extends: FormConnectItem,
    template:`<div>
        <FormItem :label="caption">
            <DatePicker v-model="currentValue" type="date" :placeholder="placeholder" style="width:100%"></DatePicker>
        </FormItem>
    </div>`,
}