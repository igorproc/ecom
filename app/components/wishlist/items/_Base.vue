<template>
  <a-card class="app-wishlist-item --configurable">
    <a-row class="app-wishlist-item__container item-container">
      <a-col :xs="8" :sm="16" :md="3" :xl="3" class="item-container__field --product-name">
        <span class="item-container__field-text-content">
          {{ wishlistItem.productData.name }}
        </span>
      </a-col>
      <a-col :xs="16" :sm="8" :md="6" :xl="5" class="item-container__field">
        <img :src="wishlistItem.productData.productImage" :alt="wishlistItem.productData.name" height="200">
      </a-col>
      <a-col :xs="12" :sm="6" :md="3" class="item-container__field">
        <span class="item-container__field-text-content">
          {{ productPrice }}
        </span>
      </a-col>
      <a-col :xs="12" :sm="6" :md="3" class="item-container__field">
        <span class="item-container__field-text-content">
          Stock Status
        </span>
      </a-col>
      <a-col :xs="0" :sm="6" :md="4" class="item-container__spacer" />
      <a-col :xs="24" :sm="6" :md="5" class="item-container__interactions">
        <AppWishlistItemBaseInteractions
          :product-is-in-cart="productIsAddedToCart"
          :operation-with-cart-is-processing="operationWithCartIsProcessing"
          :operation-with-wishlist-is-processing="operationWithWishlistIsProcessing"
          @product-removed-from-wishlist="removeFromWishlist"
        />
      </a-col>
    </a-row>
  </a-card>
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
  addProductVariant,
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
.app-wishlist-item.--configurable {

  .ant-card-body {
    padding: 0.5rem;
  }

  .app-wishlist-item__container {
    .item-container__field,
    .item-container__interactions {
      padding: 0.25rem;
      width: 100%;
      display: flex;
      align-items: center;
    }

    .item-container__field {
      justify-content: flex-start;
    }

    .item-container__interactions {
      justify-content: center;

      .ant-btn:last-child {
        margin-left: 1rem;
      }
    }
  }

  @media #{map-get($display-breakpoints, 'md')} {
    padding: 0;

    .ant-card-body {
      padding: 1rem;
    }

    .app-wishlist-item__container {
      .item-container__field,
      .item-container__interactions {
        padding: 0.75rem;
      }
    }
  }
}
</style>
