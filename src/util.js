/*
    generates a random string of given length.
*/
function generateRandomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function createResponse(statusCode, body){
    return {
        "statusCode": statusCode,
        "headers": {},
        "body": JSON.stringify(body)
    }
};

module.exports.generateRandomString = generateRandomString
module.exports.createResponse = createResponse
