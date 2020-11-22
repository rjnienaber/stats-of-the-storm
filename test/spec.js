const { Application } = require('spectron');
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

const REPLAY_DIR = path.join(__dirname, 'replays');

describe('Application launch', function () {
  self = this;
  this.timeout(20000)

  beforeEach(function () {
    self.app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: electronPath,

      // Assuming you have the following directory structure

      //  |__ my project
      //     |__ ...
      //     |__ main.js
      //     |__ package.json
      //     |__ index.html
      //     |__ ...
      //     |__ test
      //        |__ spec.js  <- You are here! ~ Well you should be.

      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: ['--no-sandbox', path.join(__dirname, '..'), 'testing']
    })
    return self.app.start()
  })

  afterEach(function () {
    if (self.app && self.app.isRunning()) {
      return self.app.stop()
    }
  })

  it('shows an initial window', async () => {
    const count = await self.app.client.getWindowCount()
    assert.equal(count, 2)
  })

  // TODO: https://circleci.com/blog/electron-testing/
})