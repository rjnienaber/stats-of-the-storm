class Stopwatch {
  static create() {
    const name = (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
    return new Stopwatch(name);
  }

  static wrap(callback) {
    const name = (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
    const stopwatch = new Stopwatch(name);
    return function() {
      stopwatch.stop();
      callback.apply(null, arguments)
    }
  }

  static time(func) {
    const name = (new Error()).stack.match(/at (\S+)/g)[1].slice(3);
    const stopwatch = new Stopwatch(name);
    try {
      return func();
    } finally {
      stopwatch.stop();
    }
  }

  constructor(name) {
    this.startTime = new Date();
    this.name = name;
  }

  stop() {
    console.log(`${new Date().toISOString()} ${this.name}: ${new Date() - this.startTime}ms`)
  }
}

function testing(value, value2) {
  console.log('testing: ' + value + ', ' + value2)
}

function main() {
  const callback = Stopwatch.wrap(testing);
  setTimeout(() => callback('one', 'two'), 1000);
}

if (require.main === module) {
  main()
}

exports.Stopwatch = Stopwatch;
