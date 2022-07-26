<template>
  <h1 data-testid="event-list-title">Events for Good</h1>
  <div class="events">
    <router-link
      class="event-link"
      :to="{ name: 'EventDetails', params: { id: event.id } }"
      v-for="event in estore.events"
      :key="event.id"
    >
      <EventCard data-testid="event" :event="event" />
    </router-link>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import EventCard from '@/components/EventCard.vue'
import {useEvents} from "@/stores/events-store";

const estore = useEvents()

</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.event-link {
  color: white;
  text-decoration: none;
}
</style>
