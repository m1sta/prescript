/*var macro = module.exports = function(ast, modifier){
	var counter = 0
	var cursor = []
	while (token = ast.nextToken(cursor)) {
		if(token.toLowerCase() === "if") ast.replace(cursor, token.toLowerCase())
	}
} */

var macro = module.exports = function(ast, helper){
	var pattern1 = {
		word: /.*/,
		arrow: /[-=~]>/,
		block: ["{","}"]
	}
	var pattern2 = {
		word: /.*/,
		arrow: /[-=~]>/,
		expression: /[^\n;]/
	}

	helper.find(pattern1, function(match){
		//match.word.insertBefore("function"," ")
		match.arrow.replace("= function()")
		match.expression.replace("{ return ", match.expression.value, "}")
	})
}

function getToken(cursor, ast){
	var token = ast || this
	for(var i = 0; i < cursor.length; i++) token = token[cursor[i]]
	return token
}

function nextToken(cursor, ast, skipWhitespace, moveCursor){

	if(!cursor.length) cursor.push(0)
	else cursor[cursor.length-1]++

	var ast = ast || this
	var token =  ast.token(cursor)

	if (!token) {
		if(cursor.length > 1){
			cursor.pop()
			cursor[cursor.length-1]++
			token = ast.token(cursor)
		} else token = undefined
	} else if (token.push) {
		cursor.push(0)
		token = ast.token(cursor)
	}
	return token
}

var ast = [1,2,3, [4,5,6, [7,8], 9], 10, 11]
ast.token = getToken
ast.nextToken = nextToken
macro(ast, undefined)