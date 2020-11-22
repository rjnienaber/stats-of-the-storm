const Debug = require('debug');
const {BasePage} = require('./base');
const {Sidebar} = require('./sidebar');
const { sleep } = require('./utils');

const debug = Debug('e2e:settings');

class SettingsPage extends BasePage {
  constructor(app, sidebar) {
    super(app, debug);
    this.sidebar = sidebar;
  }

  async startParsingReplays() {
    let counter = 0;
    while (true) {
      counter++;
      try {
        await this.click('#start-process-button');
        break;
      } catch (err) {
        if (!err.message.includes('is not clickable at')) {
          throw err;
        }

        if (counter >= 20) {
          throw err;
        }
      }

      await sleep(100);
    }
  }

  async waitForReplaysToFinishParsing() {
    debug('waiting for replays to parse');
    const count = await this.fileCount();
    return this.browser.waitUntil(async () => {
      for (let i = 1; i <= count; i++) {
        const html = await this.browser.getHTML(`#replay-file-list > tbody > tr:nth-child(${i}) > td.replay-status`, false);
        if (html !== 'Success') {
          debug(`replays parsed: ${i - 0}`)
          return false;
        }
      }

      return true;
    }, 60000, 'timed out waiting for replay files to parse', 1000);
  }

  async fileCount() {
    const rows = await this.browser.elements('#replay-file-list tbody > tr');
    return rows.value.length;
  }

  waitForFileCount(expectedNumber) {
    return this.browser.waitUntil(async () => {
      const fileCount = await this.fileCount();
      return fileCount === expectedNumber;
    }, 10000, 'timed out waiting for replay file count', 100);
  }
}

module.exports.SettingsPage = SettingsPage;
