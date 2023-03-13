import { creatNamespace } from '@lsk-ui/utils/create'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 35
    },
    remain: {
      type: Number,
      default: 8
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const bem = creatNamespace('vl')
    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const offset = ref(0)
    const state = reactive({
      start: 0,
      end: props.remain
    })
    const visiableData = computed(() => {
      //上下多加几个防止滚动过快 列表留白
      return props.items.slice(state.start - pre.value, state.end + next.value)
    })
    const pre = computed(() => Math.min(state.start, props.remain))
    const next = computed(() =>
      Math.min(props.remain, props.items.length - state.end)
    )
    function handelScroll() {
      //获取容器滚动的高度
      const scrollTop = wrapperRef.value!.scrollTop
      //显示头部的位置 = 滚动的高度 / 每行的高度
      state.start = Math.floor(scrollTop / props.size)
      //显示底部的位置 = 显示头部的位置 + 显示的个数
      state.end = state.start + props.remain
      //列表距离顶部的偏移量 = 显示头部的位置 * 每行的高度 - 顶部多加的几个 * 每行的高度
      offset.value = state.start * props.size - pre.value * props.size
    }
    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }
    watch(
      () => props.items,
      () => initWrapper()
    )
    onMounted(() => initWrapper())
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handelScroll}>
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3D(0, ${offset.value}px, 0)` }}
          >
            {visiableData.value.map((node, index) => {
              return slots.default!({ node })
            })}
          </div>
        </div>
      )
    }
  }
})
