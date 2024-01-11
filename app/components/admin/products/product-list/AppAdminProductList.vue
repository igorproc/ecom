<template>
  <vs-table>
    <template #thead>
      <vs-tr>
        <vs-th
          v-for="item in attributesList"
          :key="item"
          class="text-left"
        >
          {{ item }}
        </vs-th>
      </vs-tr>
    </template>
    <template v-if="productList && productList.length" #tbody>
      <AppAdminProductListItem
        v-for="item in productList"
        :key="item.pid"
        :product-item="item"
      />
    </template>
  </vs-table>
</template>

<script setup lang="ts">
// Components
import AppAdminProductListItem from '~/components/admin/products/product-list/AppAdminProductListItem.vue'
// Types & Interfaces
import type { TProduct } from '~/types/api'

interface Props {
  productList: TProduct[] | null
}

const attributesList: string[] = ['Название', 'Цена', 'Тип', 'Изображение']

const props = defineProps<Props>()
const { productList } = toRefs(props)
</script>
