'use strict';
var momrestaruant = require("./momrestaruant")
var aws = require("./aws")

exports.handler = (event, context, callback) => {
    var menuItem = event.name;
    momrestaruant.addMenuItem(menuItem,function(err,response){
        if(err){
            callback(err,null)
        }else{
            aws.sendMenuItemAddedNotification(menuItem);
            response.name = menuItem
            callback(null,response)
        }
    });
} 

function sampleTest(){
    var request = { "name":"Pasta1"}
    exports.handler(request, null,function(err,response){
        if(err){
            console.log(err)
        }else{
            console.log(response)
        }
    })
}

//sampleTest()