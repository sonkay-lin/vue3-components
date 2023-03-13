<template>
  <label :class="[bem.b()]">
    <span :class="bem.e('input')">
      <input
        ref="inputRef"
        type="checkbox"
        v-model="model"
        :indeterminate="indeterminate"
        :disabled="disabled"
        :value="label"
        @change="handelChange"
      />
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { creatNamespace } from '@lsk-ui/utils/create'
import { computed, ref } from 'vue'
import { checkboxEmits, checkboxProps } from './checkbox'
const inputRef = ref<HTMLInputElement>()
const bem = creatNamespace('checkbox')
const props = defineProps(checkboxProps)
const emits = defineEmits(checkboxEmits)
defineOptions({
  name: 'l-checkbox'
})
const model = computed<boolean>({
  get() {
    return props.modelValue as boolean
  },
  set(newVal: boolean) {
    emits('update:modelValue', newVal)
  }
})

function handelChange(e: Event) {
  const target = e.target as HTMLInputElement
  const { checked } = target
  emits('change', checked)
}
</script>
