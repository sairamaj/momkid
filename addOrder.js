var momrestaruant = require("./momrestaruant")
var aws = require("./aws")
var util = require("./util")

exports.handler = (event, context, callback) => {
    var confirmationNumber = util.generateRandomString(15)
    var menuItem = event.name
    momrestaruant.saveOrder(confirmationNumber,menuItem,function(err,response){
        if(err){
            callback(err,null)
        }else{
            response.confirmation = confirmationNumber
            response.name = menuItem
            aws.sendOrderNotification(menuItem);
            callback(null,response)
        }
    }) 
};

function sampleTest(){
    var request = { "name":"Pasta"}
    exports.handler(request, null,function(err,response){
        if(err){
            console.log(err)
        }else{
            console.log(response)
        }
    })
}

//sampleTest()