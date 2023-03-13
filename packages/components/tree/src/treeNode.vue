<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node.level * 16}px` }"
      @click="handelExpand"
    >
      <span
        :class="[
          { expanded: expanded && !node.isLeaf },
          bem.e('expand-icon'),
          bem.is('leaf', node.isLeaf),
          bem.is('disabled', node.disabled)
        ]"
      >
        <l-icon size="18" v-if="isLoading">
          <Loading></Loading>
        </l-icon>
        <l-icon size="24" v-else>
          <Swither></Swither>
        </l-icon>
      </span>
      <l-checkbox
        v-if="showCheckbox"
        :model-value="checked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        @click.stop
        @change="handleCheckChange"
      ></l-checkbox>
      <span :class="[bem.e('label')]">
        <TreeNodeContent :node="node"></TreeNodeContent>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swither from '@lsk-ui/components/internal-icon/Swither'
import Loading from '@lsk-ui/components/internal-icon/Loading'
import LIcon from '@lsk-ui/components/icon'
import TreeNodeContent from './tree-node-content'
import { creatNamespace } from '@lsk-ui/utils/create'
import { treeNodeEmits, treeNodeProps } from './tree'
import { computed } from 'vue'
import LCheckbox from '@lsk-ui/components/checkbox'

const bem = creatNamespace('tree-node')
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)
//展开子节点
function handelExpand() {
  if (props.node.disabled) return
  emit('toggle', props.node)
  emit('select', props.node)
}
//checkbox状态改变
function handleCheckChange(value: boolean) {
  emit('check', props.node, value)
}

const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node.key) && props.lazy
})
const isSelected = computed(() => {
  if (props.node.disabled) return false
  return props.selectedKey.includes(props.node.key)
})

// const
</script>
