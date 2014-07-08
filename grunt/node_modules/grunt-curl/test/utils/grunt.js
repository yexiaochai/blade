// Load in dependencies
var exec = require('child_process').exec;
var quote = require('shell-quote').quote;

exports.runTask = function (task) {
  before(function runTask (done) {
    // Relocate to test directory
    process.chdir(__dirname + '/..');

    // Execute the cmd and task combination
    var that = this;
    this.timeout(5000);
    exec(quote(['grunt', task]), function (err, stdout, stderr) {
      // Save results for later
      that.err = err;
      that.stdout = stdout;
      that.stderr = stderr;

      // Callback
      done();
    });
  });

  after(function cleanupTask () {
    delete this.err;
    delete this.stdout;
    delete this.stderr;
  });
};
