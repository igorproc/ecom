<template>
  <div
    v-hover="hoverCard"
    class="ui-card"
  >
    <div class="ui-card__image">
      <slot name="cover" />
    </div>

    <div class="ui-card__content content">
      <h3 class="content__title">
        {{ title }}
      </h3>

      <h5 v-if="subtitle" class="content__subtitle">
        {{ subtitle }}
      </h5>

      <div class="content__expand">
        <slot name="content-expand" />
      </div>
    </div>

    <div
      v-if="hoverable"
      v-show="cardIsHovering"
      class="ui-card__hover hover"
    >
      <slot name="hover-effect" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  title: string,
  subtitle?: string,
}

const props =  withDefaults(
  defineProps<Props>(),
  {
    hoverable: false
  }
)

const cardIsHovering = ref(false)

const hoverCard = (value: boolean) => {
  if (!props.hoverable) {
    return
  }

  cardIsHovering.value = value
}
</script>

<style lang="scss">
.ui-card {
  width: 100%;
  position: relative;

  &__hover {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: brightness(0.25);
  }

  &__content {
    padding: 8rem 12rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3rem;

    background-color: map-get($white-color-palette, 'white-5');

    .content__title {
      font-size: 18rem;
      color: map-get($black-color-palette, 'black-5');
      font-weight: bold;
    }

    .content__subtitle {
      font-size: 16rem;
      color: map-get($gray-color-palette, 'gray-2');
      font-weight: bold;
    }

    .content__expand {
      width: 100%;
    }
  }

  @media #{map-get($display-rules, 'md')} {
    width: 310rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    width: 285rem;

    &__content {
      padding: 16rem 20rem;
      gap: unset;

      .content__title {
        font-size: 20rem;
        font-weight: bold;
      }

      .content__subtitle {
        margin-top: 8rem;
        font-size: 14rem;
      }

      .content__expand {
        margin-top: 8rem;
      }
    }
  }
}
</style>
