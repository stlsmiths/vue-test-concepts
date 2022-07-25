import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyInput from '../MyInput.vue'

const tstr = (str: string ): string => `[data-testid="${str}"]`
const labelSel = tstr('label')
const slenSel = tstr('slen')
const inputSel = tstr('input')
const contSel = tstr('container')

describe('MyInput', () => {
  let wrapper, vm, input

  it('should render properly', () => {
    const mockInput = 'Hello Vitest !'
    wrapper = mount(MyInput, {
        props: {
          modelValue: mockInput
        }
      })
    expect( wrapper.find(contSel).html() ).toContain( 'type="text"' )
    expect( wrapper.find(slenSel).text() ).toContain( 'characters' )
  })

  it('should set view-model and initial props', () => {
    const mockInput = 'Myinput'
    const expInput = mockInput

    wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })

    vm = wrapper.getComponent(MyInput).vm
    expect( vm.slen ).toBe( expInput.length )
    expect( vm.modelValue ).toBe( mockInput )
    expect( vm.local ).toBe( expInput )
    expect( vm.localClass ).toBe( 'my-class' )
    expect( vm.label ).toBe( 'My Label' )
    expect( vm.maxLen ).toBe( 8 )

    expect( wrapper.find(labelSel).text() ).toContain( 'My Label' )
    expect( wrapper.find(slenSel).text() ).toContain( expInput.length )
  })

  it('should have correct non-default properties', () => {})

  it('should update modelValue on change correctly', async () => {
    const mockInput = 'Myinput'
    const expInput = mockInput

    wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })

    vm = wrapper.vm
    input = wrapper.find(inputSel)

    expect( wrapper.find(slenSel).text() ).toContain( expInput.length )

    //  Change the input
    const nvalue = 'testdata'
    await input.setValue(nvalue)

    expect( wrapper.vm.local ).toEqual(nvalue)
    expect( input.element.value ).toEqual(nvalue)

    const changed: any[][] | undefined = wrapper.emitted('change')
    const updated: any[][] | undefined = wrapper.emitted('update:model-value')
    // console.log('changed', changed)
    expect( changed ).toHaveLength(1)
    // expect( changed[0][0] ).toBe(12)

    // console.log('update is', updated)
    // const testValue = updated[0][0] ? updated[0][0] : null
    expect( updated ).toHaveLength(1)
    expect( updated[0][0] ).toBe( nvalue )


  })

  it('should emit change event properly', () => {})
  it('should restrict input via maxLen property', () => {})

  it('should restrict to maxLen characters', () => {
    const mockInput = 'Hello Vitest with long string !'
    const expInput = mockInput.substring(0,8)

    wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })

    vm = wrapper.getComponent(MyInput).vm
    expect( vm.slen ).toBe( 8 )
    expect( vm.modelValue ).toBe( mockInput )
    expect( vm.local ).toBe( expInput )
    expect( vm.maxLen ).toBe( 8 )

    expect( wrapper.find(labelSel).text() ).toContain( 'My Label' )
    expect( wrapper.find(slenSel).text() ).toContain( expInput.length )
  })

  it('should disable', async () => {
    const mockInput = 'Myinput'
    const expInput = mockInput

    wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })

    vm = wrapper.vm
    input = wrapper.find(inputSel)

    expect( wrapper.find(slenSel).text() ).toContain( expInput.length )
    expect( wrapper.vm.local ).toBe( expInput )
    expect( wrapper.vm.disabled ).toBe( false )
    expect( input.element.disabled ).toBe( false )

    // change to disabled
    await wrapper.setProps({ disabled: true })
    expect( wrapper.vm.disabled ).toBe( true )
    expect( input.element.disabled ).toBe( true )

  })

  it('should have isDirty working', () => {})
  it('should work with initial mv null', () => {})

})
