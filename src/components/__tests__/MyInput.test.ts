import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyInput from '../MyInput.vue'

const tstr = (str: string ): string => `[data-testid="${str}"]`

describe('MyInput', () => {
  let wrapper, vm, input

  it('renders properly', () => {
    const mockInput = 'Hello Vitest !'
    wrapper = mount(MyInput, {
        props: {
          modelValue: mockInput
        }
      })
    expect( wrapper.find(tstr('container')).html() ).toContain( 'type="text"' )
    expect( wrapper.find(tstr('slen')).text() ).toContain( 'characters' )
  })

  it('sets view-model and initial props correctly', () => {
    const mockInput = 'Hello Vitest !'
    wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })

    vm = wrapper.getComponent(MyInput).vm
    expect( vm.slen ).toBe( mockInput.length )
    expect( vm.modelValue ).toBe( mockInput )
    expect( vm.local ).toBe( mockInput )
    expect( vm.localClass ).toBe( 'my-class' )
    expect( vm.label ).toBe( 'My Label' )
    expect( vm.maxLen ).toBe( 8 )

    input = wrapper.find('[data-testid=input]')
    console.log('input', input.text() )

    expect( wrapper.find(tstr('label')).text() ).toContain( 'My Label' )
    expect( wrapper.find(tstr('slen')).text() ).toContain( mockInput.length )
    // expect( wrapper.find('[data-testid=local]').text() ).toContain( mockInput )
    // expect( wrapper.find('[data-testid=input]').attributes('value') ).toContain('Hello Vitest')
  })

  it('should have correct non-default properties', () => {})
  it('should update modelValue on change correctly', () => {})
  it('should emit change event properly', () => {})
  it('should restrict input via mxLen property', () => {})
  it('should disable', () => {})
  it('should have isDirty working', () => {})
  it('should work with initial mv null', () => {})

})
