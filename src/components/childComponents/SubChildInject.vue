<script setup>
import { inject } from 'vue';



const { dataModelProvide, dataChange } = inject('dataModelProvide')


console.log(dataModelProvide.value);


const addCount = () => {
  dataChange(dataModelProvide.value.countChild + 1)
}

</script>
<template>
  <div class="child">
    Test Sub Child Inject
    : {{ dataModelProvide }}
    <div>

      countChild: {{ dataModelProvide.countChild }} <button @click.stop="addCount">plus</button>
      <div>
        <button>clear</button>
      </div>
    </div>
  </div>
</template>
