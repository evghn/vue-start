<script setup>
import { watch } from 'vue';

const props = defineProps(['countChild', 'index'])
const emit = defineEmits(['changeCount'])

// const count = ref(props.countChild)

const addCount = () => {
  // count.value++;
  emit('changeCount', props.countChild + 1)
}
watch(() => props.countChild,
  () => {
    console.log(`child-${props.index}`, props.countChild);

  }
)
</script>
<template>
  <div class="child">
    Test Component
    <div>

      countChild: {{ props.countChild }} <button @click.stop="addCount">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
