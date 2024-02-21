import type { Directive } from 'vue'

export default {
  mounted: (el: HTMLElement, binding) => {
    el.addEventListener('mouseenter', () => binding.value(true))
    el.addEventListener('mouseleave', () => binding.value(false))
  },
  beforeUnmount: (el: HTMLElement, binding) => {
    el.removeEventListener('mouseenter', binding.value)
    el.removeEventListener('mouseleave', binding.value)
  }
} as Directive
