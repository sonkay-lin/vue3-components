---
title: Tree
---
# Tree 树组件

## 基础用法
<l-tree :data="data"></l-tree>
## 异步加载
- 异步加载节点需要添加 lazy 和 onLoad 属性
<l-tree :data="data" lazy :on-load="handLoad"></l-tree>

```vue
<template>
<l-tree :data="data" :on-load="handLoad"></l-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Key, TreeOption } from '@lsk-ui/components/tree'
const data = [
  {
    label: 'Level one 1',
    key: '1',
    children: [
      {
        label: 'Level two 1-1',
        key: '1-1',
        isLeaf: false,
        children: []
      }
    ]
  },
  {
    label: 'Level one 2',
    key: '2',
    children: [
      {
        label: 'Level two 2-1',
        key: '2-1',
        children: [
          {
            key: '2-1-1',
            label: 'Level three 2-1-1',
            isLeaf: false,
            children: []
          }
        ]
      },
      {
        label: 'Level two 2-2',
        key: '2-2',
        children: [
          {
            key: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    key: '3',
    isLeaf: false
  }
]
const handLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>(resovle => {
    setTimeout(() => {
      const key = node.key + '-1'
      resovle([
        {
          label: 'label' + key,
          key: key,
          isLeaf: true
        }
      ])
    }, 2000)
  })
}
</script>
```

## 带选择框树组件
<l-tree v-model:selected-key="value" :data="data" show-checkbox selectable></l-tree>

```vue
<template>
  <l-tree 
    v-model:selected-key="value" 
    :data="data" 
    show-checkbox selectable
  ></l-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Key, TreeOption } from '@lsk-ui/components/tree'
const value = ref([])
const data = [] //和上面数据一致
</script>
```

## 大量数据渲染 虚拟列表

<l-tree
  v-model:selected-key="value"
  show-checkbox
  :data="bigData"
  :defaultCheckedKeys="['40', '41']"
>
  <template #default="{ node }"> {{ node.key }} - {{ node.label }} </template>
</l-tree>

```vue
<template>
  <l-tree
    v-model:selected-key="value"
    show-checkbox
    :data="bigData"
    :on-load="handLoad"
    :defaultCheckedKeys="['40', '41']"
  >
    <template #default="{ node }"> {{ node.key }} - {{ node.label }} </template>
  </l-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Tree, { Key, TreeOption } from '@lsk-ui/components/tree'
const bigData = ref(creatData())
const value = ref([])
function creatData(level = 4, parentKey = ''): TreeOption[] {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, index: number) => {
    const key = parentKey + level + index
    return {
      isLeaf: level === 1,
      label: creatLabel(level),
      key,
      children: creatData(level - 1, key)
    }
  })
}
function creatLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
</script>
```

## tree props
| 属性      | 说明  | 类型  | 默认值   |
|:----------------:|:-------:|:-------:|:-------:|
| data | 树组件展示的数据 | TreeOption[] | [] |
| labelField | data中显示label的字段 | string | label |
| keyField | data中设置key属性的字段 | string | key |
| childrenField | data中设置子节点的字段 | string | children |
| defaultExpandeKeys | 默认展开的节点的key | Key[] | [] |
| defaultCheckedKeys | 默认checkbox选中的节点key | Key[] | [] |
| selectable | 是否可选，需要绑定v-model:selected-key | boolean | true
| selectedKey | 选中的key值	 | Key[] | [] | 
| multiple | 是否多选，需要绑定v-model:selected-key | boolean | false
| lazy | 是否懒加载节点 | boolean | false |
| onLoad | 异步加载节点，需要lazy为true | (node: TreeOption) `=>` Promise<TreeOption[]> | fn |

## 方法
| 方法      | 描述  | 参数  |
|:----------------:|:-------:|:-------:|
| getTreeNode | 根据节点key值，返回对应的节点 | (nodeKey: Key) |
| getSelectedKeys | 返回选中的节点 | - |
| getExpandeKeys | 返回展开的节点 | - |
| getCheckedKeys | 返回checkbox选中的节点 | - |


## slots
| 插槽名      | 说明  | 
|:----------------:|:-------:|
| - | 自定义树节点的内容， 自定义树节点的内容， 参数为  { node } | 

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import Tree, { Key, TreeOption } from '@lsk-ui/components/tree'
const bigData = ref(creatData())
const value = ref([])
const data = [
  {
    label: 'Level one 1',
    key: '1',
    children: [
      {
        label: 'Level two 1-1',
        key: '1-1',
        isLeaf: false,
        children: []
      }
    ]
  },
  {
    label: 'Level one 2',
    key: '2',
    children: [
      {
        label: 'Level two 2-1',
        key: '2-1',
        children: [
          {
            key: '2-1-1',
            label: 'Level three 2-1-1',
            isLeaf: false,
            children: []
          }
        ]
      },
      {
        label: 'Level two 2-2',
        key: '2-2',
        children: [
          {
            key: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    key: '3',
    isLeaf: false
  }
]
const handLoad = (node) => {
  return new Promise<TreeOption[]>(resovle => {
    setTimeout(() => {
      const key = node.key + '-1'
      resovle([
        {
          label: 'label' + key,
          key: key,
          isLeaf: true
        }
      ])
    }, 2000)
  })
}
function creatData(level = 4, parentKey = ''): TreeOption[] {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, index: number) => {
    const key = parentKey + level + index
    return {
      isLeaf: level === 1,
      label: creatLabel(level),
      key,
      children: creatData(level - 1, key)
    }
  })
}
function creatLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
</script>