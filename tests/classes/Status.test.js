var Status = require('../../src/classes/Status');
var expect = require('expect.js');

describe('Status', function () {
  it('getStatusFromFile should be a function', function () {
    expect(typeof Status.getStatusFromFile).to.equal('function');
  });

  it('checkFileExist should be a function', function () {
    expect(typeof Status.checkFileExist).to.equal('function');
  });

  it('setStatus should be a function', function () {
    expect(typeof Status.setStatus).to.equal('function');
  });
});