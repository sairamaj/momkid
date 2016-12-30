'use strict';
var momrestaruant = require("./momRestaruant")
var aws = require("./awsFunc")
var util = require("./util")

exports.handler = (event, context, callback) => {

    const tableName = process.env.TABLE_NAME;
    console.log("removeMenuItems: tableName:" + tableName )
    
    // menuitems/{name}
    // ( we are using LAMBDA_PROXY integration where we get pass thru)
    // If we use LAMBDA (not PROXY) then we can use Body Temlate option
    // in Api Gateway to map path parameters to first class object.
    // Currently we don't know how to use Serverless resource to create
    // LAMBDA and then Body template option :(
    var menuItem = event.path.split('/').slice(-1)[0]

    momrestaruant.removeMenuItem(tableName,menuItem,function(err,response){
        if( err){
            var respose;
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