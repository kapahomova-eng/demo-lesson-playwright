import { type Locator, type Page } from '@playwright/test'
import { AuthorizedPage } from './authorized-page'

export class OrderFoundPage extends AuthorizedPage {
  readonly uselessInput: Locator
  readonly orderNameItem: Locator
  readonly orderPhoneItem: Locator
  readonly orderCommentItem: Locator
  readonly orderNameTitle: Locator
  readonly orderPhoneTitle: Locator
  readonly orderCommentTitle: Locator
  readonly orderName: Locator
  readonly orderPhone: Locator
  readonly orderComment: Locator
  readonly openStatusItem: Locator
  readonly acceptedStatusItem: Locator
  readonly inProgressStatusItem: Locator
  readonly deliveredStatusItem: Locator
  readonly openStatus: Locator
  readonly acceptedStatus: Locator
  readonly inProgressStatus: Locator
  readonly deliveredStatus: Locator
  readonly openStatusDescription: Locator
  readonly acceptedStatusDescription: Locator
  readonly inProgressStatusDescription: Locator
  readonly deliveredStatusDescription: Locator

  constructor(page: Page) {
    super(page)
    this.uselessInput = page.getByTestId('useless-input')
    this.orderNameItem = page.getByTestId('order-item-0')
    this.orderPhoneItem = page.getByTestId('order-item-1')
    this.orderCommentItem = page.getByTestId('order-item-2')
    this.orderNameTitle = this.orderNameItem.locator('.order-list__title')
    this.orderPhoneTitle = this.orderPhoneItem.locator('.order-list__title')
    this.orderCommentTitle = this.orderCommentItem.locator('.order-list__title')
    this.orderName = this.orderNameItem.locator('.order-list__description')
    this.orderPhone = this.orderPhoneItem.locator('.order-list__description')
    this.orderComment = this.orderCommentItem.locator('.order-list__description')
    this.openStatusItem = page.getByTestId('status-item-0')
    this.acceptedStatusItem = page.getByTestId('status-item-1')
    this.inProgressStatusItem = page.getByTestId('status-item-2')
    this.deliveredStatusItem = page.getByTestId('status-item-3')
    this.openStatus = this.openStatusItem.locator('.status-list__status')
    this.acceptedStatus = this.acceptedStatusItem.locator('.status-list__status')
    this.inProgressStatus = this.inProgressStatusItem.locator('.status-list__status')
    this.deliveredStatus = this.deliveredStatusItem.locator('.status-list__status')
    this.openStatusDescription = this.openStatusItem.locator('.status-list__description')
    this.acceptedStatusDescription = this.acceptedStatusItem.locator('.status-list__description')
    this.inProgressStatusDescription = this.inProgressStatusItem.locator(
      '.status-list__description',
    )
    this.deliveredStatusDescription = this.deliveredStatusItem.locator('.status-list__description')
  }
}
