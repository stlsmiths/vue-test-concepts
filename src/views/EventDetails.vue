<script setup>
import {ref,computed,watch,onMounted} from 'vue'
import {useEvents} from "../stores/events-store";

const props = defineProps({
  id: {
    type: [Number,String],
    required: true
  }
})

const estore = useEvents()

const event = ref({})

const isNumeric = (id) => /^\d+$/.test(id)

watch(
    () => props.id,
    (id) => {
      if ( id ) {
        // event.value = estore.eventById( isNumeric(id) ? parseInt(id) : id )
        event.value = estore.getById( isNumeric(id) ? parseInt(id) : id )
      }
    },
    {immediate: true}
)

/*
  created() {
    this.$store.dispatch('fetchEvent', this.id).catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  },
  computed: {
    event() {
      return this.$store.state.event
    }
  }
*/
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
