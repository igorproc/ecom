// Node Deps
import { useWindowSize } from '@vueuse/core'
// Consts
import { DISPLAY_BREAKPOINTS } from '~/const/vuesax'

export const useWindowResize = () => {
  if (!window) {
    return
  }

  const { width } = useWindowSize()
  const resizeConditions = reactive({
    lgAndDown: false,
    mdAndDown: false,
    mdAndUp: false,
  })

  const setResizeConditions = (width: number) => {
    resizeConditions.lgAndDown = width <= DISPLAY_BREAKPOINTS.lg
    resizeConditions.mdAndDown = width <= DISPLAY_BREAKPOINTS.md
    resizeConditions.mdAndUp = width >= DISPLAY_BREAKPOINTS.md
  }
  setResizeConditions(width.value)

  watch(width, newWidth => {
    setResizeConditions(newWidth)
  })

  return Object.assign(resizeConditions, { width })
}
