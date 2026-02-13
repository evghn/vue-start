<script setup>
import MainChild from "@/components/childComponents/MainChild.vue"
import ToDo from './components/TodoComponents/ToDo.vue';
</script>

<template>
  <to-do class="p-10 bg-gray-500 text-white min-h-screen"></to-do>
  <main-child v-if="false"></main-child>
</template>
