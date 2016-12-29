'use strict';
var momrestaruant = require("./momRestaruant")
var aws = require("./awsFunc")
var util = require("./util")

exports.handler = (event, context, callback) => {

    var menuItem = event.name
    if(menuItem === undefined){
        var menuItem = JSON.parse(event.body).name;
    }

    const tableName = process.env.TABLE_NAME;
    console.log("removeMenuItems: tableName:" + tableName )

    var respose;
    momrestaruant.removeMenuItem(tableName,menuItem,function(err,response){
    if( err){
            console.log(err)
            response = util.createResponse(500, err);
            context.fail(response);
        }else{
            aws.sendMenuItemRemovedNotification(menuItem);
            response = util.createResponse(200, event);
            context.succeed(response);
        }        
    });
} 

// util.sampleTest("momrestaruantmenu",{name:"item1"},exports.handler)