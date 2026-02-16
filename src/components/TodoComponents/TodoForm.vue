<script setup>
import { computed, ref, watchEffect } from 'vue';
import { levels } from './models/model.todo';



const emit = defineEmits(['addTask'])
const task = ref()
const taskLevel = ref()

const errorTask = ref(false)
const errorLevel = ref(false)
const errorTaskMessage = ref("Не заполнено название задачи")
const errorLevelMessage = ref("Не выбран уровень задачи")

const formValidate = computed(() => !errorTask.value && !errorLevel.value)

const colorBorder = computed(() => (
  {
    "form-border": formValidate.value,
    "form-border-error": !formValidate.value
  }))


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


  emit('addTask', { task, taskLevel })

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
</template>
