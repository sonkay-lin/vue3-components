import { onMounted, ref, Ref, watch, SetupContext } from 'vue'
import { Key, TreeNode, TreeOption, TreeProps, TreeEmits } from '../tree'

//树节点初始化、懒加载逻辑
export const useInitTree = (
  props: TreeProps,
  tree: Ref<TreeNode[]>,
  treeNodeMap: Ref<Map<Key, TreeNode>>
) => {
  const treeOptions = creatOptions(
    props.keyField!,
    props.labelField!,
    props.childrenField!
  )
  //根据用户的字段返回用户对应的数据
  function creatOptions(key: Key, label: string, children: string) {
    return {
      getKey(node: TreeOption) {
        return node[key] as string
      },
      getLabel(node: TreeOption) {
        return node[label] as string
      },
      getChildren(node: TreeOption) {
        return (node[children] as TreeOption[]) || []
      }
    }
  }
  //递归创建树
  function creatTree(
    data: TreeOption[],
    parent: TreeNode | null = null
  ): TreeNode[] {
    function traveral(data: TreeOption[], parent: TreeNode | null = null) {
      return data.map(node => {
        const children = treeOptions.getChildren(node)
        const treeNode: TreeNode = {
          parentKey: parent?.key,
          key: treeOptions.getKey(node),
          label: treeOptions.getLabel(node),
          level: parent ? parent.level + 1 : 0,
          rawNode: node,
          disabled: !!node.disabled,
          isLeaf: node.isLeaf ?? children.length == 0,
          children: []
        }
        if (children?.length > 0) {
          treeNode.children = traveral(children, treeNode)
        }
        treeNodeMap.value.set(treeNode.key, treeNode)
        return treeNode
      })
    }

    const result: TreeNode[] = traveral(data, parent)
    return result
  }
  //根据用户的data数据创建树
  watch(
    () => props.data!,
    (data: TreeOption[]) => {
      tree.value = creatTree(data)
    },
    {
      immediate: true
    }
  )

  //懒加载
  //正在加载的节点
  const loadingKeysRef = ref<Set<Key>>(new Set<Key>())
  //触发懒加载
  function triggerLoading(node: TreeNode) {
    if (!node?.children.length && !node.isLeaf && props.lazy) {
      //如果没有加载过这个节点 就添加进loadingKeysRef
      const loadingKeys = loadingKeysRef.value
      if (!loadingKeys.has(node.key)) {
        loadingKeys.add(node.key)
        const onLoad = props.onLoad
        if (onLoad) {
          onLoad(node.rawNode).then(children => {
            node.rawNode.children = children
            node.children = creatTree(children, node)
            loadingKeys.delete(node.key)
          })
        }
      }
    }
  }
  return {
    loadingKeysRef,
    triggerLoading
  }
}

//树组件切换展开
export const useTreeToggleExpand = (
  props: TreeProps,
  loadingKeysRef: Ref<Set<Key>>,
  triggerLoading: CallableFunction
) => {
  //获取展开的节点数据
  const expandeKeysSet = ref(new Set(props.defaultExpandeKeys))
  //折叠功能
  function collpase(node: TreeNode) {
    expandeKeysSet.value.delete(node.key)
  }
  //展开功能
  function expand(node: TreeNode) {
    expandeKeysSet.value.add(node.key)
    //如果有异步加载节点触发异步方法
    triggerLoading(node)
  }
  //切换功能
  function toggleExpand(node: TreeNode) {
    const expandeKeys = expandeKeysSet.value
    //如果节点正在加载就不给折叠
    if (expandeKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
      collpase(node)
    } else {
      expand(node)
    }
  }
  //判断节点是否需要展开
  function isExpanded(node: TreeNode): boolean {
    return expandeKeysSet.value.has(node.key)
  }
  return {
    expandeKeysSet,
    toggleExpand,
    isExpanded
  }
}

