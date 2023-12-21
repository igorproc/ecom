<template>
  <vs-tr :data="productItem">
    <vs-td>{{ productItem.name }}</vs-td>
    <vs-td>{{ formattedPrice(productItem.price) }}</vs-td>
    <vs-td>{{ productItem.__typename }}</vs-td>
    <vs-td>
      <img
        v-if="productItem.productImage"
        :src="productItem.productImage"
        :alt="productItem.name"
        height="80"
      >
      <span v-else>
        Изображения нету
      </span>
    </vs-td>

    <template #expand>
      <NuxtLink
        :to="{
          name: 'admin-product-productId',
          params: { productId: productItem.pid }
        }"
      >
        На страницу редактирования продукта
      </NuxtLink>
    </template>
  </vs-tr>
</template>

<script setup lang="ts">
// Ui Components
import { VsTd, VsTr } from 'vuesax-alpha'
// Types & Interfaces
import { TProduct } from '~/types/api'
// Util
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

interface Props {
  productItem: TProduct
}

const props = defineProps<Props>()
const { productItem } = toRefs(props)
</script>
