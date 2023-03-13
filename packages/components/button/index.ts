import { withInstall } from '@lsk-ui/utils/with-install'
import _Button from './src/button.vue'

const Button = withInstall(_Button)

export default Button

export type { ButtonProps } from './src/button'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LButton: typeof Button
  }
}
