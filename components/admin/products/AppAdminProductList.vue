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
    <template #tbody>
      <vs-tr
        v-if="productList && productList.length"
        v-for="item in productList"
        :key="item.pid"
      >
        <vs-td>{{ item.name }}</vs-td>
        <vs-td>{{ item.price }}</vs-td>
        <vs-td>{{ item.__typename }}</vs-td>
        <vs-td>
          <span v-if="item.productImage">{{ item.productImage }}</span>
          <span v-else>Изображения нету</span>
        </vs-td>

        <template v-if="item.__typename === 'CONFIGURABLE'" #expand>
          {{ item }}
        </template>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script setup lang="ts">
import {
  VsTable,
  VsTr,
  VsTh,
  VsTd,
  VsButton
} from 'vuesax-alpha'

import { TProduct } from '~/types/api'

interface Props {
  productList: TProduct[] | null
}

const attributesList: string[] = ['Название', 'Цена', 'Тип', 'Изображение']

const props = defineProps<Props>()
const { productList } = toRefs(props)
</script>
