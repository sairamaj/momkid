/*
    All mom restaraunt functionalities.
*/
var aws = require('./awsfunc')

function getMenuItems(callback){
    aws.readDb("momrestaruantmenu", function(err,data){
        if(err){
            callback(err,null)
        }else{
            var menuitems = []
            data.Items.forEach(function (menuitem) {
                menuitems.push(menuitem)
            });
            callback(null, menuitems)
        }
    })
}

function getOrders(callback){
    aws.readDb("momrestaruantorders", function(err,data){
        if(err){
            callback(err,null)
        }else{
            var orders = []
            data.Items.forEach(function (order) {
                orders.push(order)
            });

            callback(null, orders)
        }
    })
}

function saveOrder(confimrationId,menuitem,callback){
    var confirmationId  = confimrationId;
    var date = Date()
    var data = {
        "confirmationId": confimrationId,
        "menuitem": menuitem,
        "date" : date
    } 

    aws.writeDb("momrestaruantorders",data,function(err,status){
            callback(err,status)
    })
}

function addMenuItem(menuItem,callback){
    var data = {
        "name": menuItem,
    } 

    aws.writeDb("momrestaruantmenu",data,function(err,status){
            callback(err,status)
    })
}

function removeMenuItem(menuItem,callback){
    var key = {
        "name": menuItem,
    } 

    aws.deleteDb("momrestaruantmenu",key,function(err,status){
            callback(err,status)
    })
}

module.exports.getMenuItems = getMenuItems
module.exports.getOrders = getOrders
module.exports.saveOrder = saveOrder
module.exports.addMenuItem = addMenuItem
module.exports.removeMenuItem = removeMenuItem

