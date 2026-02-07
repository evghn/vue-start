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

const handleClick = () => {
  _dataList.value = []
}


const keyDown = () => {
  // if (e.key == "Enter") {
  // data.value = e.target.value
  _dataList.value.push({
    id: Date.now(),
    value: data.value,
    status: "active"
  })
  console.log(data.value);
  data.value = "";


  // data.value = ""
  // }

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

      <div class="flex gap-3">
        <input type="text" v-model.number="data" @keydown.enter="keyDown">
        <a href="" @click.prevent="handleClick">clear</a>
        <a href="" @click.prevent="filter = !filter">filter</a>

      </div>

      <div>Todo list</div>
      <div>Количество задач: {{ count }}</div>
      <ul v-if="dataList.length" class="flex flex-col gap-2">
        <li v-for="(item, key) in dataList" :key="key">
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
      <div v-show="!dataList.length">Список пустой</div>

      {{ dataList }}
    </div>
  </div>
</template>

<style scoped></style>
