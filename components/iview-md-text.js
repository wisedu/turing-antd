import {ModelDrivenFormItem} from 'tg-turing'

export default {
    name:"iview-md-text",
    extends: ModelDrivenFormItem,
    template:`<div>
        <FormItem :label="caption">
            <Input v-model="currentValue" :placeholder="placeholder">
                <span slot="append" v-if="params.append">{{params.append}}</span>
            </Input>
        </FormItem>
    </div>`,
}