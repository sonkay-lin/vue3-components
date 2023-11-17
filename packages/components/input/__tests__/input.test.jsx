import { mount } from '@vue/test-utils'
import { describe, test } from 'vitest'
import Input from '../src/input.vue'
import { ref } from 'vue'
import { expect } from 'vitest'

describe('Input.vue', () => {
  test('input基本用法', () => {
    const value = ref('输入框内容')
    const wrapper = mount(() => (
      <Input v-model={value.value} placeholder="请输入"></Input>
    ))
    const inputEle = wrapper.find('input')

    expect(inputEle.exists()).toBe(true)
  })
})
