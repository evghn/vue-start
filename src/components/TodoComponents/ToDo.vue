<script setup>
import { computed, ref } from 'vue'
import TodoList from './TodoList.vue'
import FilterPanel from './FilterPanel.vue'
import TodoForm from './TodoForm.vue'
import { getStatusId } from './model.todo'
const _dataList = ref([])


const statusFilter = ref()
const levelFilter = ref()

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

const todo = localStorage.getItem("todo")
if (todo) {
  _dataList.value = JSON.parse(todo)
}





const addTask = (dataTask) => {
  console.log(dataTask);

  _dataList.value.push({
    id: Date.now(),
    value: dataTask.task.value,
    level_id: dataTask.taskLevel.value,
    status_id: getStatusId("новая")
  })

}


const clearTasks = () => _dataList.value = [];

// const changeStatus = (index, isDelete = false) => {
//   if (_dataList.value[index].status_id < getStatusId("ready") || _dataList.value[index].status_id < getStatusId("remove") && isDelete) {
//     if (isDelete) {
//       _dataList.value[index].status_id = getStatusId("remove")
//     } else {
//       _dataList.value[index].status_id++;
//     }
//   }
// }


</script>
<template>
  <div class="p-10">
    <div class="flex flex-col gap-3">

      <todo-form @add-task="addTask"></todo-form>
      <!-- <filter-panel @clear-tasks="clearTasks"></filter-panel>
      <todo-list v-model="dataList"></todo-list> -->
    </div>
  </div>
  {{ _dataList }}
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
