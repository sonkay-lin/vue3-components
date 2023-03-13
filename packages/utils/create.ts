function _bem(
  prefixName: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`
  }
  if (element) {
    prefixName += `__${element}`
  }
  if (modifier) {
    prefixName += `--${modifier}`
  }
  return prefixName
}

function creatBEM(prefixName: string) {
  const b = (blockSuff = '') => _bem(prefixName, blockSuff, '', '')
  const e = (element = '') => (element ? _bem(prefixName, '', element, '') : '')
  const m = (modifier = '') =>
    modifier ? _bem(prefixName, '', '', modifier) : ''
  const be = (blockSuff = '', element = '') =>
    blockSuff && element ? _bem(prefixName, blockSuff, element, '') : ''
  const bm = (blockSuff = '', modifier = '') =>
    blockSuff && modifier ? _bem(prefixName, blockSuff, '', modifier) : ''
  const em = (element = '', modifier = '') =>
    element && modifier ? _bem(prefixName, '', element, modifier) : ''
  const bem = (blockSuff = '', element = '', modifier = '') =>
    blockSuff && element && modifier
      ? _bem(prefixName, blockSuff, element, modifier)
      : ''

  const is = (name: string, state: string | boolean) =>
    state ? `is-${name}` : ''
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is
  }
}

export function creatNamespace(name: string) {
  const prefixName = `l-${name}`
  return creatBEM(prefixName)
}

// const bem = creatNamespace('icon')
// console.log(bem.b('box'))
