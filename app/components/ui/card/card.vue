<template>
  <div
    v-hover="hoverCard"
    class="ui-card"
    @click="emit('clickCard')"
  >
    <component
      :is="link ? nuxtLinkComponent : 'div'"
      :to="link"
      class="ui-card__container card-container"
    >
      <div class="ui-card__image card-container__image">
        <slot name="cover" />
      </div>

      <div class="ui-card__content card-container__content">
        <h3 class="card-container__content-title">
          {{ title }}
        </h3>

        <h5 v-if="subtitle" class="card-container__content-subtitle">
          {{ subtitle }}
        </h5>

        <div class="card-container__content-expand">
          <slot name="content-expand" />
        </div>
      </div>

      <div
        v-if="hoverable"
        v-show="cardIsHovering"
        class="card-container__hover hover"
      >
        <slot name="hover-effect" />
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { NuxtLinkProps } from '#app'

interface Props {
  hoverable?: boolean
  title: string,
  subtitle?: string,
  link?: NuxtLinkProps['to']
}

interface Emits {
  (name: 'clickCard'): void
}

const nuxtLinkComponent = defineAsyncComponent(() => import('#app/components/nuxt-link'))
const props = withDefaults(
  defineProps<Props>(),
  {
    hoverable: false,
  },
)
const emit = defineEmits<Emits>()

const cardIsHovering = ref(false)

const hoverCard = (value: boolean) => {
  if (!props.hoverable) {
    return
  }

  cardIsHovering.value = value
}
</script>

<style lang="scss" scoped>
.ui-card {
  width: 100%;

  .ui-card__container {
    color: map-get($theme-colors, 'primary-color');
    text-decoration: none;
    position: relative;

    .card-container {
      &__content {
        padding: 8rem 12rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 3rem;

        background-color: map-get($white-color-palette, 'white-5');

        &-title {
          font-size: 18rem;
          color: map-get($black-color-palette, 'black-5');
          font-weight: bold;
        }

        &-subtitle {
          font-size: 16rem;
          color: map-get($gray-color-palette, 'gray-2');
          font-weight: bold;
        }

        &-expand {
          width: 100%;
        }
      }

      &__hover {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: brightness(0.5);
      }
    }
  }

  @media #{map-get($display-rules, 'md')} {
    width: 310rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    width: 285rem;

    .card-container {
      &__content {
        padding: 16rem 20rem;
        gap: unset;

        &-title {
          font-size: 20rem;
          font-weight: bold;
        }

        &-subtitle {
          margin-top: 8rem;
          font-size: 14rem;
        }

        &-expand {
          margin-top: 8rem;
        }
      }
    }
  }
}
</style>
