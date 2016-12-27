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
    exports.handler(null, null,function(err,response){
        if(err){op
            console.log(err)
        }else{
            console.log(response)
        }
    })
}

//sampleTest()