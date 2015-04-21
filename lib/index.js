var cmd = require('commander')

//exports main transformation function
module.exports = {
	transform: function (inputString, macros, delims){
		var parser = require('./parse.js')
		var modifier = require('./modify.js')
		var ast = parser.parse(inputString, delims)
		if(macros) for(var i = 0; i < macros.length; i++){
			macro.transform(ast, modifier)
		}
		var output = {ast:ast, modifier: modifier}
		output.toString = function(){
			return this.ast.toString() + "\n" + modifier.createBase64SourceMap()
		}
		return output
	}
}

//command line handler
cmd.version('0.0.1').parse(process.argv)
if(cmd.args.length) console.log(cmd.args)