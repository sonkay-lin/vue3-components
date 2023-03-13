import { describe, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'
import { expect } from 'vitest'
import { ref } from 'vue'

describe('button.vue', () => {
  it('button基础用法', () => {
    const wrapper = mount(() => <Button />)
    expect(wrapper.classes()).toContain('l-button')
  })
  it('props属性 type', () => {
    const wrapper = mount(() => <Button type="primary" />)
    expect(wrapper.classes()).toContain('l-button--primary')
  })
  it('props属性 size', () => {
    const wrapper = mount(() => <Button size="large" />)
    expect(wrapper.classes()).toContain('l-button--large')
  })
  it('props属性 nativeType', () => {
    const wrapper = mount(() => <Button nativeType="submit" />)
    expect(wrapper.attributes('type')).toBe('submit')
  })
  it('props属性 round', () => {
    const wrapper = mount(() => <Button round />)
    expect(wrapper.classes()).toContain('is-round')
  })
  it('props属性 loading', () => {
    const wrapper = mount(() => <Button loading />)
    expect(wrapper.classes()).toContain('is-loading')
  })
  it('props属性 disabled', async () => {
    const wrapper = mount(() => <Button disabled />)
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
  it('emit事件 click', async () => {
    const count = ref(0)
    const wrapper = mount(() => (
      <Button
        onClick={() => count.value++}
        v-slots={{ default: () => count.value }}
      ></Button>
    ))
    expect(wrapper.text()).toEqual('0')
    await wrapper.trigger('click')
    expect(wrapper.text()).toEqual('1')
  })
})
