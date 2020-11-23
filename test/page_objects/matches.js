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

  async selectedReplays() {
    debug('getting selected replays from search');
    const count = await this.browser.getHTML('#matches-selected', false)
    return parseInt(count, 10);
  }

  async rowCount() {
    debug('getting row count in match table');
    const rows = await this.browser.elements('table#match-list tr');
    return rows.value.length;
  }

  async totalReplays() {
    debug('getting total replays in database');
    const count = await this.browser.getHTML('#matches-in-database-stat', false)
    return parseInt(count, 10);
  }

  search() {
    debug('click search button');
    this.click('#match-search-button');
  }

  waitForSelectedReplay(expectedNumber) {
    return this.browser.waitUntil(async () => {
      const count = await this.selectedReplays();
      return count === expectedNumber;
    }, 5000, 'timed out waiting for expected selected replay count', 100);
  }
}

module.exports.MatchesPage = MatchesPage;
