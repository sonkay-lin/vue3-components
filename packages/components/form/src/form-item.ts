import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { RuleItem, Values } from 'async-validator'

export type Arrayable<T> = T | T[]
//继承async-validator校验类型并添加触发条件
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
export const formItemProps = {
  prop: String,
  label: String,
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true
  },
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  }
} as const

export const formItemEmits = {}

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>

//表单校验状态
export const formItemValidateState = [
  'success',
  'error',
  'validating',
  ''
] as const
export type FormItemValidateState = typeof formItemValidateState[number]

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isVail: boolean, fields?: Values) => void
  ) => Promise<void>
}

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
