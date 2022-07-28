import { defineStore } from 'pinia'
import {ref,computed} from 'vue'
// @ts-ignore
import {isNumeric} from "@/common/utility-funcs";

// @ts-ignore
import EventService from "@/services/EventService.js";

export const useEvents = defineStore( 'events', () => {
    const events = ref([])

    async function fetchEvents() {
        const resp = await EventService.getEvents()
        // console.log('store fetchEvents', resp)
        events.value = resp?.data || resp
        return resp
    }

    function eventById(id: string | number) {
        id = isNumeric(id) ? parseInt(id) : ''+id
        return events.value.find( (e:any) => e.id === id ) || {}
    }

    const getById = computed( () => (id: string | number) => {
        id = isNumeric(id) ? parseInt(id) : ''+id
        return events.value.find( (e:any) => e.id === id ) || {}
    })

    return {
        events,
        fetchEvents,
        eventById,
        getById
    }
})
