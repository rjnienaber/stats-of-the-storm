const Debug = require('debug');
const {BasePage} = require('./base');

const debug = Debug('e2e:matches');

class MatchesPage extends BasePage {
  constructor(app, sidebar) {
    super(app, debug);
    this.sidebar = sidebar;
  }

  waitForLoad() {
    debug('waiting for page header to be visible');
    this.browser.waitForVisible("#matches-page-header");
  }

  async totalReplays() {
    debug('getting total replays in database');
    const count = await this.browser.getHTML('#matches-in-database-stat', false)
    return parseInt(count, 10);
  }
}

module.exports.MatchesPage = MatchesPage;
