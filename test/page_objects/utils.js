function sleep(waitInMilliseconds) {
  return new Promise((resolve) => setTimeout(resolve, waitInMilliseconds));
}

module.exports.sleep = sleep;
