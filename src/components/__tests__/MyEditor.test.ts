import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyInput from '../MyInput.vue'

const tstr = (str: string ): string => `[data-testid="${str}"]`

describe('MyEditor', () => {
  let wrapper, vm

  it.skip('renders properly', () => {
    const mockInput = 'Hello Vitest !'
    wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })
    expect( wrapper.find(tstr('container')).html() ).toContain( 'type="text"' )
    expect( wrapper.find(tstr('slen')).text() ).toContain( 'characters' )
  })

  it.skip('sets view-model and initial props correctly', () => {
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

    const input = wrapper.find('[data-testid=input]')
    console.log('input', input.text() )

    expect( wrapper.find(tstr('label')).text() ).toContain( 'My Label' )
    expect( wrapper.find(tstr('slen')).text() ).toContain( mockInput.length )
    // expect( wrapper.find('[data-testid=local]').text() ).toContain( mockInput )
    // expect( wrapper.find('[data-testid=input]').attributes('value') ).toContain('Hello Vitest')
  })

  it('should have isDirty working', () => {})
  it('should disable all controls', () => {})

  it('should reset to default values', () => {})
  it('should emit save event', () => {})
  it('should emit clear event', () => {})
  it('should emit reset event', () => {})
  it('should emit drop event', () => {})

})
