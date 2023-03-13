import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { describe, test } from 'vitest'
import { nextTick, ref } from 'vue'
import Checkbox from '../src/checkbox.vue'

describe('checkbox', () => {
  test('checkbox基础用法', async () => {
    const isChecked = ref(false)
    const wrapper = mount(() => <Checkbox v-model={isChecked.value}></Checkbox>)
    expect(wrapper.classes()).toContain('l-checkbox')
    expect(isChecked.value).toBe(false)
    await wrapper.trigger('click')
    isChecked.value = true
    await nextTick()
    const input = wrapper.find('input').wrapperElement
    expect(input._modelValue).toBe(true)
  })
  test('props属性 disabled', () => {
    const isChecked = ref(false)
    const wrapper = mount(() => (
      <Checkbox v-model={isChecked.value} disabled></Checkbox>
    ))
    expect(wrapper.find('input').isDisabled()).toBe(true)
  })
  test('props属性 label', () => {
    const isChecked = ref(false)
    const label = 'label'
    const wrapper = mount(() => (
      <Checkbox v-model={isChecked.value} label={label}></Checkbox>
    ))
    const inputValue = wrapper.find('input').wrapperElement._value
    expect(inputValue).toBe(label)
    expect(wrapper.find('.l-checkbox__label').text()).toBe(label)
  })
  // test('emit事件 change', async () => {
  //   const isChecked = ref(false)
  //   const data = ref(false)
  //   const onChange = val => {
  //     data.value = val
  //     console.log('onChange')
  //   }
  //   const wrapper = mount({
  //     setup() {
  //       return () => (
  //         <Checkbox
  //           v-model={isChecked.value}
  //           onChange={onChange}
  //           ref="CheckboxRef"
  //         ></Checkbox>
  //       )
  //     }
  //   })
  //   await wrapper.trigger('click')
  //   console.log(data.value)
  //   // expect(wrapper.find('.l-checkbox__label').text()).toBe(label)
  // })
})
