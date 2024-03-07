<template>
  <div class="app-personality-slider personality-slider">
    <h1 class="personality-slider__title">
      Partner Brands
    </h1>

    <div class="personality-slider__wrapper wrapper">
      <Flicking
        hide-before-init
        :options="{ align: 'prev', circular: true,  }"
        class="wrapper__slider"
      >
        <nuxt-link
          v-for="brand in data"
          :key="brand.bid"
          :to="{ name: 'products', query: { brand: brand.name } }"
          class="wrapper__slider-item slider-item"
        >
          <ui-image
            :alt="brand.name"
            :src="brand.imageUrl"
            class="slider-item__image"
          />
          <span class="slider-item__title">
            {{ brand.name }}
          </span>
        </nuxt-link>
      </Flicking>
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { useLazyAsyncData } from '#app'
// Api Methods
import { getBrandList } from '~/api/product/brand/getBrandList'

const { data } = useLazyAsyncData(
  'app-personality-list',
  async () => await getBrandList(1, 20),
)
</script>

<style lang="scss">
.app-personality-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .personality-slider {
    &__wrapper {
      width: 100%;

      .slider-item {
        padding: 15rem 20rem;
        text-decoration: unset;
        color: map-get($theme-colors, 'primary-color');

        &__image {
          width: 180rem;
          height: 80rem;
          margin-bottom: 12rem;
        }

        &__title {
          font-weight: bold;
          font-size: 16rem;
        }
      }
    }
  }
}
</style>
