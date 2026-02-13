<script setup>
import { computed, watch } from 'vue';
import { levels, statuses } from './model.todo';


const dataList = defineModel()




const count = computed(() => dataList.value.length)









watch(() => _dataList.value,
  () => {
    localStorage.setItem("todo", JSON.stringify(_dataList.value))
  },
  {
    deep: true,
  }
)
</script>
<template>
  <div class="border-gray-400 border rounded p-3">
    <div class="text-3xl text-center py-3">Todo list</div>

    <div class="text-xl mb-2">Количество задач: <span class="font-bold">{{ count }}</span></div>
    <ul v-if="dataList.length" class="flex flex-col gap-2">
      <li v-for="(item, key) in dataList" :key="key" class="text-lg">
        <div class="flex  w-full items-center border border-blue-200 px-3 py-2 rounded gap-3">
          <div class="grow">
            {{ item.value }}
          </div>
          <div class="px-3 task-indicator" :class="getBgLevel(item.level_id)">
            {{ levels[item.level_id].text }}
          </div>
          <div class="px-3 task-indicator" :class="[getBgStatus(item.status_id), true ? 'class-item' : 'class-item2']">
            {{ getStatusText(item.status_id) }}
          </div>
          <div class="flex gap-3 border-l pl-5 ml-5 min-w-75">
            <a v-if="item.status_id < getStatusId('ready')" class="border px-4 py-2 rounded-lg bg-blue-700 text-white"
              href="" @click.prevent="changeStatus(key)">Сменить статус</a>
            <a v-if="item.status_id == getStatusId('new') || item.status_id == getStatusId('ready')"
              class="border px-4 py-2 rounded-lg bg-red-400 text-white" href=""
              @click.prevent="changeStatus(key, true)">Удалить</a>
          </div>
        </div>

      </li>
    </ul>
    <div v-show="!dataList.length" class="mt-3 text-3xl text-center text-decoration-line: underline">Список пустой
    </div>

    {{ dataList }}
  </div>
</template>
