<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled)
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="clickEmit"
    @mousedown="mousedownEmit"
  >
    <template v-if="iconPlacement === 'left' && (loading || slot.icon)">
      <LIcon>
        <Loading v-if="loading"></Loading>
        <template v-else-if="slot.icon">
          <component :is="slot.icon"></component>
        </template>
      </LIcon>
    </template>
    <span>
      <slot></slot>
    </span>
    <template v-if="iconPlacement === 'right'">
      <LIcon>
        <Loading v-if="loading"></Loading>
        <template v-else-if="slot.icon">
          <component :is="slot.icon"></component>
        </template>
      </LIcon>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { creatNamespace } from '@lsk-ui/utils/create'
import { buttonEmits, buttonProps } from './button'
import Loading from '@lsk-ui/components/internal-icon/Loading'
import LIcon from '@lsk-ui/components/icon'
import { useSlots } from 'vue'
defineOptions({
  name: 'l-button',
  inheritAttrs: false
})
const bem = creatNamespace('button')
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slot = useSlots()

function clickEmit(e: MouseEvent) {
  emit('click', e)
}
function mousedownEmit(e: MouseEvent) {
  emit('mousedown', e)
}
</script>
