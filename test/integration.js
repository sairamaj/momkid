var should = require('should');

describe('getMenuItems', function () {

    before(function (done) {
        console.log("in before")
        done()
    });

    after(function (done) {
        console.log("in after")
        done()
    });

    it('should get more than one menu item.', function (done) {
        console.log("in test");
        var items = ["item1","item2"]
        items.length.should.eql(2)
        done();
    });
});