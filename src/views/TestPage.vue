<script setup lang="ts">
import {ref} from 'vue'
import MyInput from "@/components/MyInput.vue";
import MyEditor from "@/components/MyEditor.vue";

const mytext = ref<string>('')
const sampleItem = ref({ test: 2, text: 'Home page text' })

function updateItem(item: any) {
  sampleItem.value = {...item}
}

</script>
<template>
  <div>
    <h2 class="blue">Testing Page:</h2>
    <div style="margin-top: 2rem">
      <h3>MyEditor</h3>
      <MyEditor
          :item="sampleItem"
          @save="updateItem"
      />
    </div>

    <div style="margin-top: 2rem">
      <h4>MyInput</h4>
      <MyInput
          v-model="mytext"
      />
      Value = {{ mytext }}
    </div>
  </div>
</template>
