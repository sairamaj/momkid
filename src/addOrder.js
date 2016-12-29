var momrestaruant = require("./momrestaruant")
var aws = require("./aws")
var util = require("./util")

exports.handler = (event, context, callback) => {
    var confirmationNumber = util.generateRandomString(15)
    var menuItem = event.name
    momrestaruant.saveOrder(confirmationNumber,menuItem,function(err,response){
        var response;
        if(err){
            console.log(err)
            response = util.createResponse(500, err);
            context.fail(response);
        }else{
            response.confirmation = confirmationNumber
            response.name = menuItem
            aws.sendOrderNotification(menuItem);
            context.succeed(response);
        }
    }) 
};

function sampleTest(){
    var context = {}
    context.succeed = function(resp){
        console.log(resp)
    }
    exports.handler({name:"item1"}, context,null)
}

//sampleTest()