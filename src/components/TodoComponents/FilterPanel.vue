<script setup>
import { levels, statuses } from './models/model.todo';


const emit = defineEmits(['clearTasks'])

const levelFilter = defineModel("level")
const statusFilter = defineModel("status")




const clearTasks = () => emit("clearTasks");


const clearFilter = () => {
  levelFilter.value = undefined;
  statusFilter.value = undefined;
}

</script>
<template>
  <div class="flex gap-3 justify-between border-blue-900 border p-3 rounded">
    <div class="flex gap-3">
      <div>
        Статус задачи:
        <select v-model="statusFilter" class="border border-gray-400 p-2 rounded">
          <option v-for="item in statuses" :key="item.id" :value="item.id">{{ item.text }}</option>
        </select>
      </div>

      <div>
        Уровень сложности:
        <select v-model="levelFilter" class="border border-gray-400 p-2 rounded">
          <option v-for="item in levels" :key="item.id" :value="item.id">{{ item.text }}</option>
        </select>
      </div>


    </div>
    <div class="flex gap-3 justify-between">
      <a class="border px-4 py-2 rounded-lg" href="" @click.prevent="clearFilter">Сброс фильтра</a>
      <a class="border px-4 py-2 rounded-lg bg-red-400 text-white" href="" @click.prevent="clearTasks">Очистка
        списка</a>
    </div>
  </div>
</template>
