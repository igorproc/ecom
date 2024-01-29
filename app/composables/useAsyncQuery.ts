// Node Deps
import axios from 'axios'
// Pinia Stores
import { useNotificationStore } from '~/store/notification'
// Composables
import { useServerOnly } from '~/composables/useServerOnly'
import { useClientOnly } from '~/composables/useClientOnly'
// Types & Interfaces
import type { AxiosInstance, AxiosResponse, Method } from 'axios'
import type { TResponseError } from '~/api/shared.types'

type TResponseInterceptor = AxiosResponse<unknown, unknown> | Promise<AxiosResponse<unknown, unknown>>

export const useAsyncQuery = () => {
  const runtimeConfig = useRuntimeConfig()

  const isCreated = ref(false)
  const apiUrl = ref(runtimeConfig.public.apiUrl)
  const requestInstance = ref<AxiosInstance | null>(null)

  const showError = (errorMessage: string) => {
    useClientOnly(() => {
      const notificationStore = useNotificationStore()
      notificationStore.openErrorNotification(errorMessage)
    })
  }
  const getApiUrl = (path: string) => {
    if (runtimeConfig.public.proxyEnabled) {
      if (import.meta.server) {
        return process.env.API_URL + path.replace('/api', '')
      }
      return path
    }

    return apiUrl + path.replace('/api', '')
  }
  const createInstance = () => {
    requestInstance.value = axios.create()

    requestInstance.value.defaults.baseURL = apiUrl.value

    requestInstance.value.interceptors.response.use(
      (response: TResponseInterceptor) => response,
      (error: Error) => {
        showError(error.message)
        return Promise.reject(error)
      },
    )

    requestInstance.value.defaults.headers.head = {
      'Content-Type': 'application/json',
    }
  }

  if (!isCreated.value || !requestInstance.value) {
    createInstance()
  }

  return async <T>(
    method: Method,
    url: string,
    payload?: unknown,
  ): Promise<T | null> => {
    type TAxiosResponse = T | TResponseError
    const requestUrl = getApiUrl(url)

    return new Promise(async resolve => {
      const response = await axios.request<TAxiosResponse>({
        method,
        url: requestUrl,
        data: payload,
      })

      if (
        response.data &&
        typeof response.data === 'object' &&
        'error' in response.data
      ) {
        showError(response.data.error.message)
        resolve(null)
      }

      resolve(response.data as T)
    })
  }
}
