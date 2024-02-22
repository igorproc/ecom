<template>
  <div class="ui-pagination">
    <button
      v-for="item in items"
      :key="item?.id || generateRandomId()"
      :class="{ '--is-active': item.value === currentPage }"
      aria-label="Route to selected page"
      class="ui-pagination__item item"
      @click="selectPage(item.value)"
    >
      <span class="item__label">
        {{ item.text }}
      </span>
    </button>

    <button
      class="ui-pagination__item item --next-page"
      aria-label="Route to next page"
      @click="nextPage"
    >
      <span class="item__label">
        next
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface IPaginationItem {
  id?: string,
  text: string,
  value: number,
}

interface Props {
  items: IPaginationItem[],
  totalPages: number,
  currentPage: number,
  prevPageAction?: boolean,
  nextPageAction?: boolean
}

interface Emits {
  (name: 'update:currentPage', currentPage: number): void,
}

const props = withDefaults(
  defineProps<Props>(),
  {
    prevPageAction: false,
    nextPageAction: false,
  },
)
const emit = defineEmits<Emits>()

const generateRandomId = () => {
  return Date.now().toString(32).slice(0, 5) + Math.random().toString(32)
}

const selectPage = (value: number) => {
  emit('update:currentPage', value)
}
const nextPage = () => {
  if (props.currentPage >= props.totalPages) {
    return
  }

  emit('update:currentPage', props.currentPage + 1)
}
</script>

<style lang="scss">
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
  }

  @media #{map-get($display-rules, 'xl')} {
    gap: 38rem;
  }
}
</style>
