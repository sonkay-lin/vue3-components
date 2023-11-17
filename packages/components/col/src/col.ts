import { ExtractPropTypes } from 'vue'

export const colProps = {
  //栅格占据的列数
  span: {
    type: Number,
    default: 24
  },
  //栅格左侧的间隔格数
  offset: {
    type: Number,
    default: 0
  },
  //自定义元素标签
  tag: {
    type: String,
    default: 'div'
  },
  xs: Number,
  sm: Number,
  md: Number,
  lg: Number,
  xl: Number
} as const

export type ColProps = ExtractPropTypes<typeof colProps>
