class BasePage {
  constructor(app, debug) {
    this.app = app;
    this.browser = app.client;
    this.debug = debug;
  }

  async click(selector) {
    this.debug(`waiting for '${selector}' to be clickable`)
    await this.browser.waitForVisible(selector)
    await this.browser.waitForEnabled(selector)
  
    const isVisible = await this.browser.isVisible(selector);
    const isEnabled = await this.browser.isEnabled(selector);

    this.debug(`click '${selector}'`)
    await this.browser.click(selector);
  }
}

module.exports.BasePage = BasePage;
