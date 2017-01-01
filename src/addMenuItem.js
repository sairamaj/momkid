'use strict';
var momrestaruant = require("./momRestaruant")
var aws = require("./awsFunc")
var util = require("./util")

exports.handler = (event, context) => {
    console.log("event" + JSON.stringify(event))
    var menuItem = event.name
    if(menuItem === undefined){
        menuItem = JSON.parse(event.body).name;
    }

    const tableName = process.env.TABLE_NAME;
    console.log("addMenuItems: tableName:" + tableName )
    console.log("event:" + event)
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log("menuitem :" + menuItem)

    momrestaruant.addMenuItem(tableName, menuItem,function(err,response){
        var response;
        
        if( err){
            console.log(err)
            response = util.createResponse(500, err);
            console.log("returing response:" + response)
            context.fail(response);
        }else{
            console.log("sending notification.")
            aws.sendMenuItemAddedNotification(menuItem);
            response = util.createResponse(201, {name:menuItem});
            context.succeed(response);
        }
    });
} 

//sutil.sampleTest("momrestaruantmenu",{body:"{\"name\":\"itemz\"}"},exports.handler)
//util.sampleTest("momrestaruantmenu",{name:"itemxx"},exports.handler)