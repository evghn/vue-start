<script setup>
import { computed, provide, ref, watch } from 'vue';
import SimpleProps from './SimpleProps.vue';
import ObjectProps from './ObjectProps.vue';
import ModelValue from './ModelValue.vue';
import DataModelChild from './DataModelChild.vue';
import DefineModelChild from './DefineModelChild.vue';
import PropsChild from './PropsChild.vue';
import PropsChildEmpty from './PropsChildEmpty.vue';



const testCount = ref(0)
const modelValueData = ref({
  index: 3,
  countChild: testCount.value
})


const dataModel = ref({
  index: 4,
  countChild: testCount.value
})


const dataModelProvide = ref({
  index: 6,
  countChild: testCount.value
})


const dataChange = (val) => {
  dataModelProvide.value.countChild = val
  dataDefineModel.value.countChild = val
  dataModel.value.countChild = dataModelProvide.value.countChild
}

provide('dataModelProvide', {
  dataModelProvide,
  dataChange
})




const dataDefineModel = ref({
  index: 5,
  countChild: testCount.value
})



const dataObjectProps = computed(() => ({
  index: 2,
  countChild: testCount.value
}))



const sendCount = (val) => {
  testCount.value = val
  modelValueData.value.countChild = val
  dataModel.value.countChild = val

}


watch(() => modelValueData.value,
  () => {
    testCount.value = modelValueData.value.countChild
  },
  {
    deep: true
  }
)


watch(() => dataModel.value,
  () => {
    modelValueData.value.countChild = dataModel.value.countChild
  },
  {
    deep: true
  }
)


watch(() => dataDefineModel.value,
  () => {
    dataModel.value.countChild = dataDefineModel.value.countChild
  },
  {
    deep: true
  }
)




// const sendCountObject = (val) => {

//   testCount.value = val
// }


</script>
<template>
  <div class="p-10 bg-gray-700 text-white min-h-screen">
    <div>{{ testCount }}</div>
    <simple-props class="p-3 border border-white m-3" :index="1" :countChild="testCount"
      @change-count="sendCount"></simple-props>

    <object-props class="p-3 border border-white m-3" :data="dataObjectProps" @change-count="sendCount"></object-props>


    <model-value class="p-3 border border-white m-3" v-model="modelValueData"></model-value>

    <data-model-child class="p-3 border border-white m-3" v-model:data-model="dataModel"></data-model-child>


    <define-model-child class="p-3 border border-white m-3" v-model="dataDefineModel"></define-model-child>


    <props-child class="p-3 border border-white m-3" :data="dataObjectProps" @change-count="sendCount"></props-child>


    <props-child-empty></props-child-empty>
  </div>
</template>
