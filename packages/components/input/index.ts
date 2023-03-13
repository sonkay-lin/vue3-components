import { withInstall } from '@lsk-ui/utils/with-install'
import _Input from './src/input.vue'

export const Input = withInstall(_Input)

export default Input

export * from './src/input'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LInput: typeof Input
  }
}
