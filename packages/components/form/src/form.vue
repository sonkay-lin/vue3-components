<template>
  <form :class="formClass">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { creatNamespace } from '@lsk-ui/utils/create'
import { formProps, formContextKey, FormContext } from './form'
import { computed, provide, reactive } from 'vue'
import { FormItemContext } from './form-item'
import { Values } from 'async-validator'
defineOptions({
  name: 'l-form'
})
const bem = creatNamespace('form')
const props = defineProps(formProps)
const formClass = computed(() => {
  const { labelPosition } = props
  return [bem.b(), bem.m(`label-${labelPosition}`)]
})

const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (error) {
      errors = {
        ...errors,
        ...(error as Values).fields
      }
    }
  }
  if (Object.keys(errors).length === 0) {
    //校验成功
    return callback?.(true)
  } else {
    if (callback) {
      callback(false, errors)
    } else {
      return Promise.reject(errors)
    }
  }
}
//父收集子的所以校验规则
const fields: FormItemContext[] = []

const addField: FormContext['addField'] = context => {
  fields.push(context)
}

provide(
  formContextKey,
  reactive({
    ...props,
    addField
  })
)
defineExpose({
  validate
})
</script>
