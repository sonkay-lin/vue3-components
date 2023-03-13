---
title: Checkbox
---
# Checkbox 按钮

## 基础用法
<div class="row">
  <l-checkbox v-model="isChecked" @change="onChange">checkbox</l-checkbox>
</div>

```vue
<template>
  <l-checkbox v-model="isChecked" @change="onChange">checkbox</l-checkbox>
</template>
<script setup>
import { ref } from 'vue'
const isChecked = ref(false)
const onChange = (value) => alert(value)
</script>
```

## props
| 属性      | 说明  | 类型  | 默认值   |
|:----------------:|:-------:|:-------:|:-------:|
| disabled | checkbox是否为禁用状态 | boolean | false |
<!-- | label | 按钮是否为禁用状态 | boolean | false | -->
## slots
| 插槽名      | 说明  | 
|:----------------:|:-------:|
| default | 自定义默认内容 | 

<script setup>
import { ref } from 'vue'
const isChecked = ref(false)
const onChange = (value) => alert(value)
</script>