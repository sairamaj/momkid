var momrestaruant = require("./momRestaruant")
var aws = require("./awsFunc")
var util = require("./util")

exports.handler = (event, context, callback) => {
    console.log("event" + JSON.stringify(event))
    var menuItem = event.name
    if(menuItem === undefined){
        menuItem = JSON.parse(event.body).name;
    }

    const tableName = process.env.TABLE_NAME;
    console.log("addOrder: tableName:" + tableName )

    var confirmationNumber = util.generateRandomString(15)
    momrestaruant.saveOrder(tableName,confirmationNumber,menuItem,function(err,response){
        var response;
        if(err){
            console.log(err)
            response = util.createResponse(500, err);
            console.log("returing response:" + response)
            context.fail(response);
        }else{
            response.confirmation = confirmationNumber
            response.name = menuItem
            response = util.createResponse(201, response);
            aws.sendOrderNotification(menuItem);
            context.succeed(response);
        }
    }) 
};

// util.sampleTest("momrestaruantorders",{name:"pasta"},exports.handler)
// util.sampleTest("momkid-cert-OrderTable-13WIS9LXNDTY5",{body:"{\"name\":\"itemz\"}"},exports.handler)
