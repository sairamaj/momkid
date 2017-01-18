var momRestaruant = require('./momRestaruant')
var util = require('./util')

// adding a comment for demo
// adding 2nd comment to show that
// this will be deployed in 10mins.
exports.handler = function (event, context, callback) {
  const tableName = process.env.TABLE_NAME
  console.log('getMenuItems: tableName:' + tableName)
  var response
  momRestaruant.getMenuItems(tableName, function (err, menuItems) {
    if (err) {
      console.log(err)
      response = util.createResponse(500, err)
      context.fail(response)
    } else {
      response = util.createResponse(200, menuItems)
      context.succeed(response)
    }
  })
}

// util.sampleTest("momrestaruantmenu",null,exports.handler)
