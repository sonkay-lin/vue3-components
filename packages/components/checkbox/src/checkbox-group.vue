<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, nextTick, provide } from 'vue'
import { CheckboxValueType } from './checkbox'
import {
  checkboxGroupContextKey,
  checkboxGroupEmits,
  checkboxGroupProps
} from './checkbox-group'

defineOptions({
  name: 'l-checkbox-group'
})
const props = defineProps(checkboxGroupProps)
const emits = defineEmits(checkboxGroupEmits)
const modelValue = computed<CheckboxValueType[]>({
  get() {
    return props.modelValue
  },
  set(newVal) {
    changeEvent(newVal)
  }
})

const changeEvent = async (value: CheckboxValueType[]) => {
  emits('update:modelValue', value)
  await nextTick()
  emits('change', value)
}
provide(checkboxGroupContextKey, {
  modelValue,
  changeEvent
})
</script>
