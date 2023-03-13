<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState === 'success'),
      bem.is('error', validateState === 'error')
    ]"
  >
    <label :class="[bem.e('label')]" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </label>
    <div :class="[bem.e('content')]">
      <slot></slot>
      <div :class="[bem.e('error')]">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { creatNamespace } from '@lsk-ui/utils/create'
import {
  FormItemValidateState,
  formItemProps,
  formItemContextKey,
  FormItemContext,
  Arrayable,
  FormItemRule
} from './form-item'
import { ref, provide, computed, inject, reactive } from 'vue'
import { formContextKey } from './form'
import asyncValidator, { Values } from 'async-validator'
import { onMounted } from 'vue'
import { isNumber } from '@lsk-ui/utils/types'

defineOptions({
  name: 'l-form-item'
})
//form上下文
const formContext = inject(formContextKey, undefined)

const props = defineProps(formItemProps)
const bem = creatNamespace('form-item')
//校验状态
const validateState = ref<FormItemValidateState>()
//校验错误信息
const validateMessage = ref()

const labelStyle = computed(() => {
  let width = props.labelWidth || formContext?.labelWidth || ''
  if (isNumber(width)) {
    width = width + 'px'
  }

  return { width }
})

const converArray = (
  rules: Arrayable<FormItemRule> | undefined
): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}

const _rules = computed(() => {
  const _formItemRules = converArray(props.rules)
  const _formRules = formContext?.rules
  //将form中的规则于form-item中对应的属性规则合并
  if (_formRules && props.prop) {
    const _temp = _formRules[props.prop]
    if (_temp) {
      _formItemRules.push(...converArray(_temp))
    }
  }
  return _formItemRules
})
//设置校验状态
const setValidationState = (state: FormItemValidateState) => {
  validateState.value = state
}
//校验成功
const onValidationSuccessed = () => {
  setValidationState('success')
  validateMessage.value = ''
}
//校验失败
const onValidationFailed = (err: Values) => {
  setValidationState('error')
  validateMessage.value = err ? err[0].message : ''
}
//正在校验
const doValidate = (rules: FormItemRule[]) => {
  //获取当前绑定的属性
  const modelName = props.prop!
  const validator = new asyncValidator({
    [modelName]: rules
  })
  //从form中获取当前属性
  const model = formContext?.model || {}
  return validator
    .validate({
      [modelName]: model[modelName]
    })
    .then(() => {
      onValidationSuccessed()
    })
    .catch((err: Values) => {
      onValidationFailed(err.errors)
      return Promise.reject(err)
    })
}
const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  const rules = getRulesFiltered(trigger)
  setValidationState('validating')
  return doValidate(rules)
    .then(() => {
      return callback?.(true)
    })
    .catch(error => {
      const { fields } = error
      if (callback) {
        callback(false, fields)
      } else {
        return Promise.reject(error)
      }
    })
}
//获取对应的触发规则
const getRulesFiltered = (trigger: string) => {
  const rules = _rules.value
  return rules.filter(rule => {
    if (!rule.trigger || !trigger) return true //没传触发条件就是默认都触发
    if (Array.isArray(rule?.trigger)) {
      return rule?.trigger.includes(trigger)
    }
    return rule?.trigger === trigger
  })
}

const context: FormItemContext = reactive({
  ...props,
  validate
})

provide(formItemContextKey, context)
defineExpose({
  validate
})
onMounted(() => {
  formContext?.addField(context)
})
</script>
