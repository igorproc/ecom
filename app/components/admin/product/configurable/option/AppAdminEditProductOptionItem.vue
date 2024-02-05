<template>
  <div class="app-admin-edit-product-option-item product-option-item">
    <a-table
      :columns="attributesList"
      :data-source="groupValues.values"
    >
      <template #summary>
        <a-table-summary fixed="bottom">
          <a-table-summary-row>
            <a-table-summary-cell>
              <a-button @click="addNewOption">
                Add New option
              </a-button>
            </a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/api/product/configurable/shred.types'

interface Emits {
  (name: 'addOptionItem', optionGroupId: number): () => void
}

interface Props {
  groupValues: TConfigurableProductOptions
}

const attributesList = [
  {
    title: 'id',
    dataIndex: 'optionId',
    key: 'option-group-ID',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'option-group-label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'dataIndex',
  },
]

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { groupValues } = toRefs(props)

const addNewOption = () => {
  emits('addOptionItem', groupValues.value.optionId)
}
</script>
