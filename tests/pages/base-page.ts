import { expect, type Locator, type Page, test } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly ruLanguageSwitcher: Locator
  readonly enLanguageSwitcher: Locator
  readonly privacyPolicyLink: Locator
  readonly cookiePolicyLink: Locator
  readonly termsOfServiceLink: Locator
  readonly TIMEOUT_VISIBILITY: number = 5000
  readonly mainPageLogo: Locator

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiePolicyLink = page.getByTestId('cookie-policy')
    this.termsOfServiceLink = page.getByTestId('terms-of-service')
    this.ruLanguageSwitcher = page.getByTestId('language-ru')
    this.enLanguageSwitcher = page.getByTestId('language-en')
    this.mainPageLogo = page.getByTestId('mainPage-link')
  }

  async checkElementVisibility(element: Locator): Promise<void> {
    // better test report with 'step'
    await test.step(`Verifying element visibility: ${element}`, async () => {
      await expect(element).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyLanguageSelector(): Promise<void> {
    await test.step('Verify language selector', async () => {
      await this.checkElementVisibility(this.languageSwitcher)
    })
  }

  async clickElement(element: Locator) {
    await test.step(`Clicking element: ${element}`, async () => {
      await element.click()
    })
  }

  async fillElement(element: Locator, text: string) {
    await test.step(`Filling element: ${element}`, async () => {
      await element.fill(text)
    })
  }
}
