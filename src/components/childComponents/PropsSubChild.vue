<script setup>

const props = defineProps(['dataSubChild'])
const emit = defineEmits(['changeCount'])

// const count = ref(props.countChild)

const addCount = () => {
  // count.value++;
  emit('changeCount', props.dataSubChild.countChild + 1)
}

</script>
<template>
  <div class="child">
    Test Sub Child: {{ props.dataSubChild.index }}
    <div>

      countChild: {{ props.dataSubChild.countChild }} <button @click.stop="addCount">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
