import { type Locator, type Page } from '@playwright/test'
import { AuthorizedPage } from './authorized-page'
import { OrderFoundPage } from './order-found-page'
import { OrderNotfoundPage } from './order-notfound-page'

export class OrderPage extends AuthorizedPage {
  //readonly page: Page
  readonly statusButton: Locator
  readonly nameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  readonly createOrderButton: Locator
  readonly orderSuccessfulCreatePopUp: Locator
  readonly orderSuccessfulCreatePopUpOkButton
  readonly orderSuccessfulCreatePopUpCloseButton
  readonly phoneNumberFieldError: Locator
  readonly userNameFieldError: Locator
  readonly phoneFieldError: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    super(page)
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.nameField = page.getByTestId('username-input')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.orderSuccessfulCreatePopUp = page.getByTestId('orderSuccessfullyCreated-popup')
    this.orderSuccessfulCreatePopUpOkButton = page.getByTestId(
      'orderSuccessfullyCreated-popup-ok-button',
    )
    this.orderSuccessfulCreatePopUpCloseButton = page.getByTestId(
      'orderSuccessfullyCreated-popup-close-button',
    )
    this.userNameFieldError = page.getByTestId('username-input-error')
    this.phoneNumberFieldError = page.getByTestId('phone-input-error')
    this.phoneFieldError = page.getByTestId('phone-input-error')
    this.logoutButton = page.getByTestId('logout-button')
  }

  async findOrder(orderId: number) {
    await this.statusButton.click()
    await this.searchOrderInput.fill(orderId.toString())
    await this.searchOrderSubmitButton.click()
    return new OrderFoundPage(this.page)
  }
  async orderNotFound(orderId: number) {
    await this.statusButton.click()
    await this.searchOrderInput.fill(orderId.toString())
    await this.searchOrderSubmitButton.click()
    return new OrderNotfoundPage(this.page)
  }
}
