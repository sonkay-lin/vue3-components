---
title: Button
---
# Button 按钮

## 基础用法
- 使用 type、round 来定义按钮的样式。
<div class="row">
  <l-button type="primary">primary</l-button>
  <l-button type="success">success</l-button>
  <l-button type="warning">warning</l-button>
  <l-button type="danger">danger</l-button>
  <l-button type="info">info</l-button>
  <l-button type="default">default</l-button>
</div>
<div class="row">
  <l-button type="primary" round>primary</l-button>
  <l-button type="success" round>success</l-button>
  <l-button type="warning" round>warning</l-button>
  <l-button type="danger" round>danger</l-button>
  <l-button type="info" round>info</l-button>
  <l-button type="default" round>default</l-button>
</div>

```js
<template>
  <l-button type="primary">primary</l-button>
  <l-button type="success">success</l-button>
  <l-button type="warning">warning</l-button>
  <l-button type="danger">danger</l-button>
  <l-button type="info">info</l-button>
  <l-button type="default">default</l-button>

  <l-button type="primary" round>primary</l-button>
  <l-button type="success" round>success</l-button>
  <l-button type="warning" round>warning</l-button>
  <l-button type="danger" round>danger</l-button>
  <l-button type="info" round>info</l-button>
  <l-button type="default" round>default</l-button>
</template>
```

## size
<div class="row">
  <l-button size="large">large</l-button>
  <l-button size="default">default</l-button>
  <l-button size="small">small</l-button>
</div>

```js
<template>
  <l-button size="large">large</l-button>
  <l-button size="default">default</l-button>
  <l-button size="small">small</l-button>
</template>
```

## 状态
<l-button disabled type="primary">disabled</l-button>
<l-button loading type="primary">loading</l-button>

```js
<template>
  <l-button disabled type="primary">disabled</l-button>
  <l-button loading type="primary">loading</l-button>
</template>
```

## icon
<l-button type="primary">
  <template #icon>
    <l-icon>
      <Menu />
    </l-icon>
  </template>
  <span>菜单</span>
</l-button>
<l-button type="primary" iconPlacement="right">
  <template #icon>
    <l-icon>
      <Menu />
    </l-icon>
  </template>
  <span>菜单</span>
</l-button>

```js
<template>
  <l-button type="primary">
    <template #icon>
      <l-icon>
        <Menu />
      </l-icon>
    </template>
    <span>菜单</span>
  </l-button>
  <l-button type="primary" iconPlacement="right">
    <template #icon>
      <l-icon>
        <Menu />
      </l-icon>
    </template>
    <span>菜单</span>
  </l-button>
</template>
```

## props
| 属性      | 说明  | 类型  | 默认值   |
|:----------------:|:-------:|:-------:|:-------:|
| type | 类型 | [ 'primary', 'success', 'warning', 'danger', 'info', 'default'] | default |
| round | 是否为圆角按钮 | boolean | false |
| size | 尺寸 | ['large', 'default', 'small'] | default |
| loading | 是否为加载中状态 | boolean | false |
| disabled | 按钮是否为禁用状态 | boolean | false |
| iconPlacement | icon图标的位置 | ['left', 'right'] | left |
## slots
| 插槽名      | 说明  | 
|:----------------:|:-------:|
| default | 自定义默认内容 | 
| icon | 自定义icon图标 | 

<script lang="ts" setup>
import { Add, Menu } from '@vicons/ionicons5'

const hanleClick = () => {
  console.log('测试点击')
}
</script>