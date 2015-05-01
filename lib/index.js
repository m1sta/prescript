var cmd = require('commander')

//exports main transformation function
var prescript = module.exports = {
	transform: function (inputString, macros, delims){
		var parser = require('./parse.js')
		var helper = new require('./helper.js')()
		var ast = parser.parse(inputString, delims)
		if(macros) for(var i = 0; i < macros.length; i++){
			macros[i].transform(ast, helper)
		}
		var output = {ast:ast, history: helper.history}
		output.toString = function(){
			return this.ast.toString() + "\n" + helper.createBase64SourceMap()
		}
		return output
	}
}

//command line handler
cmd.option('-a, --ast', 'Display AST')
cmd.option('-o, --out', 'Display transformed output')
cmd.arguments('<inputFile> [macroFolder]')
cmd.description('Parse a source code file and run the specified macros against it')
cmd.version('0.0.1').parse(process.argv)
if(cmd.args.length) {
	var inputString = require('fs').readFileSync(cmd.args[0]).toString()
	if(cmd.args[1]){
		var macros = []
		//todo: loop through macros
		var filename = cmd.args[1]
		macros.push(require("./" + filename))
	}
	var startTime = process.hrtime()
	var output = prescript.transform(inputString, macros)
	var duration = process.hrtime(startTime)
	if(!cmd.out && !cmd.ast) console.log("Transformation completed in " + Math.floor(duration[1] * 1.0e-6) + "ms. \nUse the argument --help to learn how to review the output.")
	else {
		if(cmd.ast) console.log(JSON.stringify(output.ast, undefined, " "))
		if(cmd.out) console.log(output.toString())
	}	
}