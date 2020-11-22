const Debug = require('debug');
const {SettingsPage} = require('./settings');
const {MatchesPage} = require('./matches');
const {sleep} = require('./utils');

const debug = Debug('e2e:sidebar');

class Sidebar {
  constructor(app) {
    this.app = app;
    this.browser = app.client;
  }

  async navigateToSettings() {
    debug('waiting for sidebar button to be clickable')
    await this.browser.waitForVisible("#show-sidebar-button")
    await this.browser.waitForEnabled("#show-sidebar-button")

    debug('click sidebar button')
    await this.browser.click('#show-sidebar-button');


    debug('waiting for menu to stop animating')
    let lastHeight = 0;
    let lastWidth = 0;
    let counter = 0;
    while (true) {
      counter++;

      const {width, height} = await this.browser.getElementSize('#main-menu');
      debug({width, height})
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

    debug('wait for setting link to be visible')
    await this.browser.waitForVisible("#main-menu a[section-name=settings]")
    await this.browser.waitForEnabled("#main-menu a[section-name=settings]")

    debug('click settings link')
    await this.browser.click("#main-menu a[section-name=settings]");

    debug('wait for settings page to be visible')
    await this.browser.waitForVisible("#settings-page-content")

    return new SettingsPage(this.app);
  }

  async navigateToMatches() {
    throw new Error('not implemented');
    return new MatchesPage(this.app);
  }
}

module.exports.Sidebar = Sidebar;
