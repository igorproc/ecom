<template>
  <v-dialog
    :model-value="isVisible"
    content-class="app-admin-add-product-modal"
    @update:model-value="onUpdateModel"
  >
    <v-card class="modal__card">
      <v-btn
        icon
        class="card__close-action"
        @click="emits('closeAddProductModal')"
      >
        <Icon icon="gridicons:cross-small" class="action__icon" />
      </v-btn>
      <v-form class="card__add-product-form">
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              v-model="addProductValues.name"
              label="Название"
              type="input"
              placeholder="e.g Kit Cat"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              v-model="addProductValues.price"
              label="Цена (в USD)"
              type="number"
              placeholder="e.g 14"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-select
              v-model="addProductValues.type"
              :items="productTypes"
              item-title="label"
              item-value="value"
              density="compact"
              label="Compact"
            />
          </v-col>
          <v-col cols="12" md="6" lg="12">
            <AppDropzone />
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import AppDropzone from '~/components/common/AppDropzone.vue'

interface Props {
  isVisible: boolean
}
interface Emits {
  (name: 'closeAddProductModal'): void
}

const productTypes: { label: string, value: string }[] = [
  {
    label: 'Стандартный',
    value: 'BASE'
  },
  {
    label: 'Конфигурируемый',
    value: 'CONFIGURABLE'
  }
]

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { isVisible } = toRefs(props)

const addProductValues = reactive({
  name: '',
  price: '',
  type: '',
  image: '',
})

const onUpdateModel = () => {
  emits('closeAddProductModal')
}
</script>

<style lang="scss">
.app-admin-add-product-modal {
  .modal__card {
    padding: 2.5rem;
    position: relative;
    .card__close-action {
      position: absolute;
      top: 0;
      right: 0;
      .action__icon {
        font-size: 22px;
      }
    }
  }
}
</style>