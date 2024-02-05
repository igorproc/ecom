<template>
  <div class="app-wishlist-item --base">
    <a-row class="app-wishlist-item__container item-container">
      <a-col :xs="3" :sm="1" class="item-container__field">
        {{ wishlistItem.productData.name }}
      </a-col>
      <a-col :xs="2" :sm="1" class="item-container__field">
        <img
          :src="wishlistItem.productData.productImage"
          :alt="wishlistItem.productData.name"
          height="200"
        >
      </a-col>
      <a-col :xs="2" :sm="1" class="item-container__field">
        {{ productPrice }}
      </a-col>
      <a-col :xs="2" :sm="2" class="item-container__field">
        {{ wishlistItem.productData.__typename }}
      </a-col>
      <a-col :xs="3" :sm="5" class="item-container__interactions">
        <AppWishlistItemBaseInteractions
          :product-is-in-cart="productIsAddedToCart"
          :operation-with-cart-is-processing="operationWithCartIsProcessing"
          :operation-with-wishlist-is-processing="operationWithWishlistIsProcessing"
          @product-removed-from-wishlist="removeFromWishlist"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
// Components
import AppWishlistItemBaseInteractions from '~/components/wishlist/items/Interactions.vue'
// Composables
import { useProduct } from '~/composables/useProduct'
// Utils
import { formattedPrice } from '~/utils/getCurrencyFormat.util'
// Types & Interfaces
import type { TWishlistProduct } from '~/api/user/wishlist/wishlistProducts'

interface Props {
  wishlistItem: TWishlistProduct
}

const props = defineProps<Props>()

const {
  operationWithWishlistIsProcessing,
  operationWithCartIsProcessing,
  productIsAddedToCart,
  addToCart,
  removeFromCart,
  removeFromWishlist,
} = useProduct(props.wishlistItem.productData.pid)

const productPrice = computed(() => formattedPrice(props.wishlistItem.productData.price))
const addProductToCart = async () => {
  if (!productIsAddedToCart.value) {
    addToCart()
    return
  }
  removeFromCart()
}
</script>

<style lang="scss">
.app-wishlist-item.--base {
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
