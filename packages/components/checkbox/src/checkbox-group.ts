import {
  ExtractPropTypes,
  InjectionKey,
  PropType,
  WritableComputedRef
} from 'vue'
import { componentSize } from '@lsk-ui/constants'
import { CheckboxValueType } from './checkbox'
import { isArray } from '@lsk-ui/utils/types'

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
  },
  disabled: Boolean,
  size: {
    type: String,
    value: componentSize
  },
  tag: {
    type: String,
    default: 'div'
  }
} as const

export const checkboxGroupEmits = {
  'update:modelValue': (value: CheckboxValueType[]) => isArray(value),
  change: (value: CheckboxValueType[]) => isArray(value)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits

type checkboxGroupContext = {
  modelValue: WritableComputedRef<CheckboxValueType[]>
  changeEvent: (...args: any) => any
}

export const checkboxGroupContextKey: InjectionKey<checkboxGroupContext> =
  Symbol('checkboxGroupContextKey')
