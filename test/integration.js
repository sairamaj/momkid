var should = require('should');
var fs = require("fs")
var strStream = require("string-to-stream")
var request = require("request")

describe('getMenuItems', function () {
    var ramdomItem = "item_" + Math.floor(Math.random() * 100) + 1  
    var item = "{\"name\":\"}" + randomItem + "\"}"; 
    before(function (done) {
        // add menuitem
        console.log("adding menuitem")
        strStream(item).pipe(process.stdout)
        //strStream("{name:\"item\"}").pipe(request.post("https://wstho6rba2.execute-api.us-west-2.amazonaws.com/Prod/menuitems"))
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