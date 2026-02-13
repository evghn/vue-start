<script setup>

import PropsSubChild from './PropsSubChild.vue'

const props = defineProps(['data'])
const emit = defineEmits(['changeCount'])

// const count = ref(props.countChild)

const sendCount = () => {
  emit('changeCount', props.data.countChild + 1)
}

</script>
<template>
  <div>
    <props-sub-child :data-sub-child="data" @change-count="sendCount"></props-sub-child>
  </div>
</template>
