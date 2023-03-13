import { withInstall } from '@lsk-ui/utils/with-install'
import _Checkbox from './src/checkbox.vue'

const Checkbox = withInstall(_Checkbox)

export default Checkbox

export * from './src/checkbox'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LCheckbox: typeof Checkbox
  }
}
