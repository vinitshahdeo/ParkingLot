/**
 * @description the list of allowed files for Postman Interceptor.
 * system tests will fail if any files/folders other than these exist
 */
module.exports = {
    listOfAllowedFiles: [
        '.eslintrc.js',
        '.gitignore',
        'README.md',
        'scripts/test-lint.js',
        'scripts/test-system.js',
        'scripts/test-unit.js',
        'scripts/test.js',
        'scripts/utils/data.js',
        'scripts/utils/infra.js',
        'package.json',
        'package-lock.json',
        'src/index.js',
        'src/modules/car.js',
        'src/modules/parkingLot.js',
        'src/utils/utils.js',
        'src/config/config.js',
        'tests/specs.js'
    ]
};
