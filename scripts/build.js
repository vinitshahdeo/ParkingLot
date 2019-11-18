const sh = require('shelljs'),
  fs = require('fs'),
  chalk = require('chalk'),
  pkg = require('../package.json'),
  host = require('./utils/findHost')();

console.log(chalk.yellow.bold('Packaging the Parking Lot Console Application for host platform'));

sh.exec('pkg ./src/index.js -t host --out-path bin', (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log(chalk.red.bold('Error occured while packaging Parking Lot'));
        return 0;
    }
    else {
        fs.rename('./bin/index', './bin/parking_lot', function (err) {
            if (err) {
                console.log(chalk.red.bold('Error occured while renaming the executable'));
            }
            else {
                console.log(chalk.green.bold('Parking Lot (version : ' + pkg.version + ') is created successfully for ' + host + ' in "bin/" folder'));
            }
        });
    }
});


