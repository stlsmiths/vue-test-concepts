import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/Events.vue')
    },
   {
      path: '/event/:id',
      name: 'EventDetails',
      props: true,
      component: () => import('@/views/EventDetails.vue')
   },
   {
      path: '/event_verify/:id',
      name: 'EventVerify',
      props: route => ({ params: route.params.id }),
      component: () => import('@/views/EventVerify.vue')
   }
  ]
})

export default router
