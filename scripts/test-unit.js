/**
 *
 * @description running unit tests for different functions in ParkingLot class.
 *
 */
const sh = require('shelljs');

sh.exec('mocha tests/specs.js', (err, stdout, stderr) => {
    if (err) {
        console.log('Error running unit tests');
    }
    console.log('Running unit tests...');
});
