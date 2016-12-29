var momrestaruant = require("./momRestaruant")
var aws = require("./awsFunc")
var util = require("./util")

exports.handler = (event, context, callback) => {

    const tableName = process.env.TABLE_NAME;
    console.log("addOrder: tableName:" + tableName )

    var confirmationNumber = util.generateRandomString(15)
    var menuItem = event.name
    momrestaruant.saveOrder(tableName,confirmationNumber,menuItem,function(err,response){
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

// util.sampleTest("momrestaruantorders",{name:"pasta"},exports.handler)