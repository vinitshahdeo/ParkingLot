const sh = require('shelljs'),
  chalk = require('chalk');

console.log(chalk.yellow.bold('Creating documentation using JSDoc'));

/**
 * @type {Array}
 * @description The list of files to include into documentation
 */
var LIST_OF_FILES = [
    'src/*.js',
    'src/modules/*.js'
];

const command = 'jsdoc ' + LIST_OF_FILES.join(' '); // combining all the files

sh.exec(command, (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log(chalk.red.bold('Error occured while packaging Parking Lot'));
        return 0;
    }
    else {
        console.log(chalk.green.bold('Documentation is created inside out/ folder'));
        console.log(chalk.magenta.bold('Go to out/ folder and open global.html'));
    }
});
