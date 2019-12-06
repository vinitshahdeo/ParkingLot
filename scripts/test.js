/**
 *
 * @description runs all the tests i.e. unit tests, lint tests and system tests.
 * the test fails if any of the above test suites fail.
 *
 */
const sh = require('shelljs'),
    chalk = require('chalk'),
    async = require('async');

async.series([
    function runSystemTests (next) {
        console.log('Running system tests');
        sh.exec('npm run test-system', (err, stdout, stderr) => {
            if (err) {
                console.log('Error running system tests');
                return next(err);
            }
            return next(null);
        });
    },
    function runLintTests (next) {
        console.log('Running lint tests');
        sh.exec('npm run test-lint', (err, stdout, stderr) => {
            if (err) {
                console.log('Error running ESLint tests');
                return next(err);
            }
            return next(null);
        });
    },
    function runUnitTests (next) {
        console.log('Running unit tests');
        sh.exec('npm run test-unit', (err, stdout, stderr) => {
            if (err) {
                console.log(chalk.red('Error running unit tests'));
                return next(err);
            }
            return next(null);
        });
    }
], (err) => {
    if (err) {
        console.log(chalk.red('Tests failed!'));
    }
    else {
        console.log(chalk.green.bold('All the tests has passed successfully'));
    }
});
