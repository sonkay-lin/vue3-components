import { withInstall } from '@lsk-ui/utils/with-install'
import _Checkbox from './src/checkbox.vue'
import _CheckboxGroup from './src/checkbox-group.vue'

const Checkbox = withInstall(_Checkbox)
const CheckboxGroup = withInstall(_CheckboxGroup)

export default Checkbox
export { CheckboxGroup }

export * from './src/checkbox'
export * from './src/checkbox-group'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LCheckbox: typeof Checkbox
    LCheckboxGroup: typeof CheckboxGroup
  }
}
