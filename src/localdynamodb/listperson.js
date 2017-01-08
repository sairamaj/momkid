'use strict'
var AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-west-2',
    endpoint: "http://localhost:8000"
})

var docClient = new AWS.DynamoDB.DocumentClient()
var params = {
    TableName: "Person"
}

docClient.scan(params, function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
