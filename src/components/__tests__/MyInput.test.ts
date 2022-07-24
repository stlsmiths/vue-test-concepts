import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyInput from '../MyInput.vue'

describe('MyInput', () => {

  it('renders properly', () => {
    const mockInput = 'Hello Vitest !'
    const wrapper = mount(MyInput, {
        props: {
          modelValue: mockInput
        }
      })
    expect( wrapper.find('[data-testid=container]').html() ).toContain( 'type="text"' )
    expect( wrapper.find('[data-testid=slen]').text() ).toContain( 'characters' )
  })

  it('sets view-model and initial props correctly', () => {
    const mockInput = 'Hello Vitest !'
    const wrapper = mount(MyInput, {
      props: {
        modelValue: mockInput
      }
    })

    const vm = wrapper.getComponent(MyInput).vm
    expect( vm.slen ).toBe( mockInput.length )
    expect( vm.modelValue ).toBe( mockInput )
    expect( vm.local ).toBe( mockInput )
    expect( vm.localClass ).toBe( 'my-class' )
    expect( vm.label ).toBe( 'My Label' )
    expect( vm.maxLen ).toBe( 8 )

    const input = wrapper.find('[data-testid=input]')
    console.log('input', input.text() )

    expect( wrapper.find('[data-testid=label]').text() ).toContain( 'My Label' )
    expect( wrapper.find('[data-testid=slen]').text() ).toContain( mockInput.length )
    // expect( wrapper.find('[data-testid=local]').text() ).toContain( mockInput )
    // expect( wrapper.find('[data-testid=input]').attributes('value') ).toContain('Hello Vitest')
  })

  it.skip('renders msg properly', () => {
    const title = 'Test Title !!'
    const wrapper = mount(MyInput, { props: { msg: title } })

    // expect( wrapper.vm ).toBe(1)

    expect( wrapper.find('[data-testid=hello-header]').text() ).toBe(title)
    expect( wrapper.find('[data-testid=hello-vite]').text() ).toBe('Vite')
    expect( wrapper.find('[data-testid="hello-vite"]').text() ).toBe('Vite')

  })

  it.skip('msg prop changes properly', async () => {
    const title = 'Test Title !!'
    const wrapper = mount(MyInput, { props: { msg: title } })
    expect( wrapper.find('[data-testid=hello-header]').text() ).toBe(title)

    const ntitle = 'NEW title'
    await wrapper.setProps({ msg: ntitle })
    expect( wrapper.find('[data-testid=hello-header]').text() ).toBe(ntitle)
  })

})
