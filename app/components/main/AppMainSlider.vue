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
      <div class="item__content">
        <h5 class="item__content-title">
          {{ slide.title }}
        </h5>
        <h3 v-if="slide.subtitle" class="item__content-subtitle">
          {{ slide.subtitle }}
        </h3>
        <span v-if="slide.description" class="item__content-description">
          {{ slide.description }}
        </span>

        <button
          aria-label="slider-offer-action"
          class="item__content-action action"
          @click="getAction(slide.action)"
        >
          <span class="action__label">
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

  return () => {
  }
}
</script>

<style lang="scss">
.app-main-offers-slider {
  position: relative;

  .offers-slider__item {
    height: 400rem;

    .item__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item__content {
      max-width: 200rem;
      padding: 20rem 15rem;
      background-color: #fff3e3;
      position: absolute;
      top: 5%;
      right: 0;
      display: flex;
      flex-direction: column;
      border-radius: 0.375rem;

      .item__content-title {
        font-family: $poppins-font-family;
        color: map-get($theme-colors, 'primary-color');
        font-size: 14rem;
        font-weight: bold;
      }

      .item__content-subtitle {
        font-family: $poppins-font-family;
        color: map-get($theme-colors, 'accent-color');
        font-size: 18rem;
        font-weight: bold;
      }

      .item__content-description {
        font-family: $poppins-font-family;
        color: map-get($theme-colors, 'primary-color');
        font-size: 8rem;
        font-weight: bold;
      }

      .item__content-action {
        padding: 3rem 5rem;
        max-width: 50%;
        background-color: map-get($theme-colors, 'accent-color');
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-end;
        cursor: pointer;
        border: none;

        .action__label {
          font-family: $poppins-font-family;
          color: map-get($theme-colors, 'background-color');
          font-size: 8rem;
        }
      }
    }

    @media #{map-get($display-rules, 'md')} {
      height: 450rem;

      .item__content {
        max-width: 30%;
        padding: 25rem 30rem;

        .item__content-title {
          font-size: 18rem;
        }

        .item__content-subtitle {
          font-size: 24rem;
        }

        .item__content-description {
          font-size: 14rem;
          font-weight: normal;
        }

        .item__content-action {
          padding: 7rem 10rem;

          .action__label {
            font-size: 10rem;
          }
        }
      }
    }

    @media #{map-get($display-rules, 'xl')} {
      height: 717rem;

      .item__content {
        padding: 62rem 43rem 37rem 39rem;
        max-width: unset;
        width: 548rem;
        height: 331rem;
        right: 60rem;

        .item__content-title {
          font-size: 16rem;
        }

        .item__content-subtitle {
          margin-top: 4rem;
          font-size: 52rem;
        }

        .item__content-description {
          margin-top: 10rem;
          font-size: 18rem;
          font-weight: bold;
        }

        .item__content-action {
          margin-top: 17rem;
          padding: 25rem 72rem;

          .action__label {
            font-size: 16rem;
          }
        }
      }
    }
  }
}
</style>
