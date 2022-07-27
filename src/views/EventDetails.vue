<script setup>
import {ref,computed,watch,onMounted} from 'vue'
import {useEvents} from "@/stores/events-store";

const props = defineProps({
  id: {
    type: [Number,String],
    required: true
  }
})

const estore = useEvents()

const event = computed( () => estore.getById(props.id) )

/*
watch(
    () => props.id,
    (id) => {
      if ( id ) {
        // event.value = estore.eventById( isNumeric(id) ? parseInt(id) : id )
        event.value = estore.getById( id )
      }
    },
    {immediate: true}
)
*/

</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p data-testid="header">{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p data-testid="details">{{ event.description }}</p>
  </div>
</template>
