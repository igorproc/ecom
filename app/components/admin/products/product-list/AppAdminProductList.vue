<template>
  <a-table
    :dataSource="productList"
    :columns="attributesList"
    class="app-admin-product-list admin-product-list"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'product-image'">
        <img
          v-if="record.productImage"
          width="96"
          :alt="record.name"
          :src="record.productImage"
        >
        <a-skeleton-image v-else />
      </template>

      <template v-else-if="column.key === 'product-type'">
        <a-tag :key="record.name" color="geekblue" class="admin-product-list__text">
          {{ record.typename }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'product-name'">
        <NuxtLink
          :to="{
            name: 'admin-product-productId',
            params: { productId: record.pid }
          }"
          class="admin-product-list__text"
        >
          {{ record.name }}
        </NuxtLink>
      </template>

      <template v-else>
        <span class="admin-product-list__text">
          {{ formattedPrice(record.price) }}
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TProduct } from '~/api/product/shared.types'
import { formattedPrice } from '~/utils/getCurrencyFormat.util'

interface Props {
  productList: TProduct[]
}

type TTableColumns = {
  title: string,
  dataIndex: string,
  key: string,
}

const attributesList: TTableColumns[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'product-name'
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'product-price'
  },
  {
    title: 'Тип',
    dataIndex: '__typename',
    key: 'product-type'
  },
  {
    title: 'Изображение',
    dataIndex: 'productImage',
    key: 'product-image'
  }
]

const props = defineProps<Props>()
const { productList } = toRefs(props)
</script>

<style lang="scss">
.app-admin-product-list {
  .ant-table-cell {
    position: relative;

    .admin-product-list__text {
      position: absolute;
    }
  }
}
</style>
