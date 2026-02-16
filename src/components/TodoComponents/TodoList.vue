<script setup>
import { computed } from 'vue';
import { getBgLevel, getBgStatus, getStatusId, getStatusText, levels } from './models/model.todo';


const model = defineModel()
const emit = defineEmits(["changeStatus"])


const count = computed(() => dataList.value.length)
const dataList = computed(() => model.value)


const changeStatus = (index, isDelete = false) => {
  emit("changeStatus", { index, isDelete })
}





// watch(() => model.value,
//   () => {
//     localStorage.setItem("todo", JSON.stringify(model.value))
//   },
//   {
//     deep: true,
//   }
// )
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
  </div>
</template>
<style scoped>
.task-indicator {
  padding: 4px 15px;
  border-radius: 7px;
  color: rgb(68, 67, 67) !important;
}

.new {
  background-color: rgb(169, 169, 255);
}

.processing {
  background-color: rgb(246, 250, 144);
}

.ready {
  background-color: rgb(169, 255, 183);
}

.remove {
  background-color: rgb(255, 169, 169);
}

.low {
  background-color: rgb(169, 252, 255);
}

.middle {
  background-color: rgb(251, 151, 247);
}

.hard {
  background-color: rgb(237, 86, 86);
}
</style>
