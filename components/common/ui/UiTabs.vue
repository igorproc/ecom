<template>
  <div class="ui-tabs">
    <ul class="ui-tabs__header">
      <vs-button
        v-for="tabTitle in tabTitles"
        :key="tabTitle"
        type="relief"
        :active="selectedTitle === tabTitle"
        class="ui-tabs__item"
        @click="selectedTitle = tabTitle"
      >
        {{ tabTitle }}
      </vs-button>
      <slot name="header-append" />
    </ul>
    <slot />
  </div>
</template>

<script setup>
// Node Deps
import { useSlots, ref, provide } from 'vue'
// Ui Components
import {
  VsButton,
} from 'vuesax-alpha'

const slots = useSlots()

const tabTitles = ref([])
slots.default().map(tabWrapper => {
  tabWrapper.children.map(item => {
    if (!item.props.title) {
      return
    }

    tabTitles.value.push(item.props.title)
  })
})
const selectedTitle = ref(tabTitles.value[0].title)

provide('selectedTitle', tabTitles.value.length && selectedTitle ? selectedTitle : '')
</script>

<style lang="scss">
.ui-tabs {
  .ui-tabs__header {
    min-height: calc(100% + 1rem);
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }

  .ui-tabs__content {
    padding: 0.5rem;
  }
}
</style>
