import { withInstall } from '@lsk-ui/utils/with-install'
import _FormItem from './src/form-item.vue'
import _Form from './src/form.vue'

export const FormItem = withInstall(_FormItem)
export const Form = withInstall(_Form)

// export default { Form, FormItem }

export * from './src/form'
export * from './src/form-item'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LForm: typeof Form
    LFormItem: typeof FormItem
  }
}
