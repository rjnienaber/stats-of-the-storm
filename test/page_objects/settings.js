const {Sidebar} = require('./sidebar');

class SettingsPage {
  constructor(app, sidebar) {
    this.app = app;
    this.browser = app.client;
    this.sidebar = sidebar;
  }

  startParsingReplays() {
    throw new Error('not implemented');
  }

  async waitForReplaysToFinishParsing() {
    throw new Error('not implemented');
  }






}

module.exports.SettingsPage = SettingsPage;


// TypeError: Sidebar is not a constructor
// at new SettingsPage (test\page_objects\settings.js:7:20)
// at Sidebar.navigateToSettings (test\page_objects\sidebar.js:11:12)
// at Context.it (test\spec.js:34:44)
// at process._tickCallback (internal/process/next_tick.js:68:7)
