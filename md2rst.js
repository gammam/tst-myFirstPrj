var pandoc = require('node-pandoc')
const path = require('path');
const fs = require('fs');

//joining path of directory 
const outDirectoryPath = path.join(__dirname, '_docs','pages');
if (!fs.existsSync(outDirectoryPath)) {
    fs.mkdirSync(outDirectoryPath,{recursive:true});
}



const stdArgs ='-f markdown -t rst';


//passsing directoryPath and callback function
fs.readdir(path.join(__dirname,'pages'), function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    markdownFiles = files.filter(function(e){
		return path.extname(e).toLowerCase() === '.md'
	})
	
	markdownFiles.forEach(function(file){
		var pos = file.lastIndexOf(".");
	    rstFile = file.substr(0, pos < 0 ? file.length : pos) + ".rst";
		outFile=path.join(outDirectoryPath, rstFile);
		console.log(file + '-> '+ outFile)
		args = stdArgs + ' -o ' + outFile;
		pandoc(path.join(__dirname,'pages',file), args,function(err,result){
			if (err) console.log('unable to convert :' + err);
			return result;
		});
	})
});


    