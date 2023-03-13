<template>
  <l-button disabled type="warning" icon-placement="left" @click="hanleClick"
    >测试button
    <template #icon>
      <l-icon>
        <Add></Add>
      </l-icon>
    </template>
  </l-button>
  <l-button size="large" @click="hanleClick">large</l-button>
  <l-button type="warning" @click="hanleClick">default</l-button>
  <l-button type="danger" size="small" @click="hanleClick">small</l-button>
  <l-button type="danger" size="small" @click="hanleClick">small</l-button>
  <l-button type="primary" @click="() => count++">{{ count }}</l-button>
</template>

<script lang="ts" setup>
import { Add } from '@vicons/ionicons5'
import { ref } from 'vue'
const count = ref(0)
function hanleClick() {
  console.log('测试点击')
}
</script>
