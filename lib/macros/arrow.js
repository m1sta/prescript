var macro = module.exports = {
	transform: function(ast, helper){
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
}