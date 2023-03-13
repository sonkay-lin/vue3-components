import { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>
} as const 
//ExtractPropTypes解决definedProps无法引入外部Typescript类型定义
export type IconProps = ExtractPropTypes<typeof iconProps>