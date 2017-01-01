var should = require('should');
var fs = require("fs")
var strStream = require("string-to-stream")
var request = require("request")

var menuItemsApiUrl = "https://0ra06lyvq0.execute-api.us-west-2.amazonaws.com/Prod/menuitems"

describe('menuItems tests ', function () {
    this.timeout(15000);
    var newItem = { name: "item_" + Math.floor(Math.random() * 100) + 1 }
    before(function (done) {
        // add menuitem
        strStream(JSON.stringify(newItem)).
            pipe(request.post(menuItemsApiUrl, function (err, response) {
                response.statusCode.should.equal(201, "addMenuItem returned non 201 status.")
                console.log("added:" + JSON.stringify(newItem))
                done()
            }));
    });

    after(function (done) {
        var url = menuItemsApiUrl + "/" + newItem.name
        console.log(url)
        request.del(url, function (err, response) {
            response.statusCode.should.equal(200, "removeMenuItem returned non 200 status.")
            //console.log(response.body)
            console.log("removed:" + JSON.stringify(newItem))
            done()
        });
    });

    it('should get currenlty added new menu item.', function (done) {

        request(menuItemsApiUrl, function (error, response, body) {
            response.statusCode.should.equal(200, "getMeuItems returned non 200 status.")
            var menuItems = JSON.parse(body)
            console.log(menuItems)
            var currentlyAdded = menuItems.filter(function (item) {
                return item.name === newItem.name
            })
            console.log("checking:" + JSON.stringify(newItem))
            currentlyAdded.length.should.eql(1, "not found" + JSON.stringify(newItem))
            done();
        })
    });
});