<script setup>
import { computed } from 'vue';

import ListItem from './ListItem.vue';


const model = defineModel()
// const emit = defineEmits(["changeStatus"])


const count = computed(() => dataList.value.length)
const dataList = computed(() => model.value)

// const changeStatus = (data) => {
//   emit("changeStatus", data)
// }



</script>
<template>
  <div class="border-gray-400 border rounded p-3">
    <div class="text-3xl text-center py-3">Todo list</div>

    <div class="text-xl mb-2">Количество задач: <span class="font-bold">{{ count }}</span></div>
    <ul v-if="dataList.length" class="flex flex-col gap-2">
      <li v-for="(item, key) in dataList" :key="key" class="text-lg">
        <list-item :item :key-item="key"></list-item>

      </li>
    </ul>
    <div v-show="!dataList.length" class="mt-3 text-3xl text-center text-decoration-line: underline">Список пустой
    </div>
  </div>
</template>
