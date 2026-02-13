<script setup>


import { inject, watchEffect } from 'vue';
import SubChildInject from './SubChildInject.vue'




const dataModelProvide = inject('dataModelProvide')


watchEffect(() => {
  console.log(dataModelProvide);

})
</script>
<template>
  <div>
    <sub-child-inject></sub-child-inject>
  </div>
</template>
