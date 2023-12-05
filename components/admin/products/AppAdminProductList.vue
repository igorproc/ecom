<template>
  <v-table>
    <thead>
      <tr>
        <th
          v-for="item in attributesList"
          :key="item"
          class="text-left"
        >
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in desserts"
      :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.price }}</td>
      <td>{{ item.type }}</td>
      <td v-if="item.variants && item.variants.length">
        <v-btn>Показать варианты</v-btn>
      </td>
      <td v-if="item.image">{{ item.image }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
const attributesList: string[] = ['Название', 'Цена', 'Тип', 'Варианты', 'Изображение']

const desserts = [
  {
    name: 'Frozen Yogurt',
    price: 12.5,
    type: 'BASE',
    variants: [],
    image: ''
  },
]
</script>
