<script setup>

const model = defineModel()

// const addCount = () => {
//   model.value.countChild++
// }

</script>
<template>
  <div class="child">
    Test Component: {{ model.index }}
    <div>

      countChild: {{ model.countChild }} <button @click.stop="model.countChild++">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
