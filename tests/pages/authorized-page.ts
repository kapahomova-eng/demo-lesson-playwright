import { BasePage } from './base-page'
import { type Locator, type Page } from '@playwright/test'

export class AuthorizedPage extends BasePage {
  readonly logoutButton: Locator
  readonly statusButton: Locator
  readonly searchOrderInput: Locator
  readonly searchOrderPopup: Locator
  readonly searchOrderSubmitButton: Locator
  readonly searchOrderCloseButton: Locator

  constructor(page: Page) {
    super(page)
    this.logoutButton = page.getByTestId('logout-button')
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.searchOrderInput = page.getByTestId('searchOrder-input')
    this.searchOrderPopup = page.getByTestId('searchOrder-popup')
    this.searchOrderSubmitButton = page.getByTestId('searchOrder-submitButton')
    this.searchOrderCloseButton = page.getByTestId('searchOrder-close-button')
  }
}
