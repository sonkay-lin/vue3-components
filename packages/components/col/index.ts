import { withInstall } from '@lsk-ui/utils/with-install'
import _Col from './src/col.vue'

const Col = withInstall(_Col)

export default Col

export * from './src/col'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LCol: typeof Col
  }
}
