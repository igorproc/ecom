<template>
  <swiper
    :autoplay="{ delay: 3000 }"
    class="app-main-offers-slider offers-slider"
  >
    <swiper-slide
      v-for="slide in items"
      :key="slide.id"
      class="offers-slider__item item"
    >
      <img
        v-if="slide?.image"
        :src="slide.image"
        :alt="slide.title"
        class="item__image"
      >
      <div class="item__inner">
        <h5 class="item__title">
          {{ slide.title }}
        </h5>
        <h3 v-if="slide.subtitle" class="item__subtitle">
          {{ slide.subtitle }}
        </h3>
        <span v-if="slide.description" class="item__description">
          {{ slide.description }}
        </span>
        <button
          aria-label="slider-action"
          class="item__action"
          @click="getAction(slide.action)"
        >
          <span class="item__action-label">
            {{ slide.action.actionTitle }}
          </span>
        </button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
interface IOfferItemAction {
  actionTitle: string,
  isLink: boolean,
  link?: string,
  action?: () => Promise<void> | void
}

type TOfferItem = {
  id: number,
  title: string,
  subtitle?: string,
  description?: string,
  image: string,
  action: IOfferItemAction,
}

const items: TOfferItem[] = [
  {
    id: 1,
    title: 'New Arrival',
    subtitle: 'Discover Our \nNew Collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
    image: 'offers/slider-1.jpg',
    action: {
      actionTitle: 'buy now',
      isLink: true,
      link: 'products',
    },
  },
  {
    id: 1,
    title: 'New Arrival',
    subtitle: 'Discover Our \nNew Collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
    image: 'offers/slider-1.jpg',
    action: {
      actionTitle: 'buy now',
      isLink: true,
      link: 'products/adidas',
    },
  },
]

const router = useRouter()

const getAction = async (actionData: IOfferItemAction) => {
  if (actionData.isLink && actionData.link) {
    return await router.push(actionData.link)
  }

  if ('action' in actionData) {
    return actionData.action
  }

  return () => {}
}
</script>

<style lang="scss">
.app-main-offers-slider {
  position: relative;

  .offers-slider__item {
    height: 600px;

    .item__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item__inner {
      padding: 2rem;
      max-width: 60%;
      background-color: #FFF3E3;
      position: absolute;
      top: 25%;
      right: 5%;
      display: flex;
      flex-direction: column;
      border-radius: 0.375rem;

      .item__title {
        font-size: 1rem;
        font-weight: bold;
      }

      .item__subtitle {
        margin: 0.25rem 0 0.5rem;
      }

      .item__description {
        color: rgb(51, 51, 51);
      }

      .item__action {
        padding: 0.45rem 0.7rem;
        margin-top: 0.5rem;
        max-width: 50%;
        background-color: rgb(184, 142, 47);;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-end;
        cursor: pointer;
        border: none;

        .item__action-label {
          color: #fff;
        }
      }
    }
  }

  @media #{map-get($display-breakpoints, 'md')} {
    .offers-slider__item {
      height: 600px;

      .item__inner {
        max-width: 40%;

        .item__action {
          padding: 1rem 1.5rem;

          .item__action-label {
            font-size: 1rem;
            font-weight: bold;
          }
        }
      }
    }
  }

  @media #{map-get($display-breakpoints, 'xxl')} {
    .offers-slider__item {
      height: 800px;

      .item__inner {
        max-width: 30%;
        right: 1rem;
      }
    }
  }
}
</style>
