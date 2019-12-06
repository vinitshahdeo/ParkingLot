/**
 * @description used to find the the platform the Parking Lot executable is being built
 */
module.exports = function () {
    var opsys = process.platform;

    if (opsys === 'darwin') {
      opsys = 'MacOS';
    }
    else if (opsys === 'win32' || opsys === 'win64') {
      opsys = 'Windows';
    }
    else if (opsys === 'linux') {
      opsys = 'Linux';
    }

    return opsys;
};
