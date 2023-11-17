<template>
  <label :class="[bem.b(), bem.is('checked', isChecked)]">
    <span :class="bem.e('input')">
      <input
        ref="inputRef"
        type="checkbox"
        v-model="model"
        :indeterminate="indeterminate"
        :disabled="disabled"
        :value="label"
        :checked="isChecked"
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
import { isArray, isBoolean, isUndefined } from '@lsk-ui/utils/types'
import { inject, toRaw } from 'vue'
import { computed, ref } from 'vue'
import { checkboxEmits, checkboxProps, CheckboxValueType } from './checkbox'
import { checkboxGroupContextKey } from './checkbox-group'
const inputRef = ref<HTMLInputElement>()
const bem = creatNamespace('checkbox')
const props = defineProps(checkboxProps)
const emits = defineEmits(checkboxEmits)
defineOptions({
  name: 'l-checkbox'
})

function handelChange(e: Event) {
  const target = e.target as HTMLInputElement
  const { checked } = target
  emits('change', checked)
}

const checkboxGroup = inject(checkboxGroupContextKey, undefined)
const isGroup = computed(() => !isUndefined(checkboxGroup))
const model = computed({
  get() {
    return isGroup.value ? checkboxGroup?.modelValue.value : props.modelValue
  },
  set(val: unknown) {
    if (isGroup.value && isArray(val)) {
      checkboxGroup?.changeEvent(val)
    } else {
      emits('update:modelValue', val as boolean)
    }
  }
})

const isChecked = computed(() => {
  const value = model.value as any
  if (isBoolean(value)) {
    return value
  } else if (isArray(value)) {
    return value
      .map((item: CheckboxValueType) => toRaw(item))
      .includes(props.label)
  } else {
    return !!value
  }
})
</script>