// 树节点checkbox操作逻辑
export const useTreeCheck = (
  props: TreeProps,
  treeNodeMap: Ref<Map<Key, TreeNode>>
) => {
  //获取传入选中状态的checkbox
  const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys))
  //存放半选状态的checkbox
  const indeterminateRefs = ref(new Set())
  //判断节点checkbox是否选中
  function isChecked(node: TreeNode) {
    return checkedKeysRefs.value.has(node.key)
  }
  function isDisabled(node: TreeNode) {
    return !!node.disabled
  }
  function isIndeterminate(node: TreeNode) {
    return indeterminateRefs.value.has(node.key)
  }
  //切换checkbox
  function toggleCheck(node: TreeNode, checked: boolean) {
    //递归自上而下选中子节点
    toggle(node, checked)
    updateCheck(node)
  }
  //递归子节点
  function toggle(node: TreeNode, checked: boolean) {
    const checkKeys = checkedKeysRefs.value
    if (checked) {
      //如果为选中，就将节点半选删除
      indeterminateRefs.value.delete(node.key)
    }
    checkKeys[checked ? 'add' : 'delete'](node.key)
    const { children = [] } = node
    children.forEach(childNode => {
      toggle(childNode, checked)
    })
  }
  //自下而上更新节点选中状态
  function updateCheck(node: TreeNode) {
    if (node.parentKey) {
      const parentNode = treeNodeMap.value.get(node.parentKey)
      if (!parentNode) return
      const { children = [] } = parentNode
      //全选状态
      let allChecked = true
      //子节点有没有被选中
      let hasChecked = false
      for (const childNode of children) {
        if (checkedKeysRefs.value.has(childNode.key)) {
          //有子节点被选中
          hasChecked = true
        } else if (indeterminateRefs.value.has(childNode.key)) {
          //有些子节点被半选
          allChecked = false
          hasChecked = true
        } else {
          //都没被选中
          allChecked = false
        }
      }
      if (allChecked) {
        //父节点全选状态
        checkedKeysRefs.value.add(parentNode.key)
        indeterminateRefs.value.delete(parentNode.key)
      } else if (hasChecked) {
        //父节点半选状态
        checkedKeysRefs.value.delete(parentNode.key)
        indeterminateRefs.value.add(parentNode.key)
      } else if (!allChecked && !hasChecked) {
        //父节点不选状态
        checkedKeysRefs.value.delete(parentNode.key)
        indeterminateRefs.value.delete(parentNode.key)
      }
      updateCheck(parentNode)
    }
  }
  onMounted(() => {
    checkedKeysRefs.value.forEach((key: Key) => {
      const node = treeNodeMap.value.get(key)
      if (!node) return
      toggleCheck(node, true)
    })
  })

  return {
    checkedKeysRefs,
    isChecked,
    isDisabled,
    isIndeterminate,
    toggleCheck
  }
}

//树节点选中逻辑
export const useTreeSelect = (
  props: TreeProps,
  emits: SetupContext<TreeEmits>['emit']
) => {
  //实现节点选中
  const selectedKeyRef = ref<Key[]>([])
  //选中节点事件
  function handelSelect(node: TreeNode) {
    if (!props.selectable) return
    let keys = Array.from(selectedKeyRef.value)
    if (props.multiple) {
      const index = keys.findIndex(key => key === node.key)
      if (index > -1) {
        keys.splice(index, 1)
      } else {
        keys.push(node.key)
      }
    } else {
      // if (keys.includes(node.key)) {
      //   keys = []
      // } else {
      //   keys = [node.key]
      // }
      keys = [node.key]
    }
    emits('update:selectedKey', keys)
  }
  watch(
    () => props.selectedKey,
    value => {
      if (value) {
        selectedKeyRef.value = value
      }
    },
    {
      immediate: true
    }
  )
  return {
    selectedKeyRef,
    handelSelect
  }
}
