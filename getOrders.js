exports.handler = function (event, context, callback) {

    var momRestaruant = require("./momrestaruant")

    momRestaruant.getOrders( function(err,orders){
        if( err){
            console.log(err)
        }else{
            callback(null,orders)
        }
    })
}

function sampleTest(){
    exports.handler(null, null,function(err,response){
        if(err){
            console.log(err)
        }else{
            console.log(response)
        }
    })
}

//sampleTest()