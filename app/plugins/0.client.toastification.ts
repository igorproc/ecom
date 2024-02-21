// Node Deps
import Toast from 'vue-toastification'
// Types & Interfaces
import type { PluginOptions } from 'vue-toastification'

const options: PluginOptions = {
  containerClassName: 'ui-toast',
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, options)
})
