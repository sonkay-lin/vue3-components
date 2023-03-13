<template>
  <div :class="bem.b()">
    <l-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node }">
        <l-tree-node
          :expanded="isExpanded(node)"
          :node="node"
          :key="node.key"
          :loading-keys="loadingKeysRef"
          :selected-key="selectedKeyRef"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isIndeterminate(node)"
          :lazy="lazy"
          @select="handelSelect"
          @toggle="toggleExpand"
          @check="toggleCheck"
        ></l-tree-node>
      </template>
    </l-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { creatNamespace } from '@lsk-ui/utils/create'
import { ref, computed, provide, useSlots, nextTick } from 'vue'
import { Key, TreeInjectKey, TreeNode, treeProps, treeEmits } from './tree'
import LVirtualList from '@lsk-ui/components/virtual-list'
import LTreeNode from './treeNode.vue'
import {
  useInitTree,
  useTreeCheck,
  useTreeToggleExpand,
  useTreeSelect
} from './model/useTree'
const bem = creatNamespace('tree')
defineOptions({
  name: 'l-tree'
})
const props = defineProps(treeProps)
const emits = defineEmits(treeEmits)
//存放初始化后的树结构
const tree = ref<TreeNode[]>([])
//根据key映射对应节点
const treeNodeMap = ref<Map<Key, TreeNode>>(new Map())

//树初始化逻辑, 懒加载
const { loadingKeysRef, triggerLoading } = useInitTree(props, tree, treeNodeMap)
//树组件切换展开收缩
const { expandeKeysSet, toggleExpand, isExpanded } = useTreeToggleExpand(
  props,
  loadingKeysRef,
  triggerLoading
)
//树组件checkbox操作逻辑
const { checkedKeysRefs, isChecked, isDisabled, isIndeterminate, toggleCheck } =
  useTreeCheck(props, treeNodeMap)
//树组件选择操作
const { selectedKeyRef, handelSelect } = useTreeSelect(props, emits)

//获取树展开后扁平化的数据  虚拟列表需要获取当前树节点展开的高度，所以搜集展开的节点就行
const flattenTree = computed(() => {
  const expandeKeys = expandeKeysSet.value
  const flattenNodes: TreeNode[] = [] //扁平后的所有结果
  const nodes = tree.value || [] //被格式化后的节点
  const stack: TreeNode[] = [] //用于遍历树的栈
  //只需要展开节点的第一层 所以不需要递归
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    //如果当前节点为展开的节点,则将子节点全部添加到stack中继续遍历
    if (expandeKeys.has(node.key)) {
      const { children } = node
      if (!children) return
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return flattenNodes
})

//根据key返回节点
function getTreeNode(nodeKey: Key) {
  return treeNodeMap.value.get(nodeKey)
}
//返回选中的节点
function getSelectedKeys() {
  return Array.from(selectedKeyRef.value)
}
//返回展开的节点
function getExpandeKeys() {
  return Array.from(expandeKeysSet.value)
}
//返回checkbox选中的节点
function getCheckedKeys() {
  return Array.from(checkedKeysRefs.value)
}
provide(TreeInjectKey, {
  slots: useSlots()
})

defineExpose({
  getTreeNode,
  getSelectedKeys,
  getExpandeKeys,
  getCheckedKeys
})
</script>
