<script setup>

const props = defineProps(['data'])
const emit = defineEmits(['changeCount'])

// const count = ref(props.countChild)

const addCount = () => {
  // count.value++;
  emit('changeCount', props.data.countChild + 1)
}

</script>
<template>
  <div class="child">
    Test Component: {{ props.data.index }}
    <div>

      countChild: {{ props.data.countChild }} <button @click.stop="addCount">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
