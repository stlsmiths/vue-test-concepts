// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import '../../src/assets/main.css'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'

// @ts-ignore
import router from '../../src/router'
import {createTestingPinia} from "@pinia/testing";

// @ts-ignore
Cypress.Commands.add( 'vmount', (...args: any) => {

  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []

  args.global.plugins.push( createTestingPinia({createSpy: cy.spy }) )
  args.global.plugins.push( router )

  return mount(...args)
      .then( (wrapper) => {
        return cy.wrap(wrapper).as('vueWrapper')
      })
})

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(MyComponent)
