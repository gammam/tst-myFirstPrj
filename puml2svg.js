var plantuml = require('node-plantuml');
var fs = require('fs');
 
var gen = plantuml.generate("./diagrams/sd_pagamento_presso_ec.puml",{format: "svg"});
gen.out.pipe(fs.createWriteStream("./diagrams/sd_pagamento_presso_ec.svg"));