const fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    parseIgnore = require('parse-gitignore'),
    recursive = require('recursive-readdir-synchronous'),
    directoryPath = path.join(__dirname, '../../');

let ignoreFiles = parseIgnore(fs.readFileSync('.gitignore'));

ignoreFiles = ignoreFiles.map((file) => {
    if (file.endsWith('/')) {
        file = file.slice(0, -1);
    }
    return file;
});

// pushing .git as it doesn't exist in .gitignore
ignoreFiles.push('.git');

let isIgnored = (file) => { return _.includes(ignoreFiles, path.basename(file)); },
    presentFiles = recursive(directoryPath, [isIgnored]);

module.exports = presentFiles;
