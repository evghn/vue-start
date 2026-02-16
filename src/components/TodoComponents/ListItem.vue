<script setup>
import { inject } from 'vue';
import { getBgStatus, getStatusId, getStatusText } from './models/model.todo';
import TaskIndicator from './TaskIndicator.vue';

const props = defineProps(["item", "keyItem"])

const { changeStatus } = inject("changeStatus")
</script>
<template>
  <div class="flex  w-full items-center border border-blue-200 px-3 py-2 rounded gap-3">
    <div class="grow">
      {{ props.item.value }}
    </div>
    <task-indicator :class="[getBgStatus(props.item.status_id)]">{{
      getStatusText(props.item.status_id) }}</task-indicator>
    <div class="flex gap-3 border-l pl-5 ml-5 min-w-75">
      <a v-if="props.item.status_id < getStatusId('ready')" class="border px-4 py-2 rounded-lg bg-blue-700 text-white"
        href="" @click.prevent="changeStatus(props.keyItem)">Сменить статус</a>
      <a v-if="props.item.status_id == getStatusId('new') || props.item.status_id == getStatusId('ready')"
        class="border px-4 py-2 rounded-lg bg-red-400 text-white" href=""
        @click.prevent="changeStatus(props.keyItem, true)">Удалить</a>
    </div>

  </div>

</template>
<style scoped>
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
