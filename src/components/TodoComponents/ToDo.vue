<script setup>
import { computed, onBeforeMount, provide, ref, watch } from 'vue'
import TodoList from './TodoList.vue'
import FilterPanel from './FilterPanel.vue'
import TodoForm from './TodoForm.vue'
import { getStatusId } from './models/model.todo'
import { getTasks } from './api/getTasks'
import { createTask } from './api/createTask'
import { updateTask } from './api/updateTask'
const _dataList = ref([])
const statusFilter = ref()
const levelFilter = ref()

// vwVK5lRyDU-oAAaOovGCSl5vuQvRbzAM


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

// const todo = localStorage.getItem("todo")
// if (todo) {
//   _dataList.value = JSON.parse(todo)
// }


const addTask = async (dataTask) => {
  // _dataList.value.push({
  //   id: Date.now(),
  //   value: dataTask.task.value,
  //   level_id: dataTask.taskLevel.value,
  //   status_id: getStatusId("новая")
  // })
  const task = ref({
    value: dataTask.task.value,
    level_id: dataTask.taskLevel.value,
    status_id: getStatusId("новая")
  })
  const result = await createTask(task)
  if (result) {
    _dataList.value.push(task.value)
  }

}



const clearTasks = () => _dataList.value = [];

const changeStatus = (index, isDelete = false) => {
  const _task = _dataList.value[index]
  if (_task.status_id < getStatusId("ready") || _task.status_id < getStatusId("remove") && isDelete) {
    if (isDelete) {
      _task.status_id = getStatusId("remove")
    } else {
      _task.status_id++;
    }

    if (updateTask(_task)) {
      _dataList.value[index] = _task
    }
  }
}

provide("changeStatus", {
  changeStatus
})

watch(() => _dataList.value,
  () => {
    localStorage.setItem("todo", JSON.stringify(_dataList.value))
  },
  {
    deep: true,
  }
)

onBeforeMount(async () => {
  const data = await getTasks();
  _dataList.value = data
})

</script>
<template>
  <div class="p-10 bg-gray-500 min-h-screen">
    <div class="flex flex-col gap-3">

      <todo-form @add-task="addTask"></todo-form>
      <filter-panel @clear-tasks="clearTasks" v-model:status="statusFilter" v-model:level="levelFilter"></filter-panel>
      <todo-list v-model="dataList"></todo-list>
    </div>
    {{ _dataList }}
  </div>
</template>

<style scoped>
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
