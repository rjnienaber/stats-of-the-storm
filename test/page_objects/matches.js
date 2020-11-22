class MatchesPage {
  constructor(app, sidebar) {
    this.app = app;
    this.browser = app.client;
    this.sidebar = sidebar;
  }

  waitForLoad() {
    this.browser.waitForVisible("#matches-page-header", 20000);
  }

  async totalReplays() {
    throw new Error('not implemented');
  }

  
}

module.exports.MatchesPage = MatchesPage;
