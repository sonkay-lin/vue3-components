import { ExtractPropTypes, PropType } from 'vue'

export type CheckboxValueType = boolean | string | number

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<CheckboxValueType>
  },
  disabled: Boolean,
  indeterminate: Boolean,
  label: {
    type: String as PropType<string>
  }
} as const

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>

export const checkboxEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean'
}

export type CheckboxEmits = typeof checkboxEmits
