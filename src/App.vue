<script setup>
import { computed, ref, watch, watchEffect } from 'vue';

const hello = "hello user";
const task = ref()
const _dataList = ref([])
const filter = ref(false)
const taskLevel = ref()
const errorTask = ref(false)
const errorLevel = ref(false)
const errorTaskMessage = ref("Не заполнено название задачи")
const errorLevelMessage = ref("Не выбран уровень задачи")

const level = ref([
  { id: 0, text: '' },
  { id: 1, text: 'Легкая' },
  { id: 2, text: 'Средняя' },
  { id: 3, text: 'Сложная' }
])



const count = computed(() => dataList.value.length)

const dataList = computed(() =>
  filter.value
    ? _dataList.value.filter(item => item.status === "ready")
    : _dataList.value
)

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




  _dataList.value.push({
    id: Date.now(),
    value: task.value,
    level: "low",
    status: "active"
  })
  console.log(task.value);
  task.value = "";
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

watch(() => _dataList.value,
  (newVal) => {
    if (newVal)
      console.log("dataList изменен", newVal);
  },
  {
    deep: true,
    immediate: true
  }
)

watchEffect(
  () => {
    console.log("errorLevel", errorLevel.value);
    if (errorLevel.value && taskLevel.value) {
      errorLevel.value = false
    }
    // console.log(task.value);
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
        <div><a href="" @click.prevent="filter = !filter">filter</a></div>
        <div class="flex gap-3 justify-between">
          <a class="border px-4 py-2 rounded-lg" href="" @click.prevent="handleClick">Сброс фильтра</a>
          <a class="border px-4 py-2 rounded-lg bg-red-400 text-white" href="" @click.prevent="clearTasks">Очистка
            списка</a>
        </div>
      </div>

      <div class="border-gray-400 border rounded p-3">
        <div class="text-3xl text-center py-3">Todo list</div>

        <div class="text-xl mb-2">Количество задач: <span class="font-bold">{{ count }}</span></div>
        <ul v-if="dataList.length" class="flex flex-col gap-2">
          <li v-for="(item, key) in dataList" :key="key" class="text-lg">
            <div class="flex  w-full justify-between border border-blue-200 px-3 py-2 rounded">
              <div>
                {{ item.value }}
              </div>
              <div>
                {{ item.status }}
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
