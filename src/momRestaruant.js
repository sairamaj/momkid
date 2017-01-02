/*
    All mom restaraunt functionalities.
*/
var aws = require('./awsFunc')

function getMenuItems (tableName, callback) {
  aws.readDb(tableName, function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      var menuitems = []
      data.Items.forEach(function (menuitem) {
        menuitems.push(menuitem)
      })
      callback(null, menuitems)
    }
  })
}

function getOrders (tableName, callback) {
  aws.readDb(tableName, function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      var orders = []
      data.Items.forEach(function (order) {
        orders.push(order)
      })

      callback(null, orders)
    }
  })
}

function saveOrder (tableName, confimrationId, menuitem, callback) {
  var date = Date()
  var data = {
    'confirmationId': confimrationId,
    'menuitem': menuitem,
    'date': date
  }

  aws.writeDb(tableName, data, function (err, status) {
    callback(err, status)
  })
}

function addMenuItem (tableName, menuItem, callback) {
  var data = {
    'name': menuItem
  }

  aws.writeDb(tableName, data, function (err, status) {
    callback(err, status)
  })
}

function removeMenuItem (tableName, menuItem, callback) {
  var key = {
    'name': menuItem
  }

  aws.deleteDb(tableName, key, function (err, status) {
    callback(err, status)
  })
}

module.exports.getMenuItems = getMenuItems
module.exports.getOrders = getOrders
module.exports.saveOrder = saveOrder
module.exports.addMenuItem = addMenuItem
module.exports.removeMenuItem = removeMenuItem

