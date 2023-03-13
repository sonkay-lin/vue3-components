import { PropType, ExtractPropTypes, SetupContext, InjectionKey } from 'vue'

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean
  parentKey: Key | undefined
}

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  disabled?: boolean
  [key: Key]: unknown
}

export const treeProps = {
  //展示的数据
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  //显示label的字段
  labelField: {
    type: String,
    default: 'label'
  },
  //设置key属性的字段
  keyField: {
    type: String,
    default: 'key'
  },
  //设置子节点的字段
  childrenField: {
    type: String,
    default: 'children'
  },
  //默认展开的节点的key
  defaultExpandeKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  //选中的key值
  selectedKey: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  //是否可选
  selectable: {
    type: Boolean,
    default: true
  },
  //是否多选
  multiple: {
    type: Boolean,
    default: false
  },
  //是否展示checkbox
  showCheckbox: {
    type: Boolean,
    default: false
  },
  //默认checkbox选中的节点key
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  lazy: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  //是否可展开
  expanded: {
    type: Boolean,
    required: true
  },
  //懒加载正在加载的节点的key
  loadingKeys: {
    type: Object as PropType<Set<Key>>
  },
  //选中节点的key
  selectedKey: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  //是否显示checkbox
  showCheckbox: Boolean,
  //是否禁用
  disabled: Boolean,
  //是否半选
  indeterminate: Boolean,
  //是否选中
  checked: Boolean,
  lazy: Boolean
} as const

export const treeEmits = {
  'update:selectedKey': (keys: Key[]) => keys
}

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode, value: boolean) => typeof value === 'boolean'
}

export interface TreeContent {
  slots: SetupContext['slots']
}

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
export type TreeEmits = typeof treeEmits
export const TreeInjectKey: InjectionKey<TreeContent> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
}
