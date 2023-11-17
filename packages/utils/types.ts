// import { isArray, isObject } from '@vue/shared'

export const isNumber = (val: unknown): boolean => typeof val === 'number'

export const isArray = (val: unknown): boolean => Array.isArray(val)

export const isBoolean = (val: unknown): boolean => typeof val === 'boolean'

export const isFunction = (val: unknown): boolean => typeof val === 'function'

export const isObject = (val: unknown): boolean =>
  typeof val === 'object' && val !== null

export const isUndefined = (val: unknown): boolean => typeof val === 'undefined'
