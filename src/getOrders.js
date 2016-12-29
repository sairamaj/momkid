var momRestaruant = require("./momRestaruant")
var util = require("./util")

exports.handler = function (event, context, callback) {

    const tableName = process.env.TABLE_NAME;
    console.log("getOrders: tableName:" + tableName )

    var response;
    momRestaruant.getOrders(tableName,function(err,orders){
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

// util.sampleTest("momrestaruantorders",null,exports.handler)