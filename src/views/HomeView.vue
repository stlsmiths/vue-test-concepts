<script setup lang="ts">
import {ref} from 'vue'
</script>

<template>
  <div>
    <h1>Vue - Test - Concepts</h1>

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
  </div>
</template>

