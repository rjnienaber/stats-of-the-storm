const Debug = require('debug');
const {BasePage} = require('./base');

const debug = Debug('e2e:about');

class AboutPage extends BasePage {   
  constructor(app, sidebar) {
    super(app, debug);
  }

  async versionNumber() {
    debug('getting app version number');
    const values = await this.browser.getText('span.app-version-number');
    return values[0]
  }

  async coffeeImageIsVisible() {
    debug('ensuring coffee image is visible');
    return this.browser.isVisible('p a img');
  }

  async switchToStatDefinitions() {
    debug('switching to stat definitions tab');
    return this.click('#about-tab-menu > a:nth-child(2)');
  }

  async getStatDefinition(rowNumber) {
    debug(`getting stat definition at row number ${rowNumber}`);
    return this.browser.getText(`#about-page-content > div > div.ui.tab.active > div > div > div:nth-child(${rowNumber})`);
  }
}

module.exports.AboutPage = AboutPage;