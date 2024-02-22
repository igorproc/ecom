<template>
  <div class="app-product-list-filters product-filters">
    <div class="product-filters__content filters-content">
      <span class="filters-content__count-info">
        {{ productShowsText }}
      </span>
    </div>

    <div class="product-filters__actions filters__actions">
      <div class="filters__actions-show show-action">
        <label
          :for="pageSizeInputId"
          class="show-action__label"
        >
          Show
        </label>
        <input
          :id="pageSizeInputId"
          :value="pageSize"
          type="number"
          placeholder="16"
          class="showcase-action__input"
          @input="throttleChangePageSize"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { useDebounceFn } from '@vueuse/core'

interface Props {
  totalProducts: number,
  currentPage: number,
  pageSize: number,
}

interface Emits {
  (name: 'pageSizeUpdated', pageSize: number ): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { totalProducts, currentPage, pageSize } = toRefs(props)

const pageSizeInputId = useId()

const productShowsText = computed(() => {
  let startShowsProducts = 1
  let endShowsProducts = (currentPage.value + 1) * pageSize.value

  if (currentPage.value) {
    startShowsProducts = currentPage.value * pageSize.value
  }

  if (startShowsProducts > totalProducts.value) {
    startShowsProducts = totalProducts.value
  }
  if (endShowsProducts > totalProducts.value) {
    endShowsProducts = totalProducts.value
  }

  return `Showing ${startShowsProducts}–${endShowsProducts} of ${totalProducts.value} results`
})

const changePageSize = (e: Event) => {
  if (!e.target) {
    return
  }

  const target = e.target as HTMLInputElement
  emit('pageSizeUpdated', Number(target?.value) || 16)
}

const throttleChangePageSize = useDebounceFn((e: Event) => {
  changePageSize(e)
})
</script>

<style lang="scss">
.app-product-list-filters {
  padding: 10rem 15rem;
  background-color: map-get($theme-colors, 'surface-color');
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10rem;

  .product-filters__content {
    .filters-content__count-info {
      font-weight: bold;
    }
  }

  .product-filters__actions {
    .filters__actions-show {
      .show-action__label {
        font-size: 20rem;
      }

      .showcase-action__input {
        margin-left: 7rem;
        padding: 12rem 13rem;
        width: 50rem;
        background-color: map-get($theme-colors, 'background-color');
        font-size: 20rem;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    align-items: center;
    flex-direction: row;
  }

  @media #{map-get($display-rules, 'xl')} {
    padding: 35rem 65rem;
  }
}
</style>
