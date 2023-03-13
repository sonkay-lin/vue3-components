---
title: Icon
---
# Icon 图标
## Icon 属性
<div class="row">
  <l-icon size="24">
    <Add />
  </l-icon>
  <l-icon size="24" color="red">
    <Add />
  </l-icon>
</div>

```js
<template>
  <l-icon size="24">
    <Add />
  </l-icon>
  <l-icon size="24" color="red">
    <Add />
  </l-icon>
</template>
```

## 图标集合
<ul class="icon-list">
  <li v-for="item in list" :key="item.name">
    <span class="icon-card">
      <l-icon size="24">
        <component :is="item.render"></component>
      </l-icon>
      <span> {{ item.name }} </span>
    </span>
  </li>
</ul>

## props
| 属性      | 说明  | 类型  | 默认值   |
|:----------------:|:-------:|:-------:|:-------:|
| color | 类型 | string | 继承颜色 |
| size | 尺寸 | number, string | 继承字体大小 |

## slots
| 插槽名      | 说明  | 
|:----------------:|:-------:|
| default | 自定义默认内容 | 

<script lang="ts" setup>
import { Add, Menu } from '@vicons/ionicons5'
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