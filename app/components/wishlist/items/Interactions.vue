<template>
  <div class="app-wishlist-item__interactions">
    <a-button
      type="text"
      :loading="operationWithWishlistIsProcessing"
      @click="emit('productRemovedFromWishlist')"
    >
      <HeartFilled />
    </a-button>
    <a-button
      type="text"
      :loading="operationWithCartIsProcessing"
    >
      <ShoppingCartOutlined />
    </a-button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  productIsInCart: boolean,
  operationWithWishlistIsProcessing: boolean,
  operationWithCartIsProcessing: boolean,
}

interface Emits {
  (name: 'productRemovedFromWishlist'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style lang="scss">
.app-wishlist-item__interactions {
  display: flex;
  align-items: center;

  .ant-btn:first-child {
    margin-left: 0.5rem;
  }
}
</style>
