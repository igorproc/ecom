// Node Deps
import axios from 'axios'
import type { AxiosInstance, Method } from 'axios'
import { effect } from 'vue'
import consola from 'consola'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'

export const useAsyncQuery = () => {
  const runtimeConfig = useRuntimeConfig()
  const notificationStore = useNotificationStore()

  const apiUrl = ref(runtimeConfig.public.apiUrl)
  const requestInstance = ref<AxiosInstance | null>(null)

  const showError = (errorMessage: string) => {
    useClientOnly(() => {
      notificationStore.openErrorNotification(errorMessage)
    })

    useServerOnly(() => {
      consola.error(errorMessage)
    })
  }

  const getApiUrl = (path: string) => {
    if (runtimeConfig.public.proxyEnabled) {
      return import.meta.server ?
        process.env.API_URL + path.replace('/api', '') :
        path
    }

    return runtimeConfig.public.apiUrl + path.replace('/api', '')
  }

  const createInstance = () => {
    const instance = axios.create()

    instance.defaults.baseURL = apiUrl.value
    instance.interceptors.response.use(
      response => response,
      error => showError(error.message),
    )
    instance.defaults.headers['Content-Type'] = 'application/json'

    return instance
  }

  effect(() => {
    if (!requestInstance.value) {
      requestInstance.value = createInstance()
    }
  })

  return async <T>(method: Method, url: string, payload?: unknown): Promise<T | null> => {
    const requestUrl = getApiUrl(url)
    if (!requestInstance.value) {
      return null
    }

    try {
      const response = await requestInstance
        .value
        .request({
          method,
          url: requestUrl,
          data: payload,
        })

      return response.data as T
    } catch (error) {
      showError((error as Error).message ?? 'An error occurred')
      return null
    }
  }
}
