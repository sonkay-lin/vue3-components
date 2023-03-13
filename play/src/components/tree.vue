<template>
  <l-tree
    ref="treeRef"
    v-model:selected-key="value"
    show-checkbox
    :data="data"
    :on-load="handLoad"
    :defaultCheckedKeys="['40', '41']"
  >
    <template #default="{ node }">
      <span @click="select">{{ node.key }} - {{ node.label }}</span>
    </template>
  </l-tree>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import Tree, { Key, TreeOption } from '@lsk-ui/components/tree'
const data = ref(creatData())
// const data = ref([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true,
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             key: '0-1-0',
//             label: '0-1-0'
//           },
//           {
//             key: '0-1-1',
//             label: '0-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])
// function creatData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }
const value = ref<Key[]>([])
const treeRef = ref<InstanceType<typeof Tree>>()

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
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  return ''
}
function handLoad(node: TreeOption) {
  console.log('handLoad')
  return new Promise<TreeOption[]>(resovle => {
    setTimeout(() => {
      resovle([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false,
          disabled: true
        }
      ])
    }, 10000)
  })
}
const loading = ref(false)

async function select() {
  setTimeout(() => {
    console.log(treeRef.value?.getSelectedKeys())
    console.log(treeRef.value?.getExpandeKeys())
    console.log(treeRef.value?.getCheckedKeys())
  })
}
onMounted(() => {
  nextTick(() => {
    const node = treeRef.value?.getTreeNode('40')
  })
  setTimeout(() => {
    loading.value = true
  }, 2000)
})
</script>
