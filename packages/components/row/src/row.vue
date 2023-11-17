<template>
  <component :class="classes" :style="style" :is="tag">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { creatNamespace } from '@lsk-ui/utils/create'
import { computed, provide } from 'vue'
import { rowProps, rowContextKey } from './row'

defineOptions({
  name: 'l-row'
})
const bem = creatNamespace('row')
const props = defineProps(rowProps)
const classes = computed(() => {
  return [
    bem.b(),
    bem.is(`justify-${props.justify}`, props.justify !== 'start'),
    bem.is(`align-${props.align}`, props.align !== 'top')
  ]
})
const style = computed(() => {
  const styles = {
    marginLeft: '',
    marginRight: ''
  }
  if (!props.gutter) {
    return {}
  }
  styles.marginLeft = styles.marginRight = `-${props.gutter / 2}px`
  return styles
})
const gutter = computed(() => props.gutter)
provide(rowContextKey, { gutter })
</script>
