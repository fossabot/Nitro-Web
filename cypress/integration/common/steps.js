import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { getLangByName } from '../../support/helpers'
import users from '../../fixtures/users.json'

/* global cy  */

let lastPost = {
}
let loginCredentials

Given('I am logged in', () => {
  loginCredentials = {
    email: 'admin@example.org',
    password: '1234',
  }
  cy.factory().create('user', {
    role: 'admin',
    ...loginCredentials
  })
  cy.login('admin@example.org', '1234')
})
Given('I am logged in as {string}', userType => {
  cy.loginAs(userType)
})

Given('we have a selection of tags and categories as well as posts', () => {
  // TODO: use db factories instead of seed data
})

Given('my account has the following details:', table => {
  // TODO: use db factories instead of seed data
})

Given('my user account has the role {string}', role => {
  // TODO: use db factories instead of seed data
})

When('I log out', cy.logout)

When('I visit the {string} page', page => {
  cy.openPage(page)
})

Given('I am on the {string} page', page => {
  cy.openPage(page)
})

When('I fill in my email and password combination and click submit', () => {
  cy.login('admin@example.org', 1234)
})

When('I refresh the page', () => {
  cy.reload()
})

When('I log out through the menu in the top right corner', () => {
  cy.get('.avatar-menu').click()
  cy.get('.avatar-menu-popover')
    .find('a[href="/logout"]')
    .click()
})

Then('I can see my name {string} in the dropdown menu', () => {
  cy.get('.avatar-menu-popover').should('contain', users.admin.name)
})

Then('I see the login screen again', () => {
  cy.location('pathname').should('contain', '/login')
})

Then('I can click on my profile picture in the top right corner', () => {
  cy.get('.avatar-menu').click()
  cy.get('.avatar-menu-popover')
})

Then('I am still logged in', () => {
  cy.get('.avatar-menu').click()
  cy.get('.avatar-menu-popover').contains(users.admin.name)
})

When('I select {string} in the language menu', name => {
  cy.switchLanguage(name, true)
})
Given('I previously switched the language to {string}', name => {
  cy.switchLanguage(name, true)
})
Then('the whole user interface appears in {string}', name => {
  const lang = getLangByName(name)
  cy.get(`html[lang=${lang.code}]`)
  cy.getCookie('locale').should('have.property', 'value', lang.code)
})
Then('I see a button with the label {string}', label => {
  cy.contains('button', label)
})

When(`I click on {string}`, linkOrButton => {
  cy.contains(linkOrButton).click()
})

When('I press {string}', label => {
  cy.contains(label).click()
})

Given('we have the following posts in our database:', table => {
  table.hashes().forEach(row => {
    //TODO: calll factory here
    //create('post', row)
  })
})

Then('I see a success message:', message => {
  cy.contains(message)
})

When('I click on the avatar menu in the top right corner', () => {
  cy.get('.avatar-menu').click()
})

When('I click on the big plus icon in the bottom right corner to create post', () => {
  cy.get('.post-add-button').click()
})

Given('I previously created a post', () => {
  cy.factory()
    .authenticateAs(loginCredentials)
    .create('post', lastPost)
})

When('I choose {string} as the title of the post', (title) => {
  lastPost.title = title.replace('\n', ' ')
  cy.get('input[name="title"]').type(lastPost.title)
})

When('I type in the following text:', (text) => {
  lastPost.content = text.replace('\n', ' ')
  cy.get('.ProseMirror').type(lastPost.content)
})

Then('the post shows up on the landing page at position {int}', (index) => {
  cy.openPage('landing')
  const selector = `:nth-child(${index}) > .ds-card > .ds-card-content`
  cy.get(selector).should('contain', lastPost.title)
  cy.get(selector).should('contain', lastPost.content)
})

Then('I get redirected to {string}', (route) => {
  cy.location('pathname').should('contain', route)
})

Then('the post was saved successfully', () => {
  cy.get('.ds-card-header > .ds-heading').should('contain', lastPost.title)
  cy.get('.content').should('contain', lastPost.content)
})
