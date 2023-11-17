<template>
  <l-form
    ref="formRef"
    label-width="70px"
    label-position="left"
    :model="state"
    :rules="{
      userName: {
        min: 3,
        max: 6,
        message: '用户名3-6位',
        trigger: ['change', 'blur']
      }
    }"
  >
    <l-form-item
      prop="userName"
      label="用户名"
      :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
    >
      <l-input v-model="state.userName" placeholder="请输入用户名"></l-input>
      <template #label>用户名</template>
    </l-form-item>
    <l-form-item
      prop="password"
      label="密码:"
      :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码6-10位', trigger: ['change', 'blur'] }
      ]"
    >
      <l-input
        v-model="state.password"
        placeholder="请输入用户名"
        type="password"
      ></l-input>
    </l-form-item>
    <l-form-item
      prop="sex"
      label="性别:"
      :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码6-10位', trigger: ['change', 'blur'] }
      ]"
    >
      <l-checkbox-group v-model="state.sex"></l-checkbox-group>
    </l-form-item>
    <l-button @click="validateForm">提交</l-button>
  </l-form>
</template>

<script setup lang="ts">
import { Form } from '@lsk-ui/components/form'
import { reactive, ref } from 'vue'

const formRef = ref<InstanceType<typeof Form>>()
const state = reactive({
  userName: '',
  password: '',
  sex: ['男']
})

function validateForm() {
  formRef.value?.validate((valid, errors) => {
    console.log(valid, errors)
  })
}
</script>
