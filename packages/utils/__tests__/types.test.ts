import {
  isObject,
  isNumber,
  isArray,
  isBoolean,
  isFunction,
  isUndefined
} from '../types'
import { describe, expect } from 'vitest'
import { it } from 'vitest'

describe('类型校验', () => {
  it('isObject', () => {
    const obj = {}
    const ary = []
    expect(isObject(obj)).toBe(true)
    expect(isObject(ary)).toBe(true)
  })
  it('isNumber', () => {
    const num = 0
    expect(isNumber(num)).toBe(true)
  })
  it('isArray', () => {
    const ary = []
    expect(isArray(ary)).toBe(true)
  })
  it('isBoolean', () => {
    const flag = true
    expect(isBoolean(flag)).toBe(true)
  })
  it('isFunction', () => {
    const fn = () => {
      return
    }
    expect(isFunction(fn)).toBe(true)
  })
  it('isUndefined', () => {
    const none = undefined
    expect(isUndefined(none)).toBe(true)
  })
})
