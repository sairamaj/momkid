var should = require('should');
var fs = require("fs")
var strStream = require("string-to-stream")
var request = require("request")

var ordersApiUrl = "https://tue9tii5q1.execute-api.us-west-2.amazonaws.com/Prod/orders"

describe("orders tests",function(){
    
    var newItem = { name: "item_" + Math.floor(Math.random() * 100) + 1 }
    before(function (done) {
        // add order
        strStream(JSON.stringify(newItem)).
            pipe(request.post(ordersApiUrl, function (err, response) {
                response.statusCode.should.equal(201, "addOrder returned non 201 status." + response.statusMessage)
                console.log("added:" + JSON.stringify(newItem))
                done()
            }));
    });

    after(function(done){
        done();
    });

    it("should read added order",function(done){
        request(ordersApiUrl, function (error, response, body) {
            response.statusCode.should.equal(201, "getOrders returned non 201 status.")
            var orders = JSON.parse(body)
            console.log(orders)
            var currentlyAdded = orders.filter(function (item) {
                return item.name === newItem.name
            })
            console.log("checking:" + JSON.stringify(newItem))
            currentlyAdded.length.should.eql(1, "not found" + JSON.stringify(newItem))
            done();
        })
    });
}); 