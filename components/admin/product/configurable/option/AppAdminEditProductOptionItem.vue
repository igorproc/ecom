<template>
  <div class="app-admin-edit-product-option-item product-option-item">
    <vs-table>
      <template #header>
        <vs-button @click="emits('addOptionItem', groupValues.optionId)">
          Add new item
        </vs-button>
      </template>
      <template #thead>
        <vs-tr>
          <vs-th v-for="item in attributesList" :key="item">
            {{ item }}
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="attribute in groupValues.values"
          :key="attribute.optionId"
          :data="attribute"
        >
          <vs-td>
            {{ attribute.optionId }}
          </vs-td>
          <vs-td edit>
            {{ attribute.label }}
          </vs-td>
          <vs-td edit>
            {{ attribute.value }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script setup lang="ts">
// Ui Components
import { VsTable, VsTr, VsTd, VsTh, VsButton } from 'vuesax-alpha'
// Types & Interfaces
import type { TConfigurableProductOptions } from '~/types/api'

interface Emits {
  (name: 'addOptionItem', optionGroupId: number): () => void
}
interface Props {
  groupValues: TConfigurableProductOptions
}

const attributesList = ['ID', 'Label', 'Value'] as const satisfies readonly string[]

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const { groupValues } = toRefs(props)
</script>
