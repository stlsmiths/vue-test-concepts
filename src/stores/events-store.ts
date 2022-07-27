import { defineStore } from 'pinia'
import {ref,computed} from 'vue'
// @ts-ignore
import EventService from "@/services/EventService.js";

export const useEvents = defineStore( 'events', () => {
    const events = ref([])

    async function fetchEvents() {
        const resp = await EventService.getEvents()
        // console.log('store fetchEvents', resp)
        events.value = resp.data
        return resp.data
    }

    function eventById(id: string | number) {
        return events.value.find( (e:any) => e.id === id )
    }

    const getById = computed( () => (id: string | number) => events.value.find( (e:any) => e.id === id ) )

    return {
        events,
        fetchEvents,
        eventById,
        getById
    }
})
