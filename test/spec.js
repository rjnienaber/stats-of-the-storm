const { Application } = require('spectron');
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const {expect} = require('chai')
const {LoaderPage} = require('./page_objects/loader');

const REPLAY_DIR = path.join(__dirname, 'replays');

describe('Application launch', function () {
  self = this;
  this.timeout(120000);

  beforeEach(function () {
    self.app = new Application({
      path: electronPath,
      args: ['--no-sandbox', path.join(__dirname, '..'), '--appPath=test/tmp', '--replayPath=test/replays']
    })
    return self.app.start()
  })

  afterEach(function () {
    if (self.app && self.app.isRunning()) {
      return self.app.stop();
    }
  })

  // http://v4.webdriver.io/api.html
  it('loads replays', async() => {
    const loader = new LoaderPage(self.app);
    const matches = await loader.waitForMatchesPage();
    await matches.waitForLoad();

    const settings = await matches.sidebar.navigateToSettings();
    const expectedMatches = 32;
    await settings.waitForFileCount(expectedMatches);
    await settings.startParsingReplays();
    await settings.waitForReplaysToFinishParsing();
    await settings.sidebar.navigateToMatches();

    expect(await matches.totalReplays()).to.equal(expectedMatches);

    await matches.search();
    await matches.waitForSelectedReplay(expectedMatches);
    expect(await matches.rowCount()).to.equal(20);
  })

  it('loads about page', async() => {
    const loader = new LoaderPage(self.app);
    const matches = await loader.waitForMatchesPage();
    await matches.waitForLoad();

    const about = await matches.sidebar.navigateToAbout();

    expect(await about.versionNumber()).to.equal(process.env.npm_package_version)
    expect(await about.coffeeImageIsVisible()).to.be.true;

    await about.switchToStatDefinitions();
    expect(await about.getStatDefinition(1)).to.include('Granted to heroes upon an enemy hero death');
    expect(await about.getStatDefinition(12)).to.include('Physical damage dealt to all units (not just heroes).');
    expect(await about.getStatDefinition(24)).to.include('Damage taken in team fights.');
    expect(await about.getStatDefinition(36)).to.include('Passive XP % Gain is the percentage of passive exp earned above the baseline.');
    expect(await about.getStatDefinition(48)).to.include('Percentage of the match where the player had applied a form of hard CC');
  })
})
