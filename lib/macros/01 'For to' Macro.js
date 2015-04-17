module.exports = function(ast, modifier){
	ast.walk(
		function(token){
			if(token.value == '->') modifier.replace(token, [" ","function"," "])
		}
	)
} 
