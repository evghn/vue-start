<script setup>

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// const count = ref(props.countChild)

const addCount = () => {

  emit('update:modelValue', { ...props.modelValue, countChild: props.modelValue.countChild + 1 })
}

</script>
<template>
  <div class="child">
    Test Component: {{ props.modelValue.index }}
    <div>

      countChild: {{ props.modelValue.countChild }} <button @click.stop="addCount">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
