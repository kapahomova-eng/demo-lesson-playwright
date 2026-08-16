import { type Locator, type Page } from '@playwright/test'
import { AuthorizedPage } from './authorized-page'

export class OrderNotfoundPage extends AuthorizedPage {
  readonly orderNotFoundTitle: Locator
  readonly orderNotFoundDescription: Locator
  readonly orderNotFoundLImage: Locator

  constructor(page: Page) {
    super(page)
    this.orderNotFoundTitle = page.getByTestId('orderNotFound-title')
    this.orderNotFoundDescription = page.getByTestId('orderNotFound-description')
    this.orderNotFoundLImage = page.getByTestId('orderNotFound-image')
  }
}
