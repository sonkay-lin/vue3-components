import { describe, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import Icon from '../src/icon.vue'
import { ref } from 'vue'

describe('Icon.vue', () => {
  it('Icon用法', () => {
    const size = 20
    const color = 'rgb(0, 0, 0)'
    const wrapper = mount(() => <Icon size={size} color={color} />)
    expect(wrapper.classes()).toContain('l-icon')
    expect(wrapper.element.getAttribute('style')).toContain(`color: ${color}`)
    expect(wrapper.element.getAttribute('style')).toContain(
      `font-size: ${size}`
    )
  })
})
