import { withInstall } from '@lsk-ui/utils/with-install'
import _Icon from './src/icon.vue'

const Icon = withInstall(_Icon)

export default Icon

export * from './src/icon'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LIcon: typeof Icon
  }
}
