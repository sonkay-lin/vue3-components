<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { creatNamespace } from '@lsk-ui/utils/create'
import { iconProps } from './icon'
defineOptions({
  name: 'l-icon'
})
const bem = creatNamespace('icon')
const props = defineProps(iconProps)
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>
