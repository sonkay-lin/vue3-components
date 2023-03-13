import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { Arrayable, FormItemContext, FormItemRule } from './form-item'

export const formProps = {
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right'
  },
  model: Object,
  rules: Object as PropType<Record<string, Arrayable<FormItemRule>>>,
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
