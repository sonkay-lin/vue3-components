import { withInstall } from '@lsk-ui/utils/with-install'
import _Row from './src/row.vue'

const Row = withInstall(_Row)

export default Row

export * from './src/row'

//这里添加类型可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    LRow: typeof Row
  }
}
