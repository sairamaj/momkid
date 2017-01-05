/*
    generates a random string of given length.
*/
function generateRandomString (len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var randomString = ''
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}

function createResponse (statusCode, body) {
  return {
    'statusCode': statusCode,
    'headers': {},
    'body': JSON.stringify(body)
  }
};

function sampleTest (tableName, input, testFun) {
  process.env.TABLE_NAME = tableName
  var context = {}
  context.succeed = function (resp) {
    console.log(resp)
  }
  context.fail = function (resp) {
    console.log(resp)
  }
  testFun(input, context, null)
}

module.exports.generateRandomString = generateRandomString
module.exports.createResponse = createResponse
module.exports.sampleTest = sampleTest
