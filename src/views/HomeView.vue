<script setup lang="ts">
import {ref} from 'vue'
import MyInput from "@/components/MyInput.vue";
import MyEditor from "@/components/MyEditor.vue";

const mytext = ref<string>()
const sampleItem = ref({ test: 2, text: 'Home page text' })

function updateItem(item: any) {
  sampleItem.value = {...item}
}
</script>

<template>
  <div>
    <h1>Vue - Test - Pinia</h1>

    <div style="margin-top: 1rem;margin-bottom: 1rem;">
      <router-link to="/events">Events - Test Demo</router-link>

    </div>

    <h3 class="blue">References:</h3>
    <ul>
      <li>
        <a href="https://vuejs.org/guide/introduction.html" target="_blank">Vue Docs</a>
      </li>
      <li>
        <a href="https://vitest.dev/api/" target="_blank">Vitest API and Matchers</a>
      </li>
      <li><a href="https://pinia.vuejs.org/introduction.html" target="_blank">Pinia Docs</a></li>
      <li><a href="https://test-utils.vuejs.org/guide/" target="_blank">Vue Test Utils</a></li>
    </ul>

    <br><br>

    <h3 class="blue">Testing Frame:</h3>
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

