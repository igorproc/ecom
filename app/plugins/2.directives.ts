import HoverDirective from '~/directives/hover.directive'

export default defineNuxtPlugin(nuxtApp => {
  const directivesList = [
    {
      label: 'hover',
      directive: HoverDirective,
    },
  ]

  directivesList.forEach(item => {
    nuxtApp
      .vueApp
      .directive(
        item.label,
        item.directive,
      )
  })
})
