<template>
  <div v-for="item in list" :key="item.name">
    <l-icon size="24">
      <component :is="item.render"></component>
    </l-icon>
    <span>{{ item.name }}</span>
  </div>
</template>

<script setup lang="ts">
import * as iconList from '@vicons/ionicons5'
import { onMounted, ref } from 'vue'
const list: any = ref([])
onMounted(() => {
  Object.keys(iconList).forEach((icon: any) => {
    list.value.push({
      name: (iconList as any)[icon].name,
      render: (iconList as any)[icon].render
    })
  })
})
</script>
