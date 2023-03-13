import { ExtractPropTypes, PropType } from 'vue'
// eslint-disable-next-line vue/prefer-import-from-vue
import { isString } from '@vue/shared'

export const inputProps = {
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  //输入框类型
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  showPassword: Boolean
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmit = {
  'update:modelValue': (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  clear: () => true
}
export type InputEmit = typeof inputEmit
