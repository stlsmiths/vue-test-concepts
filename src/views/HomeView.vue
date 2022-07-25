<script setup lang="ts">
import {ref} from 'vue'
import TheWelcome from '@/components/TheWelcome.vue'
import MyInput from "@/components/MyInput.vue";
const mytext = ref<string>()
</script>

<template>
  <div>
    <h2>Vue - Test - Pinia</h2>
    <ul>
      <li>
        <a href="https://vitest.dev/api/" target="_blank">Vitest</a>
      </li>
      <li><a href="https://pinia.vuejs.org/introduction.html" target="_blank">Pinia</a></li>
      <li><a href="https://test-utils.vuejs.org/guide/" target="_blank">Vue Test Utils</a></li>
    </ul>

    <h4>MyInput</h4>
    <MyInput
        v-model="mytext"
    />
    Value = {{ mytext }}
  </div>
</template>
