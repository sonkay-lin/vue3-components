import { ComputedRef, ExtractPropTypes, InjectionKey, PropType } from 'vue'

export type RowJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type RowAlign = 'top' | 'middle' | 'bottom'

export const rowProps = {
  //栅格间隔
  gutter: {
    type: Number,
    default: 0
  },
  //flex 布局下的水平排列方式
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start'
  },
  //flex 布局下的垂直排列方式
  align: {
    type: String as PropType<RowAlign>,
    default: 'top'
  },
  //自定义元素标签
  tag: {
    type: String,
    default: 'div'
  }
} as const

export interface RowContext {
  gutter: ComputedRef<number>
}
export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContext')
export type RowProps = ExtractPropTypes<typeof rowProps>
