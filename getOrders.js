exports.handler = function (event, context, callback) {

    var momRestaruant = require("./momrestaruant")
    var util = require("./util")

    momRestaruant.getOrders( function(err,orders){
        if( err){
            console.log(err)
            response = util.createResponse(500, err);
            context.fail(response);
        }else{
            response = util.createResponse(200, orders);
            context.succeed(response);
        }
    })
}

function sampleTest(){
    var context = {}
    context.succeed = function(resp){
        console.log(resp)
    }
    exports.handler(null, context,null)
}

//sampleTest()