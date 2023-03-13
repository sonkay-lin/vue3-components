import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Loading',
  render() {
    return (
      <svg
        class="loading"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          fill="none"
          stroke="currentColor"
          stroke-width="16"
          stroke-linecap="round"
          cx="100"
          cy="100"
          r="92"
          stroke-dasharray="491"
          stroke-dashoffset="246"
        ></circle>
      </svg>
    )
  }
})
