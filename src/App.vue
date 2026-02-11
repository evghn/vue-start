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

const levels = ref([
  { id: 0, text: '', alias: "" },
  { id: 1, text: 'Легкая', alias: "low" },
  { id: 2, text: 'Средняя', alias: "middle" },
  { id: 3, text: 'Сложная', alias: "hard" }
])

const statuses = ref([
  { id: 0, text: '', alias: "" },
  { id: 1, text: 'Новая', alias: "new" },
  { id: 2, text: 'В процессе', alias: "processing" },
  { id: 3, text: 'Выполнена', alias: "ready" },
  { id: 4, text: 'Удалена', alias: "remove" }
])

const count = computed(() => dataList.value.length)

const dataList = computed(() => {

  if (levelFilter.value || statusFilter.value) {
    const data = ref([..._dataList.value])
    if (statusFilter.value) {
      data.value = data.value.filter(item => item.status_id === statusFilter.value)
    }

    if (levelFilter.value) {
      data.value = data.value.filter(item => item.level_id === levelFilter.value)
    }
    return data.value
  }

  return _dataList.value
})

const formValidate = computed(() => !errorTask.value && !errorLevel.value)

const colorBorder = computed(() => (
  {
    "form-border": formValidate.value,
    "form-border-error": !formValidate.value
  }))



const getStatusId = (value) => {
  let index = statuses.value.findIndex((item) =>
    item.text.toLowerCase().includes(value.toLowerCase())
  )
  if (index !== -1) {
    return statuses.value[index].id
  }

  index = statuses.value.findIndex((item) =>
    item.alias.toLowerCase().includes(value.toLowerCase())
  )
  if (index !== -1) {
    return statuses.value[index].id
  }
}


const getLevelId = (value) => {
  let index = levels.value.findIndex((item) =>
    item.text.toLowerCase().includes(value.toLowerCase())
  )
  if (index !== -1) {
    return levels.value[index].id
  }

  index = levels.value.findIndex((item) =>
    item.alias.toLowerCase().includes(value.toLowerCase())
  )
  if (index !== -1) {
    return levels.value[index].id
  }
}




const getStatusText = (id) => {
  const index = statuses.value.findIndex((item) => item.id == id)

  if (index !== -1) {
    return statuses.value[index].text
  }
}



const clearTasks = () => _dataList.value = [];

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
    level_id: taskLevel.value,
    status_id: getStatusId("новая")
  })

  task.value = "";
  taskLevel.value = 0
}


const handleTask = (e) => {

  if (errorTask.value) {
    errorTask.value = false;
  }

  if (e.key == "Enter") {
    addTask()
  }
}

const clearFilter = () => {
  levelFilter.value = undefined;
  statusFilter.value = undefined;

}

const changeStatus = (index, isDelete = false) => {
  if (_dataList.value[index].status_id < getStatusId("ready") || _dataList.value[index].status_id < getStatusId("remove") && isDelete) {
    if (isDelete) {
      _dataList.value[index].status_id = getStatusId("remove")
    } else {
      _dataList.value[index].status_id++;
    }
  }
}

const getBgLevel = (level_id) => {
  return {
    'low': level_id == getLevelId('low'),
    'middle': level_id == getLevelId('middle'),
    'hard': level_id == getLevelId('hard'),
    "class-item": true
  }
}

const getBgStatus = (status_id) => {
  return {
    'new': status_id == getStatusId('new'),
    'processing': status_id == getStatusId('processing'),
    'ready': status_id == getStatusId('ready'),
    'remove': status_id == getStatusId('remove'),

  }
}



watch(() => _dataList.value,
  () => {
    localStorage.setItem("todo", JSON.stringify(_dataList.value))
  },
  {
    deep: true,
  }
)

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
          <div class="flex gap-3 justify-between py-3 px-5 grow rounded" :class="colorBorder">

            <input class="border px-4 text-2xl rounded min-w-[70%] active:border  active:border-gray-200" type="text"
              v-model="task" @keydown="handleTask">

            <div class="flex gap-3 min-w-60 items-end">
              <div>Сложность задачи</div>
              <select v-model="taskLevel" class="border border-gray-400 p-2 rounded">
                <option v-for="item in levels" :key="item.id" :value="item.id">{{ item.text }}</option>
              </select>
            </div>

          </div>
          <a class="border px-4 py-2 rounded-lg bg-green-600   text-white min-w-40 tetx-center" href=""
            @click.prevent="addTask">Добавить задачу</a>
        </div>
        <div v-if="errorTask || errorLevel" class="text-red-600  px-3 py-2">
          <div v-if="errorTask">
            <span class="text-error">{{ errorTaskMessage }}</span>
          </div>
          <div v-if="errorLevel">
            <span class="text-error">{{ errorLevelMessage }}</span>
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
              <option v-for="item in levels" :key="item.id" :value="item.id">{{ item.text }}</option>
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
            <div class="flex  w-full items-center border border-blue-200 px-3 py-2 rounded gap-3">
              <div class="grow">
                {{ item.value }}
              </div>
              <div class="px-3 task-indicator" :class="getBgLevel(item.level_id)">
                {{ levels[item.level_id].text }}
              </div>
              <div class="px-3 task-indicator"
                :class="[getBgStatus(item.status_id), true ? 'class-item' : 'class-item2']">
                {{ getStatusText(item.status_id) }}
              </div>
              <div class="flex gap-3 border-l pl-5 ml-5 min-w-[300px]">
                <a v-if="item.status_id < getStatusId('ready')"
                  class="border px-4 py-2 rounded-lg bg-blue-700 text-white" href=""
                  @click.prevent="changeStatus(key)">Сменить статус</a>
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
    </div>
  </div>
</template>

<style scoped>
.task-indicator {
  padding: 4px 15px;
  border-radius: 7px;
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

.form-border {
  border: 1px solid rgb(167, 207, 248);
}

.form-border-error {
  border: 1px solid rgb(152, 12, 12);
}

.text-error::before {
  content: "*";
  margin-right: 3px;
}
</style>
