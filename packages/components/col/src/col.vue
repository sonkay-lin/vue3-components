<template>
  <component :class="classes" :style="style" :is="tag">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { creatNamespace } from '@lsk-ui/utils/create'
import { computed, inject } from 'vue'
import { rowContextKey } from '@lsk-ui/components/row'
import { colProps } from './col'

defineOptions({
  name: 'l-col'
})
const bem = creatNamespace('col')
const props = defineProps(colProps)
const classes = computed(() => {
  const ret: string[] = []
  const pos = ['span', 'offset'] as const
  ret.push(bem.b())
  pos.forEach(item => {
    const size = props[item]
    if (typeof size === 'number' && size > 0) {
      ret.push(`l-col-${item}-${props[item]}`)
    }
  })

  const size = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  size.forEach(item => {
    if (typeof props[item] === 'number') {
      ret.push(`l-col-${item}-${props[item]}`)
    }
  })

  return ret
})
const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })
const style = computed(() => {
  const styles = {
    paddingLeft: '',
    paddingRight: ''
  }
  if (!gutter.value) {
    return {}
  }
  styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  return styles
})
</script>
