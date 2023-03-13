---
title: Input
---
# Input 输入框

## 基础用法
<l-input v-model="input" placeholder="请输入内容"></l-input>

```vue
<template>
  <l-input placeholder="请输入内容"></l-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

## disabled
<l-input v-model="input" disabled placeholder="请输入内容"></l-input>
```vue
<template>
  <l-input v-model="input" disabled placeholder="请输入内容"></l-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

## showPassword
<l-input v-model="input" showPassword placeholder="请输入内容"></l-input>
```vue
<template>
  <l-input v-model="input" showPassword placeholder="请输入内容"></l-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

## clearable
<l-input v-model="input" clearable placeholder="请输入内容"></l-input>
```vue
<template>
  <l-input v-model="input" clearable placeholder="请输入内容"></l-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

## 前置、后置内容、图标插槽
<l-input v-model="input" placeholder="请输入内容">
  <template #prepend>http://</template>
  <template #append>.com</template>
  <template #prefix>
    <l-icon>
      <Alert />
    </l-icon>
  </template> 
  <template #suffix>
    <l-icon>
      <Search />
    </l-icon>
  </template>
</l-input>

```vue
<template>
  <l-input v-model="input" placeholder="请输入内容">
    <template #prepend>http://</template>
    <template #append>.com</template>
    <template #prefix>
      <l-icon>
        <Alert />
      </l-icon>
    </template> 
    <template #suffix>
      <l-icon>
        <Search />
      </l-icon>
    </template>
  </l-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

## props
| 属性      | 说明  | 类型  | 默认值   |
|:----------------:|:-------:|:-------:|:-------:|
| placeholder | 输入框占位文本 | string | - |
| disabled | 是否禁用 | boolean | false |
| showPassword | 是否显示切换密码图标	| boolean  | false |
| readonly | 原生  readonly 属性，是否只读 | boolean | false |
| clearable | 是否显示清除按钮 | boolean | false |
## slots
| 插槽名      | 说明  | 
|:----------------:|:-------:|
| prepend | 输入框前面的内容 | 
| append | 输入框后面的内容 | 
| prefix | 输入框中前面的图标 | 
| suffix | 输入框中后面的图标 | 

<script lang="ts" setup>
import { Search, Alert } from '@vicons/ionicons5'
import { ref } from 'vue'
const input = ref('')

</script>