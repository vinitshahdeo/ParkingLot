/**
 * @fileOverview This test specs runs tests on the package.json file of repository. It has a set of strict tests on the
 * content of the file as well. Any change to package.json must be accompanied by valid test case in this spec-sheet.
 */
var _ = require('lodash'),
  path = require('path'),
  expect = require('chai').expect,
  fs = require('fs'),
  parseIgnore = require('parse-gitignore');

/* global describe, it */
describe('Parking Lot repository', function () {
  var presentFiles = require('./utils/infra'),
    allowedFiles = require('./utils/data').listOfAllowedFiles;

  allowedFiles = allowedFiles.map((file) => {
    return `${path.join(__dirname, '..')}/${file}`;
  });

  describe('contains', function () {
    it('only allowed files and folders', function () {
      expect(_.difference(allowedFiles, presentFiles)).to.eql([]);
    });
  });
  describe('does not contain', function () {
    it('unwanted files and folders', function () {
      expect(_.difference(allowedFiles, presentFiles)).to.eql([]);
    });
  });
  describe('must contain', function () {
    it('npm/ folder', function () {
      fs.existsSync('../scripts');
    });
    it('src/ folder', function () {
      fs.existsSync('../src');
    });
    it('tests/ folder', function () {
      fs.existsSync('../tests');
    });
  });

  describe('package.json', function () {
    var content,
      json;

    try {
      content = fs.readFileSync('./package.json').toString();
      json = JSON.parse(content);
    }
    catch (e) {
      console.error(e);
      content = '';
      json = {};
    }

    it('must have readable JSON content', function () {
      expect(content).to.be.ok;
      expect(json).to.not.eql({});
    });

    describe('package.json JSON data', function () {
      it('must have valid name, author and license', function () {
        expect(json).to.have.property('name', 'parking_lot');
        expect(json).to.have.property('author', 'Vinit Shahdeo <vinitshahdeo@gmail.com>');
        expect(json).to.have.property('license', 'ISC');
      });

      it('must have proper keywords', function () {
        expect(json).to.have.property('keywords');
        expect(json.keywords).to.eql([
            'parking',
            'lot',
            'gojek',
            'nodejs',
            'oops'
        ]);
      });

      it('must have a valid version string in form of <major>.<minor>.<revision>', function () {
        expect(json.version).to.match(/^((\d+)\.(\d+)\.(\d+))(?:-([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?(?:\+([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?$/);
      });
    });

    describe.skip('dependencies', function () {
      it('must exist', function () {
        expect(json.dependencies).to.be.a('object');
      });

      it('must point to a valid and precise (no * or ^) semver', function () {
        json.dependencies && Object.keys(json.dependencies).forEach(function (item) {
          expect(json.dependencies[item]).to.match(new RegExp('^((\\d+)\\.(\\d+)\\.(\\d+))(?:-' +
            '([\\dA-Za-z\\-]+(?:\\.[\\dA-Za-z\\-]+)*))?(?:\\+([\\dA-Za-z\\-]+(?:\\.[\\dA-Za-z\\-]+)*))?$'));
        });
      });
    });

    describe('devDependencies', function () {
      it('must exist', function () {
        expect(json.devDependencies).to.be.a('object');
      });

      it('must point to a valid and precise (no * or ^) semver', function () {
        json.devDependencies && Object.keys(json.devDependencies).forEach(function (item) {
          expect(json.devDependencies[item]).to.match(new RegExp('^((\\d+)\\.(\\d+)\\.(\\d+))(?:-' +
            '([\\dA-Za-z\\-]+(?:\\.[\\dA-Za-z\\-]+)*))?(?:\\+([\\dA-Za-z\\-]+(?:\\.[\\dA-Za-z\\-]+)*))?$'));
        });
      });

      it.skip('should not overlap dependencies', function () {
        var clean = [];

        json.devDependencies && Object.keys(json.devDependencies).forEach(function (item) {
          !json.dependencies[item] && clean.push(item);
        });

        expect(Object.keys(json.devDependencies)).to.eql(clean);
      });
    });

  });

  describe('README.md', function () {
    it('must exist', function (done) {
      fs.stat('./README.md', done);
    });

    it('must have readable content', function () {
      expect(fs.readFileSync('./README.md').toString()).to.be.ok;
    });
  });

  describe('config.json', function () {
    it('must exist', function (done) {
      fs.stat('./src/config/config.js', done);
    });
    it('must have readable content', function () {
      expect(fs.readFileSync('./src/config/config.js').toString()).to.be.ok;
    });
  });

  describe('.ignore files', function () {
    var gitignorePath = '.gitignore',
      gitignore = parseIgnore(gitignorePath);

    describe(gitignorePath, function () {
      it('must exist', function (done) {
        fs.stat(gitignorePath, done);
      });

      it('must have valid content', function () {
        expect(_.isEmpty(gitignore)).to.not.be.ok;
      });

      it('must include build ,dist, coverage, node_modules folders', function () {
        expect(_.includes(gitignore, ['build/', 'dist/', 'out', 'coverage/', 'node_modules/']));
      });
    });

  });

  describe('.eslintrc', function () {
    it('must exist', function (done) {
      fs.stat('./.eslintrc.js', done);
    });

    it('must have readable content', function () {
      expect(fs.readFileSync('./.eslintrc.js').toString()).to.be.ok;
    });
  });

});
