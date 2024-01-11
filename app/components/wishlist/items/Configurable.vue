<template>
  <div class="app-wishlist-item --configurable">
    <vs-row class="app-wishlist-item__container item-container">
      <vs-col
        :xs="3"
        :sm="1"
        class="item-container__field"
      >
        <span class="item-container__field-text-content">
          {{ wishlistItem.name }}
        </span>
      </vs-col>
      <vs-col
        :xs="2"
        :sm="1"
        class="item-container__field"
      >
        <img :src="productImage" :alt="wishlistItem.name">
      </vs-col>
      <vs-col
        :xs="2"
        :sm="1"
        :push="pushFields"
        class="item-container__field"
      >
        <span class="item-container__field-text-content">
          {{ productPrice }}
        </span>
      </vs-col>
      <vs-col
        :xs="2"
        :sm="2"
        :push="pushFields"
        class="item-container__field"
      >
        <span class="item-container__field-text-content">
          {{ wishlistItem.__typename }}
        </span>
      </vs-col>
      <vs-col
        :xs="3"
        :sm="5"
        :push="pushInteractions"
        class="item-container__interactions"
      >
        <vs-button
          :loading="operationWithWishlistIsProcessing"
          icon
          @click="removeFromWishlist"
        >
          <HeartFilled />
        </vs-button>
        <vs-button
          :loading="operationWithCartIsProcessing"
          :color="productIsAddedToCart ? 'danger' : 'success'"
          icon
          @click="addProductToCart"
        >
          <ShoppingCartOutlined />
        </vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script setup lang="ts">
// Coomposables
import { useWindowResize } from '~/composables/useWindowResize'
import { useProduct } from '~/composables/useProduct'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TWishlistProduct } from '~/types/api'

interface Props {
  wishlistItem: TWishlistProduct
}

const windowResize = useWindowResize()
const props = defineProps<Props>()
const { wishlistItem } = toRefs(props)
const {
  operationWithWishlistIsProcessing,
  operationWithCartIsProcessing,
  productIsAddedToCart,
  addToCart,
  removeFromCart,
  removeFromWishlist,
  addProductVariant,
} = useProduct(wishlistItem.value.pid)
addProductVariant(wishlistItem.value.selectedVariant)

const productPrice = computed(() => formattedPrice(wishlistItem.value.price))
const productImage = computed(() => {
  if (!wishlistItem.value.selectedVariant || !wishlistItem.value.productVariants) {
    return wishlistItem.value.productImage
  }

  const variantCandidate = wishlistItem.value.productVariants
    .find(productVariant => productVariant.product.id === wishlistItem.value.selectedVariant)
  if (!variantCandidate || !variantCandidate.product.imageUrl) {
    return wishlistItem.value.productImage
  }
  return variantCandidate.product.imageUrl
})
const pushFields = computed(() => windowResize?.lgAndDown ? 0 : 1)
const pushInteractions = computed(() => windowResize?.lgAndDown ? 0 : 2)

const addProductToCart = async () => {
  if (!productIsAddedToCart.value) {
    addToCart()
    return
  }
  removeFromCart()
}
</script>

<style lang="scss">
.app-wishlist-item.--configurable {
  padding: 0.75rem;

  .app-wishlist-item__container {
    .item-container__field,
    .item-container__interactions {
      padding: 0.25rem;
      display: flex;
      align-items: center;
    }

    .item-container__field {
      justify-content: flex-start;

      .item-container__field-text-content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .item-container__interactions {
      justify-content: flex-end;
    }
  }

  @media #{map-get($display-breakpoints, 'md')} {
    padding: 0;
    .app-wishlist-item__container {
      .item-container__field,
      .item-container__interactions {
        padding: 0.75rem;
      }
    }
  }
}
</style>
