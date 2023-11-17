<template>
  <div>
    <l-checkbox-group v-model="checked" @change="change">
      <l-checkbox label="测试"></l-checkbox>
      <l-checkbox label="测试1"></l-checkbox>
      <l-checkbox label="测试2"></l-checkbox>
      <l-checkbox label="测试3"></l-checkbox>
    </l-checkbox-group>
    <span>{{ checked }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(['测试'])

const change = (val: any) => {
  console.log(val)
}
</script>
