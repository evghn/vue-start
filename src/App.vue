<script setup>
import { computed, ref, watch } from 'vue';

const hello = "hello user";
const data = ref()
const _dataList = ref([])
const filter = ref(false)

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
  _dataList.value.push({
    id: Date.now(),
    value: data.value,
    status: "active"
  })
  console.log(data.value);
  data.value = "";
}


watch(_dataList.value,
  (newVal) => {
    if (newVal)
      console.log("dataList изменен", newVal);
  },
  {
    deep: true,
    immediate: true
  }
)

</script>

<template>
  <div class="p-10">
    {{ hello }}
    <div class="flex flex-col gap-3">

      <div class="flex gap-3 justify-between">
        <input class="border px-4 text-2xl rounded w-[90%] active:border  active:border-gray-200" type="text"
          v-model.number="data" @keydown.enter="addTask">
        <a class="border px-4 py-2 rounded-lg bg-green-600   text-white min-w-40 tetx-center" href=""
          @click.prevent="addTask">Добавить
          задачу</a>
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
