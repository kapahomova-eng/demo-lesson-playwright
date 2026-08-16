import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { createOrder, fetchJwt } from '../../helpers/api-helper'
import { Login } from '../../dto/login-dto'

let loginDto: Login
let authPage: LoginPage

test.beforeAll(() => {
  loginDto = new Login(USERNAME, PASSWORD)
})
test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(8))
  await authPage.passwordField.fill(faker.lorem.word(8))
  await authPage.signInButton.click()
  await expect(authPage.popupMessage).toHaveText('×Incorrect credentials')
  await expect(authPage.closePopupButton).toBeVisible()
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.statusButton).toBeVisible()
  await expect(orderCreationPage.nameField).toBeVisible()
  await expect(orderCreationPage.phoneField).toBeVisible()
  await expect(orderCreationPage.commentField).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeVisible()
  await expect(orderCreationPage.logoutButton).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.nameField.fill(faker.lorem.word(5))
  await orderCreationPage.phoneField.fill(faker.lorem.word(7))
  await orderCreationPage.commentField.fill(faker.lorem.word(8))
  await orderCreationPage.createOrderButton.click()
  await expect(orderCreationPage.orderSuccessfulCreatePopUp).toBeVisible()
  await expect(orderCreationPage.orderSuccessfulCreatePopUp).toContainText(
    'Order has been created!',
  )
})

test('login and fail create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.nameField.fill(faker.lorem.word(1))
  await orderCreationPage.phoneField.fill(faker.lorem.word(3))
  await expect(orderCreationPage.userNameFieldError).toHaveText(
    'The field must contain at least of characters: 2',
  )
  await expect(orderCreationPage.phoneFieldError).toHaveText(
    'The field must contain at least of characters: 6',
  )
  await expect(orderCreationPage.createOrderButton).toBeDisabled()
})

test('logout test', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('order found page test', async ({ request }) => {
  const token = await fetchJwt(request, loginDto)
  const orderId = await createOrder(request, token)
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  const orderFoundPage = await orderCreationPage.findOrder(orderId)
  await expect(orderFoundPage.orderName).toHaveText('vladimir')
  await expect(orderFoundPage.orderPhone).toHaveText('55445566')
  await expect(orderFoundPage.orderComment).toHaveText('hello')
  await expect(orderFoundPage.openStatus).toHaveText('OPEN')
  await expect(orderFoundPage.openStatusDescription).toHaveText('Order has been created')
})

test('order notfound page test', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  const orderNotfoundPage = await orderCreationPage.orderNotFound(0)
  await expect(orderNotfoundPage.orderNotFoundTitle).toHaveText('Order not found')
  await expect(orderNotfoundPage.orderNotFoundDescription).toHaveText('Check the tracking code')
  await expect(orderNotfoundPage.orderNotFoundLImage).toBeVisible()
  await expect(orderNotfoundPage.enLanguageSwitcher).toBeVisible()
  await expect(orderNotfoundPage.privacyPolicyLink).toBeVisible()
  await expect(orderNotfoundPage.ruLanguageSwitcher).toBeVisible()
  await expect(orderNotfoundPage.cookiePolicyLink).toBeVisible()
  await expect(orderNotfoundPage.termsOfServiceLink).toBeVisible()
  await expect(orderNotfoundPage.mainPageLogo).toBeVisible()
})
