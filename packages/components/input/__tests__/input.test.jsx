import { mount } from '@vue/test-utils'
import { describe, test } from 'vitest'
import Input from '../src/input.vue'
import { ref } from 'vue'

describe('Input.vue', () => {
  test('input基本用法', () => {
    const value = ref('输入框内容')
    const wrapper = mount(() => <Input v-model={value.value}></Input>)
  })
})
