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
import {
  VsTable,
  VsTr,
  VsTh,
} from 'vuesax-alpha'

import { TProduct } from '~/types/api'
import AppAdminProductListItem from '~/components/admin/products/product-list/AppAdminProductListItem.vue'

interface Props {
  productList: TProduct[] | null
}

const attributesList: string[] = ['Название', 'Цена', 'Тип', 'Изображение']

const props = defineProps<Props>()
const { productList } = toRefs(props)
</script>
