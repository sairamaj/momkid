exports.handler = function(event,context,callback){
    var body = [
        { name:"bob"}, {name:"john"}
    ]
    var response = {
    'statusCode': 200,
    'headers': {},
    'body': JSON.stringify(body)
  }
    context.succeed(response)
}