<template>
  <l-input
    ref="inputRef"
    v-model="name"
    showPassword
    clearable
    placeholder="请输入密码"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @clear="handleClear"
  >
    <template #prepend>前置</template>
    <template #append>后置</template>
    <!-- <template #prefix>
      <l-icon>
        <AddCircle></AddCircle>
      </l-icon>
    </template> -->
    <template #suffix>
      <l-icon>
        <AddCircle></AddCircle>
      </l-icon>
    </template>
  </l-input>
</template>

<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'
import { Input } from '@lsk-ui/components/input'
const name = ref('')
const inputRef = ref<InstanceType<typeof Input>>()

function handleInput(e: any) {
  console.log(e, 'input')
}
function handleChange(e: any) {
  console.log(e, 'change')
}
function handleFocus(e: any) {
  console.log(e, 'focus')
  setTimeout(() => {
    inputRef.value?.blur()
  }, 2000)
}
function handleBlur(e: any) {
  console.log(e, 'blur')
  setTimeout(() => {
    inputRef.value?.focus()
  }, 2000)
}
function handleClear() {
  console.log('清除数据了')
}
</script>
