import { defineComponent, inject } from "vue";
import { TreeInjectKey, treeNodeContentProps } from "./tree";

export default defineComponent({
  name: 'TreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const treeContent = inject(TreeInjectKey)
    return () => {
      return treeContent?.slots.default ? treeContent?.slots.default({ node: props.node }) : props.node!.label
    }
  }
})