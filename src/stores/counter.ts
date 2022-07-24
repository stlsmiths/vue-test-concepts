import { defineStore } from 'pinia'

const initTags = 'beer,whiskey,falafel,mustard,turkey'.split(',')

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    myTags: [] as string[]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getMyTag: (state) => (n: number = 0) => n ? state.myTags[n] || '' : state.myTags[0] || ''
  },
  actions: {
    increment(num: number = 0) {
      this.counter += !num ? 1 : num
    },
    resetMyTags( tags: string[] | string) {
      if ( tags ) {
        this.myTags = typeof tags === 'string' ? tags.split(',') : [...tags]
      } else {
        this.myTags = [...initTags]
      }
    }
  }
})
