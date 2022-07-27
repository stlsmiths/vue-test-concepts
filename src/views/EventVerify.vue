<script setup>
import {watch,ref,computed,watchEffect} from 'vue'
import {useEvents} from "@/stores/events-store";
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";

//  https://jsonplaceholder.cypress.io/posts?_limit=3
const props = defineProps({
  id: {
    type: [Number,String],
    required: true
  },
  event: {
    type: Object,
    default: () => ({})
  },
  backendEvent: {
    type: Object,
    default: () => ({})
  }
})

const estore = useEvents()
const backEvent = ref(props.backendEvent)

const eventc = computed( () => props.event ? props.event : estore.getById(props.id) )

watch(
    () => props.backendEvent,
    (item) => {
      if (item) {
        backEvent.value = item
      }
    }
)

async function requery() {
  console.log('query btn clicked')
  debugger;
  const resp = await EventService.getEvent(props.id)
  console.log('event id', props.id,'resp=', resp)
  if ( resp && resp.data ) {
    backEvent.value = {...resp.data}
  }
}
</script>

<template>
  <div>
    <h2>Event Verify : {{ id }}</h2>
    <div class="my-row">
      <br><br>
      <div class="my-col">
        <h3>Current Data:</h3>
        <EventCard
            :event="eventc"
            :verify="false"
            data-testid="card-current"
        />
      </div>
      <div class="my-col">
        <h3>Backend Data:</h3>
        <EventCard
            :event="backEvent"
            :verify="false"
            data-testid="card-backend"
        />
        <button @click="requery" data-testid="button">Requery Backend</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-row {
  display: flex;
}
.my-col {
  flex-basis: 700px;
  margin: 3rem;
  height: 400px
}
</style>
