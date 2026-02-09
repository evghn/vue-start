<script setup>
import { computed, ref, watch, watchEffect } from 'vue';

const hello = "hello user";
const task = ref()
const _dataList = ref([])
const taskLevel = ref()
const errorTask = ref(false)
const errorLevel = ref(false)
const errorTaskMessage = ref("Не заполнено название задачи")
const errorLevelMessage = ref("Не выбран уровень задачи")
const statusFilter = ref()
const levelFilter = ref()


const todo = localStorage.getItem("todo")
if (todo) {
  _dataList.value = JSON.parse(todo)
}

const level = ref([
  { id: 0, text: '' },
  { id: 1, text: 'Легкая' },
  { id: 2, text: 'Средняя' },
  { id: 3, text: 'Сложная' }
])

const statuses = ref([
  { id: 0, text: '' },
  { id: 1, text: 'Новая' },
  { id: 2, text: 'В процессе' },
  { id: 3, text: 'Выполнена' },
  { id: 4, text: 'Удалена' }
])

const getStatusId = (text) => {
  const index = statuses.value.findIndex((item) =>
    item.text.toLowerCase().includes(text.toLowerCase())
  )
  if (index !== -1) {
    return statuses.value[index].id
  }
}

const getStatusText = (id) => {
  const index = statuses.value.findIndex((item) => item.id == id)

  if (index !== -1) {
    return statuses.value[index].text
  }
}


const count = computed(() => dataList.value.length)

const dataList = computed(() => {

  if (levelFilter.value || statusFilter.value) {
    const data = ref([..._dataList.value])
    if (statusFilter.value) {
      data.value = data.value.filter(item => item.status === statusFilter.value)
    }

    if (levelFilter.value) {
      data.value = data.value.filter(item => item.level === levelFilter.value)
    }
    return data.value
  }

  return _dataList.value
})

const clearTasks = () => {
  _dataList.value = []
}

const addTask = () => {
  if (!task.value || !task.value.length) {
    errorTask.value = true
  }

  if (!taskLevel.value) {
    errorLevel.value = true
  }

  if (errorTask.value || errorLevel.value) {
    return
  }



  // console.log(getStatusId("новая"));

  _dataList.value.push({
    id: Date.now(),
    value: task.value,
    level: taskLevel.value,
    status: getStatusId("новая")
  })

  localStorage.setItem("todo", JSON.stringify(_dataList.value))

  task.value = "";
  taskLevel.value = 0
}


const handleTask = (e) => {
  // console.log(errorTask.value, e.key);

  if (errorTask.value) {
    errorTask.value = false;
  }

  if (e.key == "Enter") {
    addTask()
  }
}

const clearFilter = () => {
  levelFilter.value = undefined;
  statusFilter.value = undefined
}

// watch(() => _dataList.value,
//   () => {
//     // if (newVal)
//       // console.log("dataList изменен", newVal);
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// )

watchEffect(
  () => {
    // console.log("errorLevel", errorLevel.value);
    if (errorLevel.value && taskLevel.value) {
      errorLevel.value = false
    }
    // console.log("statusFilter", statusFilter.value);
    // console.log("levelFilter", levelFilter.value);
  }
)

</script>

<template>
  <div class="p-10">
    {{ hello }}
    <div class="flex flex-col gap-3">

      <div class="flex flex-col gap-3">

        <div class="flex gap-3 justify-between">
          <input class="border px-4 text-2xl rounded w-[70%] active:border  active:border-gray-200" type="text"
            v-model="task" @keydown="handleTask">

          <div class="flex gap-3 min-w-60 items-end">
            <div>Сложность задачи</div>
            <select v-model="taskLevel" class="border border-gray-400 p-2 rounded">
              <option v-for="item in level" :key="item.id" :value="item.id">{{ item.text }}</option>
            </select>

          </div>
          <a class="border px-4 py-2 rounded-lg bg-green-600   text-white min-w-40 tetx-center" href=""
            @click.prevent="addTask">Добавить задачу</a>
        </div>
        <div v-if="errorTask || errorLevel" class="bg-red-600 text-white px-3 py-2">
          <div v-if="errorTask">
            {{ errorTaskMessage }}
          </div>
          <div v-if="errorLevel">
            {{ errorLevelMessage }}
          </div>
        </div>
      </div>


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
              <option v-for="item in level" :key="item.id" :value="item.id">{{ item.text }}</option>
            </select>
          </div>


        </div>
        <div><a href="" @click.prevent="filter = !filter">filter</a></div>
        <div class="flex gap-3 justify-between">
          <a class="border px-4 py-2 rounded-lg" href="" @click.prevent="clearFilter">Сброс фильтра</a>
          <a class="border px-4 py-2 rounded-lg bg-red-400 text-white" href="" @click.prevent="clearTasks">Очистка
            списка</a>
        </div>
      </div>

      <div class="border-gray-400 border rounded p-3">
        <div class="text-3xl text-center py-3">Todo list</div>

        <div class="text-xl mb-2">Количество задач: <span class="font-bold">{{ count }}</span></div>
        <ul v-if="dataList.length" class="flex flex-col gap-2">
          <li v-for="(item, key) in dataList" :key="key" class="text-lg">
            <div class="flex  w-full border border-blue-200 px-3 py-2 rounded gap-3">
              <div class="grow">
                {{ item.value }}
              </div>
              <div class="px-3">
                {{ level[item.level].text }}
              </div>
              <div>
                {{ getStatusText(item.status) }}
              </div>
            </div>

          </li>
        </ul>
        <div v-show="!dataList.length" class="mt-3 text-3xl text-center text-decoration-line: underline">Список пустой
        </div>

        {{ dataList }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
