// Composables
import { useSSRWindowSize } from '~/composables/useSSRWisndowSize'
// Consts
import { DEFAULT_BREAKPOINT_SIZES } from '~/const/app'
import type { ComputedRef } from 'vue'

// TO:DO Refactor | Now Deprecated
interface DynamicObject {
  [key: string]: string | number,
}

interface IBreakpointFactoryOptions {
  isMinimalValue?: boolean,
}

export const useWindowResize = (breakpoints?: DynamicObject) => {
  if (!breakpoints) {
    breakpoints = DEFAULT_BREAKPOINT_SIZES
  }

  const breakpointWatchers: {
    [key: string]: ComputedRef<boolean>
  } = {}

  const minimalValue = windowResizeFactory(
    ...Object.entries(breakpoints)[0],
    breakpoints,
    { isMinimalValue: true },
  )
  if (!minimalValue || Array.isArray(minimalValue)) {
    return
  }
  breakpointWatchers[minimalValue.key] = minimalValue.watcher

  for (const [key, value] of Object.entries(breakpoints).slice(1)) {
    const breakpointsWatcher = windowResizeFactory(
      key,
      value,
      breakpoints,
    )

    if (Array.isArray(breakpointsWatcher)) {
      breakpointsWatcher.forEach(item => {
        breakpointWatchers[item.key] = item.watcher
      })
    }
  }

  return breakpointWatchers
}

export const windowResizeFactory = (
  breakpointKey: string,
  breakpointValue: string | number,
  breakpoints: DynamicObject,
  breakpointOptions?: IBreakpointFactoryOptions,
) => {
  const { width } = useSSRWindowSize()

  const getCapitalizedKey = () => {
    return breakpointKey.charAt(0).toUpperCase() + breakpointKey.slice(1)
  }

  const getPrevBreakpoint = () => {
    const currentBreakpointIndex = Object.keys(breakpoints)
      .findIndex(item => item === breakpointKey)

    if (!~currentBreakpointIndex || !breakpoints[currentBreakpointIndex - 1]) {
      return null
    }

    return breakpoints[currentBreakpointIndex - 1]
  }

  if (breakpointOptions?.isMinimalValue) {
    return {
      key: 'only' + getCapitalizedKey(),
      watcher: computed(() => width.value <= Number(breakpointValue)),
    }
  }

  const prevBreakpoint = getPrevBreakpoint()

  if (!prevBreakpoint) {
    return null
  }

  return [
    {
      key: getCapitalizedKey() + 'andDown',
      watcher: computed(() => width.value > Number(prevBreakpoint) && width.value <= Number(breakpointValue)),
    },
    {
      key: getCapitalizedKey() + 'andUp',
      watcher: computed(() => width.value > Number(breakpointValue)),
    },
  ]
}
