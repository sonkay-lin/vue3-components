<template>
  <div :class="[bem.b(), bem.is('disabled', disabled)]">
    <div :class="[bem.b('group')]">
      <!-- 输入框的前置内容 -->
      <div v-if="slots.prepend" :class="[bem.be('group', 'prepend')]">
        <slot name="prepend"></slot>
      </div>
      <div :class="[bem.e('wrapper'), bem.is('focus', focused)]">
        <!-- 输入框的前置图标 -->
        <span :class="[bem.e('prefix')]" v-if="slots.prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          ref="inputRef"
          :class="[bem.e('inner')]"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <l-icon v-if="showPwdVisible" size="16" @click="handlePasswordVisible">
          <EyeOffOutline v-if="passwordVisible" />
          <EyeOutline v-else />
        </l-icon>
        <l-icon v-if="showClear" size="16" @click="handleClear">
          <CloseCircleOutline />
        </l-icon>
        <!-- 输入框的后置图标 -->
        <span :class="[bem.e('suffix')]" v-if="slots.suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
      <!-- 输入框的后置内容 -->
      <div v-if="slots.append" :class="[bem.be('group', 'append')]">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { creatNamespace } from '@lsk-ui/utils/create'
import {
  computed,
  inject,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch
} from 'vue'
import { inputEmit, inputProps } from './input'
import LIcon from '@lsk-ui/components/icon'
import {
  EyeOutline,
  EyeOffOutline,
  CloseCircleOutline
} from '@vicons/ionicons5'
import { formItemContextKey } from '@lsk-ui/components/form'
type TargetElement = HTMLInputElement
defineOptions({
  name: 'l-input',
  inheritAttrs: false
})
//注入表单属性
const formItemContext = inject(formItemContextKey, undefined)

const props = defineProps(inputProps)
const emits = defineEmits(inputEmit)
const bem = creatNamespace('input')
const slots = useSlots()
const attrs = useAttrs()
const inputRef = ref<HTMLInputElement>()
//input是否聚焦
const focused = ref(false)
//是否显示密码内容
const passwordVisible = ref(false)
//是否显示密码图标
const showPwdVisible = computed(
  () =>
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
)
//是否显示清除图标
const showClear = computed(
  () =>
    props.modelValue && props.clearable && !props.disabled && !props.readonly
)
//对input框设置值
function setNativeInputValue() {
  const input = inputRef.value
  if (!input) return
  input.value = String(props.modelValue)
}

function handleInput(event: Event) {
  const { value } = event.target as TargetElement
  emits('input', value)
  emits('update:modelValue', value)
}
function handleChange(event: Event) {
  emits('change', (event.target as TargetElement).value)
}
function handleFocus(event: FocusEvent) {
  focused.value = true
  emits('focus', event)
}
function handleBlur(event: FocusEvent) {
  //表单触发blur校验
  formItemContext?.validate('blur').catch(err => err)
  focused.value = false
  emits('blur', event)
}
//密码内容切换
function handlePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
  focus()
}
function handleClear() {
  emits('input', '')
  emits('update:modelValue', '')
  emits('clear')
  focus()
}

async function focus() {
  await nextTick()
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

watch(
  () => props.modelValue,
  () => {
    //表单触发change校验
    formItemContext?.validate('change').catch(err => err)
    setNativeInputValue()
  }
)
onMounted(() => {
  setNativeInputValue()
})
defineExpose({
  focus,
  blur
})
</script>
