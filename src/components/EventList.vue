<script setup lang="ts">
import {computed,onMounted} from "vue";
import EventCard from '@/components/EventCard.vue'
import {useEvents} from "@/stores/events-store";

const estore = useEvents()
const events = computed( () => estore.events )

</script>

<template>
  <h1 data-testid="event-list-title">Events for Good</h1>
  <div class="events">
    <router-link
        class="event-link"
        :to="{ name: 'EventDetails', params: { id: event.id } }"
        v-for="event in events"
        :key="event.id"
        data-testid="event-link"
    >
      <EventCard data-testid="event" :event="event" />
    </router-link>
  </div>
</template>

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
