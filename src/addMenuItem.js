'use strict';
var momrestaruant = require("./momrestaruant")
var aws = require("./awsfunc")
var util = require("./util")

exports.handler = (event, context, callback) => {
    var menuItem = event.name;
    var response;
    momrestaruant.addMenuItem(menuItem,function(err,response){
        if( err){
            console.log(err)
            response = util.createResponse(500, err);
            context.fail(response);
        }else{
            aws.sendMenuItemAddedNotification(menuItem);
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
    exports.handler({name:"item1"}, context,null)
}

//sampleTest()