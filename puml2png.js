var plantuml = require('node-plantuml');
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, 'diagrams');
const outDirectoryPath = path.join(__dirname, '_docs','diagrams');

if (!fs.existsSync(outDirectoryPath)) {
    fs.mkdirSync(outDirectoryPath,{recursive:true});
}


//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
	
	pumlFiles = files.filter(function(e){
		return path.extname(e).toLowerCase() === '.puml'
	})
	
	console.log('start generate images');
	pumlFiles.forEach(function(file) {
		var pos = file.lastIndexOf(".");
	    pngFile = file.substr(0, pos < 0 ? file.length : pos) + ".png";
	   
		var gen = plantuml.generate(path.join(directoryPath,file),{format: "png"});
		gen.out.pipe( fs.createWriteStream(path.join(outDirectoryPath,pngFile)) );
		console.log(file + '->' + pngFile);

	})
});






