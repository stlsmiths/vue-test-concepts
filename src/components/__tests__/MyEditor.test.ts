import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
// @ts-ignore
import { createTestingPinia } from '@pinia/testing'
import {useSampleStore} from "../../stores/sample-store";

import MyEditor from '../MyEditor.vue'
import MyInput from '../MyInput.vue'

// Define selectors ...
const tstr = (str: string ): string => `[data-testid="${str}"]`
const titleSelector = tstr('title')
const subtitleSelector = tstr('subtitle')
const chkSelector = tstr('disable-check')
const inputSelector = tstr('input-text')
const saveSelector = tstr('btn-save')
const resetSelector = tstr('btn-reset')
const cancelSelector = tstr('btn-cancel')

// Mocks and spies, etc...
const mockTitle = 'Test TITLE'
const mockSubtitle = 'just a subtitle'

// custom mount
function mountEditor( options = {} ) {
  return mount(MyEditor, {
    globals: {
      plugins: [ createTestingPinia({stubActions: false}) ]
    },
    ...options,
  })
}

function elDisabled( el: any ) {
  return el.element.disabled
}

describe('MyEditor', () => {
  let wrapper, vm, store

  describe('title property changes', () => {

    it('should render properly initially - using store for default title', () => {
      wrapper = mountEditor({
        props: {
          item: {}
        }
      })

      // initial title (by default) is store.appTitle
      store = useSampleStore()
      expect( wrapper.find(titleSelector).text() ).toBe( store.appTitle )
      expect( wrapper.vm.localTitle ).toBe( store.appTitle )
      expect( wrapper.vm.ctitle ).toBe( store.appTitle )

      expect( wrapper.find(subtitleSelector).text() ).toEqual( '' )
      expect( elDisabled(wrapper.find(chkSelector)) ).toBeFalsy()
    })

    it('should update title via initial prop', async () => {
      wrapper = mountEditor({
        props: {
          title: mockTitle,
          subtitle: mockSubtitle,
          item: {}
        }
      })

      expect( wrapper.find(titleSelector).text() ).toBe( mockTitle )
      expect( wrapper.vm.localTitle ).toBe( mockTitle )
      expect( wrapper.vm.ctitle ).toBe( mockTitle )

      expect( wrapper.find(subtitleSelector).text() ).toEqual( mockSubtitle )
    })

    it('should update title via prop change', async () => {
      wrapper = mountEditor({
        props: {
          // title: mockTitle,
          subtitle: mockSubtitle,
          item: {}
        }
      })

      store = useSampleStore()
      expect( wrapper.find(titleSelector).text() ).toBe( store.appTitle )
      expect( wrapper.vm.localTitle ).toBe( store.appTitle )
      expect( wrapper.find(subtitleSelector).text() ).toEqual( mockSubtitle )

      const ntitle = 'New Testing Title'
      const nstitle = 'New Testing Sub-Title'
      await wrapper.setProps({
        title: ntitle,
        subtitle: nstitle
      })
      expect( wrapper.find(titleSelector).text() ).toBe( ntitle )
      expect( wrapper.vm.localTitle ).toBe( ntitle )
      expect( wrapper.find(subtitleSelector).text() ).toEqual( nstitle )
    })

    it('should update title properly via store change', async () => {
      wrapper = mountEditor({
        props: {
          item: {}
        }
      })

      store = useSampleStore()
      expect( wrapper.find(titleSelector).text() ).toBe( store.appTitle )
      expect( wrapper.vm.localTitle ).toBe( store.appTitle )

      const ntitle = 'New Testing Title'
      await store.setTitle(ntitle)

      expect( store.appTitle ).toBe( ntitle )
      expect( wrapper.vm.storeTitle ).toBe( ntitle )

      expect( wrapper.find(titleSelector).text() ).toBe( ntitle )
      expect( wrapper.vm.localTitle ).toBe( ntitle )
    })

    it('should update title properly via store initialState at creation', async () => {
      const initTitle = 'New InitialState title'
      wrapper = mount( MyEditor, {
        props: {
          item: {}
        },
        globals: {
          plugins: [ createTestingPinia({
            initialState: {
              sample: {
                appTitle: initTitle
              }
            }
          })]
        }
      })

      store = useSampleStore()
      expect( wrapper.find(titleSelector).text() ).toBe( initTitle )
      expect( wrapper.vm.localTitle ).toBe( initTitle )

    })
  })

  describe('dirty and disabled state', () => {
    it('should have computed isDirty working', async () => {
      wrapper = mountEditor({
        props: {
          item: {}
        }
      })

      expect( wrapper.vm.isDirty ).toBe( false )
      // buttons ...
      expect( elDisabled(wrapper.find(saveSelector)) ).toBeTruthy()   // save is disabled initially
      expect( elDisabled(wrapper.find(resetSelector)) ).toBeTruthy()  // reset is disabled initially

      // after change to item ... it should dirty
      wrapper.vm.touchItem() // editItem = { test: 'abc' }
      expect( wrapper.vm.isDirty ).toBe( true )
    })

    it('should have computed isDisabled working', async () => {
      wrapper = mountEditor({
        props: {
          item: { test: '123'}
        }
      })
      expect( wrapper.vm.isDisabled ).toBe( true )

      // buttons ...
      expect( elDisabled(wrapper.find(saveSelector)) ).toBeTruthy()   // save is disabled initially
      expect( elDisabled(wrapper.find(resetSelector)) ).toBeTruthy()  // reset is disabled initially

      // after change to item ... it should dirty
      wrapper.vm.touchItem()

      expect( wrapper.vm.isDirty ).toBe( true )
      expect( wrapper.vm.isDisabled ).toBe( false )
      // buttons ... should allow saving
      expect( elDisabled(wrapper.find(saveSelector)) ).toBe( true )
      expect( elDisabled(wrapper.find(resetSelector)) ).toBe( true )
    })

    it('should disable when prop.disable changes', async () => {
      wrapper = mountEditor({
        props: {
          item: { test: '123'},
          disabled: true
        }
      })
      expect( wrapper.vm.isDirty ).toBe( false )
      expect( wrapper.vm.isDisabled ).toBe( true )

      // buttons ...
      expect( elDisabled(wrapper.find(saveSelector)) ).toBe( true )   // save is disabled initially
      expect( elDisabled(wrapper.find(resetSelector)) ).toBe( true )  // reset is disabled initially

      await wrapper.setProps({
        disabled: false
      })
      // also ... changed editItem
      wrapper.vm.touchItem()

      expect( wrapper.vm.isDisabled ).toBe( false )
      expect( wrapper.vm.isDirty ).toBe( true )
      // buttons ...
      expect( elDisabled(wrapper.find(saveSelector)) ).toBe( true )
      expect( elDisabled(wrapper.find(resetSelector)) ).toBe( true )
    })
  })

  describe('input text control tests', ()=> {
    let origItem = { test: 3, text: 'Test item TEXT' }

    beforeEach( () => {
      wrapper = mountEditor({
        props: {
          item: origItem
        }
      })
    })

    it('should have intended value in input text', async () => {

      expect( wrapper.vm.isDirty ).toBe( false )
      expect( wrapper.find(inputSelector).element.value ).toBe( origItem.text )

      // after change to item ... it should dirty
      expect( wrapper.vm.isDirty ).toBe( false )
    })

  })

  it('should reset to default values', async () => {
    wrapper = mountEditor({
      props: {
        item: { test: '123'}
      }
    })

    expect( wrapper.vm.isDirty ).toBe(false)
    expect( wrapper.vm.isDisabled ).toBe(true)

    await wrapper.setProps({
      disabled: false,
    })
    // also ... changed editItem
    wrapper.vm.editItem.test = 'abc'

    expect( wrapper.vm.isDirty ).toBe(true)
    expect( wrapper.vm.editItem.test ).toBe('abc')

    // reset the form .. via method
    wrapper.vm.onReset()
    expect( wrapper.vm.isDirty ).toBe(false)
    expect( wrapper.vm.editItem.test ).toBe('123')
  })

  it('should emit save event', () => {

  })

  it('should emit clear event', () => {})
  it('should emit reset event', () => {})
  it('should emit drop event', () => {})

})
