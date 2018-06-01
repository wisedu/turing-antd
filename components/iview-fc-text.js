import {FormConnectItem} from 'tg-turing'

export default {
    name:"iview-fc-text",
    extends: FormConnectItem,
    template:`<div>
        <FormItem :label="caption">
            <Input v-model="currentValue" :placeholder="placeholder">
                <span slot="append" v-if="params.append">{{params.append}}</span>
            </Input>
        </FormItem>
    </div>`,
}