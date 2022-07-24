import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
  it('renders msg properly', () => {
    const title = 'Test Title !!'
    const wrapper = mount(HelloWorld, { props: { msg: title } })

    // expect( wrapper.vm ).toBe(1)

    expect( wrapper.find('[data-testid=hello-header]').text() ).toBe(title)
    expect( wrapper.find('[data-testid=hello-vite]').text() ).toBe('Vite')
    expect( wrapper.find('[data-testid="hello-vite"]').text() ).toBe('Vite')

  })
  it('msg prop changes properly', async () => {
    const title = 'Test Title !!'
    const wrapper = mount(HelloWorld, { props: { msg: title } })
    expect( wrapper.find('[data-testid=hello-header]').text() ).toBe(title)

    const ntitle = 'NEW title'
    await wrapper.setProps({ msg: ntitle })
    expect( wrapper.find('[data-testid=hello-header]').text() ).toBe(ntitle)
  })

})
