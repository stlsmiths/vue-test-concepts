# NOTES

## Added vue-test-utils access within Cypress
 * See [MyInput.cy.ts](src/components/__tests__/MyInput.cy.ts)
 * It is awkward ... 
   * you have to create a Cypress alias "vueWrapper"
   * then follow a should fn in
   * but you get access to the vue event names directly "update:model-value" instead of wonky onUpdateModelValue
   * See [vue-3-cypress-vite](https://github.com/JessicaSachs/vue-3-cypress-vite/blob/master/src/components/HelloWorld.spec.jsx)

## Got Cypress e2e and component working
 * For e2e ...
   * put specs in cypress/e2e folder
   * I modified the package.json entry "test:e2e" to run vite server on port 5173 which is how the cypress.config is setup
     * `yarn run test:e2e`
   * I will run ... make sure "dev" is not running concurrently
 * For component tests ...
   * put specs in src/ with "cy.ts | cy.js" suffix
   * run `yarn run test:cy:comp` 

## Cypress - mostly _JessicaSachs

 * [Vue cypress/vite-dev-server](https://docs.cypress.io/guides/component-testing/component-framework-configuration#Vue-with-Vite)
 * Her stress-free-testing repo [stress-free-testing](https://github.com/JessicaSachs/stress-free-testing/tree/10-stores/src/components)
 * [cy-component-interview](https://github.com/JessicaSachs/cy-component-interview/blob/master/src/components/xhr/ajax-list-spec.js)
 * Another [Cypress Component class](https://www.vuemastery.com/conferences/vueconf-us-2021/component-testing-with-vite-vue-and-cypress/)

