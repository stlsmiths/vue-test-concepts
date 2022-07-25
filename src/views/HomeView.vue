<script setup lang="ts">
import {ref} from 'vue'
import MyInput from "@/components/MyInput.vue";
const mytext = ref<string>()
</script>

<template>
  <div>
    <h1>Vue - Test - Pinia</h1>
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

    <div style="margin-top: 2rem">
      <h4>MyInput</h4>
      <MyInput
          v-model="mytext"
      />
      Value = {{ mytext }}
    </div>
  </div>
</template>
