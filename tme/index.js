const Runner = require('./runner');

const runner = new Runner();

const run = async () => {
    await runner.collectFiles(process.cwd())
    console.log(this.collectFiles)

}

run()