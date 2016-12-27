var fs = require('fs')
var glob = require("glob")
var zip = new require("node-zip")()
var zipFileName = "momrestarauntlambda.zip"
if( fs.exists(zipFileName)){
    fs.unlinkSync(zipFileName)
}
glob('*.js', function(err,files){
    if(err){
        console.log(err)
    }else{
        files.filter( function(file){
            return file !== "zipit.js"  // don't do thoi files'
            //return file !== "getMenuItems.js"  // don't do thi files'
 
        }).forEach(file=>{
            console.log(" adding " + file)
            var js = zip.file(file,fs.readFileSync(file))
        })
        
        var data = zip.generate({base64:false,compression:'DEFLATE'});
        fs.writeFile(zipFileName,data,'binary')

        console.log(zipFileName + " has been saved")
    }
})


