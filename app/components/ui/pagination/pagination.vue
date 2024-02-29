<template>
  <div class="ui-pagination">
    <button
      v-if="prevPageAction"
      :class="{ '--is-disabled':  (currentPage === 1) || disabled }"
      aria-label="Route to next page"
      class="ui-pagination__item item --prev-page"
      @click="prevPage"
    >
      <span class="item__label">
        prev
      </span>
    </button>

    <button
      v-for="item in paginationItems"
      :key="item?.id || generateRandomId()"
      :class="{ '--is-active': item.value === currentPage, '--is-disabled': disabled }"
      aria-label="Route to selected page"
      class="ui-pagination__item item"
      @click="selectPage(item.value)"
    >
      <span class="item__label">
        {{ item.text }}
      </span>
    </button>

    <button
      v-if="nextPageAction"
      :class="{ '--is-disabled': (currentPage === totalPages) || disabled }"
      aria-label="Route to next page"
      class="ui-pagination__item item --next-page"
      @click="nextPage"
    >
      <span class="item__label">
        next
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
// Util
import { getDefaultPagination } from '~/utils/getTotalPages.util'
import { generateRandomId } from '~/utils/generate.util'
// Types & Interfaces
import type { IPaginationItem } from '~/utils/getTotalPages.util'

interface Props {
  items?: IPaginationItem[],
  disabled?: boolean,
  totalPages: number,
  currentPage: number,
  prevPageAction?: boolean,
  nextPageAction?: boolean,
}

interface Emits {
  (name: 'update:currentPage', currentPage: number): void,
}

const props = withDefaults(
  defineProps<Props>(),
  {
    disabled: false,
    prevPageAction: false,
    nextPageAction: false,
  },
)
const emit = defineEmits<Emits>()

const paginationItems = computed(() => {
  if (props.items) {
    return props.items
  }

  return getDefaultPagination(props.totalPages, props.currentPage)
})
const selectPage = (value: number) => {
  if (props.currentPage === value || props.disabled) {
    return
  }

  emit('update:currentPage', value)
}
const nextPage = () => {
  if (props.currentPage >= props.totalPages || props.disabled) {
    return
  }

  emit('update:currentPage', props.currentPage + 1)
}
const prevPage = () => {
  if (props.currentPage === 1 || props.disabled) {
    return
  }

  emit('update:currentPage', props.currentPage - 1)
}
</script>

<style lang="scss" scoped>
.ui-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 8rem;

  .ui-pagination__item {
    padding: 15rem 22rem;
    border-radius: 10rem;
    background-color: map-get($theme-colors, 'surface-color');

    .item__label {
      font-weight: bold;
    }

    &.--is-active {
      background-color: map-get($theme-colors, 'accent-color');
    }

    &.--is-disabled {
      cursor: default;
    }
  }

  @media #{map-get($display-rules, 'xl')} {
    gap: 38rem;
  }
}
</style>
