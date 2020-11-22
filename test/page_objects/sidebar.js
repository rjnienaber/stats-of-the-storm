const Debug = require('debug');
const {BasePage} = require('./base');
const {SettingsPage} = require('./settings');
const {MatchesPage} = require('./matches');
const {sleep} = require('./utils');

const debug = Debug('e2e:sidebar');

class Sidebar extends BasePage  {
  constructor(app) {
    super(app, debug);
  }

  async navigateToSettings() {
    await this.click("#show-sidebar-button")

    debug('waiting for menu to stop animating')
    let lastHeight = 0;
    let lastWidth = 0;
    let counter = 0;
    while (true) {
      counter++;

      const {width, height} = await this.browser.getElementSize('#main-menu');
      if (width === lastWidth && height === lastHeight) {
        break;
      }

      if (counter >= 10) {
        throw new Error('timed out waiting for sidebar menu to be usable');
      }

      lastHeight = height;
      lastWidth = width;
      await sleep(100);
    }

    await this.click("#main-menu a[section-name=settings]")

    debug('wait for settings page to be visible')
    await this.browser.waitForVisible("#settings-page-content")

    return new SettingsPage(this.app, this);
  }

  async navigateToMatches() {
    await this.click("#show-sidebar-button")

    debug('waiting for menu to stop animating')
    let lastHeight = 0;
    let lastWidth = 0;
    let counter = 0;
    while (true) {
      counter++;

      const {width, height} = await this.browser.getElementSize('#main-menu');
      if (width === lastWidth && height === lastHeight) {
        break;
      }

      if (counter >= 10) {
        throw new Error('timed out waiting for sidebar menu to be usable');
      }

      lastHeight = height;
      lastWidth = width;
      await sleep(100);
    }

    await this.click("#main-menu a[section-name=matches]")

    debug('wait for matches paget to be visible');
    await this.browser.waitForVisible("#matches-page-header");

    return new MatchesPage(this.app, this);
  }
}

module.exports.Sidebar = Sidebar;
