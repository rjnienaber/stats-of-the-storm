const { Application } = require('spectron');
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const {expect} = require('chai')
const {LoaderPage} = require('./page_objects/loader');

const REPLAY_DIR = path.join(__dirname, 'replays');

describe('Application launch', function () {
  self = this;
  this.timeout(60000)

  beforeEach(function () {
    self.app = new Application({
      path: electronPath,
      args: ['--no-sandbox', path.join(__dirname, '..'), '--appPath=test/tmp', '--replayPath=test/replays']
    })
    return self.app.start()
  })

  afterEach(function () {
    if (self.app && self.app.isRunning()) {
      return self.app.stop()
    }
  })

  it('loads replays', async () => {
    // http://v4.webdriver.io/api.html
    const loader = new LoaderPage(self.app);
    const matches = await loader.waitForMatchesPage();
    await matches.waitForLoad();

    const settings = await matches.sidebar.navigateToSettings();
    settings.startParsingReplays()
    await settings.waitForReplaysToFinishParsing();

    expect(matches.totalReplays).to.equal(32);
  })

  // TODO: https://circleci.com/blog/electron-testing/
})
