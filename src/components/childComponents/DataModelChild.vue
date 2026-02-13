<script setup>

const props = defineProps(['dataModel'])
const emit = defineEmits(['update:dataModel'])

// const count = ref(props.countChild)

const addCount = () => {

  emit('update:dataModel', { ...props.dataModel, countChild: props.dataModel.countChild + 1 })
}

</script>
<template>
  <div class="child">
    Test Component: {{ props.dataModel.index }}
    <div>

      countChild: {{ props.dataModel.countChild }} <button @click.stop="addCount">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
