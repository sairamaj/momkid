exports.handler = function (event, context, callback) {

    var momRestaruant = require("./momrestaruant")
    var util = require("./util")

    var response;
    momRestaruant.getMenuItems( function(err,menuItems){
        if( err){
            console.log(err)
            response = util.createResponse(500, err);
            context.fail(response);
        }else{
            response = util.createResponse(200, menuItems);
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