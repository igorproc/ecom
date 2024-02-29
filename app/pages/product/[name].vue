<template>
  <div class="app-product-page">
    <h1>
      Hello World
    </h1>
    <h2>
      {{ data }}
    </h2>
  </div>
</template>

<script setup lang="ts">
// Api Methods
import { getProductData } from '~/api/product/getProductData'

const route = useRoute()
const router = useRouter()

const onLoad = async () => {
  const productName = route.params.name

  if (typeof productName !== 'string' || Array.isArray(route.params.name)) {
    await router.push({ name: '404' })
    return null
  }

  return await getProductData(productName)
}

const { data } = useLazyAsyncData(
  `product-page-${route.params.name}`,
  async () => await onLoad()
)
</script>
