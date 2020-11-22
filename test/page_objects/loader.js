const Debug = require('debug');
const {MatchesPage} = require('./matches');
const {Sidebar} = require('./sidebar');
const {sleep} = require('./utils');

const debug = Debug('e2e:loaderPage');

class LoaderPage {   
  constructor(app) {
    this.app = app;
    this.browser = app.client;
  }

  async waitForMatchesPage() {
    debug('looking for main browser window')
    let count = 0
    for (const handle of (await this.browser.windowHandles()).value) {
      count++
      this.browser.window(handle);
      const results = await Promise.all([
        this.browser.isVisible('#main-app-loader'),
        this.browser.isVisible("#matches-page-header")
      ])
      
      if (results.some(Boolean)) {
        break;
      }

      if (count >= 20) {
        throw new Error("Couldn't find loader");
      }

      await sleep(1000);
    }

    debug('waiting for match screen to appear')
    await this.browser.waitForVisible("#matches-page-header");

    return new MatchesPage(this.app, new Sidebar(this.app));
  }
}

module.exports.LoaderPage = LoaderPage;
