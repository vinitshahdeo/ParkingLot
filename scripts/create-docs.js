/**
 *
 * @description creates documentation for the code using JSDoc in out/ folder
 *
 */

const sh = require('shelljs'),
  chalk = require('chalk');

/**
 * @type {Array}
 * @description The list of files to include into documentation
 */
var LIST_OF_FILES = [
    'src/*.js',
    'src/modules/*.js'
];

const command = 'jsdoc ' + LIST_OF_FILES.join(' '); // combining all the files

console.log(chalk.yellow.bold('Creating documentation using JSDoc...\n'));

sh.exec(command, (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log(chalk.red.bold('Error occurred while packaging Parking Lot\n'));
        return 0;
    }
    else {
        console.log(chalk.green.bold('Success! Documentation is created inside out/ folder\n'));
        console.log(chalk.bgMagenta.bold('Go to out/ folder and open global.html\n'));
    }
});
