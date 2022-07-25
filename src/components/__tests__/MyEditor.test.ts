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
const dropSelector = tstr('btn-drop')

// Mocks and spies, etc...
const mockTitle = 'Test TITLE'
const mockSubtitle = 'just a subtitle'
const mockItem = { test: 3, text: 'Test item TEXT' }

// custom mount
function mountEditor( options = {} ) {
  return mount(MyEditor, {
    globals: {
      plugins: [ createTestingPinia({stubActions: false}) ]
    },
    ...options
  })
}

function elDisabled( el: any ) {
  return el.element.disabled
}

describe('MyEditor', () => {
  let wrapper: any, vm: any, store: any

  it('exists and renders', () => {
    wrapper = mountEditor({
      props: {
        item: {}
      }
    })
    expect( wrapper.exists() ).toBe( true )
    expect( wrapper.html() ).toContain( 'div' )
  })

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
          item: mockItem
        }
      })

      expect( wrapper.vm.isDirty ).toBe( false )
      // buttons ...
      expect( elDisabled(wrapper.find(saveSelector)) ).toBeTruthy()   // save is disabled initially
      expect( elDisabled(wrapper.find(resetSelector)) ).toBeTruthy()  // reset is disabled initially

      // after change to item ... it should dirty
      await wrapper.vm.touchItem() // editItem = { test: 'abc' }
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
      await wrapper.vm.touchItem()

      expect( wrapper.vm.isDirty ).toBe( true )
      expect( wrapper.vm.isDisabled ).toBe( false )
      // buttons ... should allow saving
      expect( elDisabled(wrapper.find(saveSelector)) ).toBe( false )
      expect( elDisabled(wrapper.find(resetSelector)) ).toBe( false )
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

      // controls
      expect( elDisabled(wrapper.find(inputSelector)) ).toBe( true )

      await wrapper.setProps({
        disabled: false
      })
      // also ... changed editItem
      await wrapper.vm.touchItem()

      expect( wrapper.vm.isDisabled ).toBe( false )
      expect( wrapper.vm.isDirty ).toBe( true )
      // buttons ...
      expect( elDisabled(wrapper.find(saveSelector)) ).toBe( false )
      expect( elDisabled(wrapper.find(resetSelector)) ).toBe( false )
      // controls
      expect( elDisabled(wrapper.find(inputSelector)) ).toBe( false )
    })
  })

  describe('input text control tests', ()=> {
    let origItem = mockItem
    let input

    beforeEach( () => {
      wrapper = mountEditor({
        props: {
          item: origItem
        }
      })
    })

    it('should have intended value in input[text]', async () => {
      input = wrapper.find(inputSelector)
      vm = wrapper.vm
      expect( vm.isDirty ).toBe( false )
      expect( input.element.value ).toBe( origItem.text )
      expect( vm.editItem.text ).toBe( origItem.text )
    })

    it('should update input[text] and change dirty status', async () => {
      input = wrapper.find(inputSelector)
      vm = wrapper.vm
      expect( vm.isDirty ).toBe( false )
      const ntext = 'updated text!'
      await input.setValue(ntext)

      expect( vm.isDirty ).toBe( true )
      expect( input.element.value ).toBe( ntext )
      expect( vm.editItem.text ).toBe( ntext )
    })

    it('should update input[text] but reset correctly', async () => {
      input = wrapper.find(inputSelector)
      vm = wrapper.vm
      expect( vm.isDirty ).toBe( false )
      const ntext = 'updated text!'
      await input.setValue(ntext)

      expect( vm.isDirty ).toBe( true )

      await vm.onReset()

      expect( vm.isDirty ).toBe( false )
      expect( vm.editItem.text ).toBe( origItem.text )
      expect( input.element.value ).toBe( origItem.text )
    })
  })

  it('editItem should reset to default values', async () => {
    wrapper = mountEditor({
      props: {
        item: { test: '123', text: 'just text'}
      }
    })

    vm = wrapper.vm
    expect( vm.isDirty ).toBe(false)
    expect( vm.isDisabled ).toBe(true)

    await wrapper.setProps({
      disabled: false,
    })
    // also ... changed editItem
    const ntext = 'updated text!'
    await wrapper.find(inputSelector).setValue(ntext)

    expect( vm.isDirty ).toBe( true )
    expect( vm.editItem.text ).toBe( ntext )

    // reset the form .. via method
    await vm.onReset()
    expect( vm.isDirty ).toBe(false)
    expect( vm.editItem.test ).toBe('123')
    expect( vm.editItem.text ).toBe( 'just text')
  })

  describe('component events emitted', () => {
    let input: any, saveBtn: any, resetBtn: any, cancelBtn: any, dropBtn: any

    beforeEach( () => {
      wrapper = mountEditor({
        props: {
          item: mockItem
        }
      })
      input = wrapper.find(inputSelector)
      saveBtn = wrapper.find(saveSelector)
      resetBtn = wrapper.find(resetSelector)
      cancelBtn = wrapper.find(cancelSelector)
      dropBtn = wrapper.find(dropSelector)
      vm = wrapper.vm
    })

    it('should fire "save" after editing input[text]', async () => {
      expect( vm.isDirty ).toBe( false )

      // update some items ...
      const ntext = 'Updated TEXT setting'
      await input.setValue(ntext)
      await vm.touchItem()

      expect( vm.isDirty ).toBe( true )
      expect( input.element.value ).toBe( ntext )
      expect( vm.editItem.text ).toBe( ntext )

      // check event
      await saveBtn.trigger('click')
      const save = wrapper.emitted('save')
      expect( save ).toBeTruthy()
      expect( save ).toHaveLength( 1 )
      expect( save[0][0] ).toEqual({
        test: mockItem.test,
        text: ntext,
        time: vm.editItem.time
      })

      // and ... props.item should have changed ... NO, not a modelValue !!
      // expect( vm.props.item.time ).toBe( vm.editItem.time )

    })

    it('should emit reset event', async () => {
      expect( vm.isDirty ).toBe( false )

      // update some items ...
      const ntext = 'Updated TEXT setting'
      await input.setValue(ntext)
      await vm.touchItem()

      expect( vm.isDirty ).toBe( true )
      expect( input.element.value ).toBe( ntext )
      expect( vm.editItem.text ).toBe( ntext )

      // check event
      await resetBtn.trigger('click')
      const reset = wrapper.emitted('reset')
      expect( reset ).toBeTruthy()
      expect( reset ).toHaveLength( 1 )
      expect( reset[0][0] ).toBeUndefined()
    })

    it('should emit cancel event', async () => {
      await dropBtn.trigger('click')
      const drop = wrapper.emitted('drop')
      expect( drop ).toBeTruthy()
      expect( drop ).toHaveLength( 1 )
      expect( drop[0][0] ).toEqual({...mockItem})
    })


    it('should emit drop event', async () => {
      await dropBtn.trigger('click')
      const drop = wrapper.emitted('drop')
      expect( drop ).toBeTruthy()
      expect( drop ).toHaveLength( 1 )
      expect( drop[0][0] ).toEqual({
        ...mockItem
      })
    })

  })

})
