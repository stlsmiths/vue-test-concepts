<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  verify: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="event-card" data-testid="event-card">
    <span>@{{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
    <div v-if="verify">
      <br>
        <hr>
      <router-link :to="`/event_verify/${event.id}`" data-testid="verify-link">Verify</router-link>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #34eada;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
