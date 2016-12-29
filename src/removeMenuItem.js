'use strict';
var momrestaruant = require("./momrestaruant")
var aws = require("./aws")

exports.handler = (event, context, callback) => {
    var menuItem = event.name;
    var respose;
    momrestaruant.removeMenuItem(menuItem,function(err,response){
    if( err){
            console.log(err)
            response = util.createResponse(500, err);
            context.fail(response);
        }else{
            aws.sendMenuItemRemovedNotification(menuItem);
            response = util.createResponse(200, menuItem);
            context.succeed(response);
        }        
    });
} 

function sampleTest(){
    var context = {}
    context.succeed = function(resp){
        console.log(resp)
    }
    exports.handler(null, context,null)
}

//sampleTest()