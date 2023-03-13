import { withInstall } from '@lsk-ui/utils/with-install'
import _VirtualList from './src/virtualList'

const VirtualList = withInstall(_VirtualList)

export default VirtualList

export * from './src/virtualList'

declare module 'vue' {
  export interface GlobalComponents {
    LVirtualList: typeof VirtualList
  }
}
