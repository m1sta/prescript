module.exports = {
	parse: function (inputString, inputDelims, inputOperators){
		
		//set default delimiter set
		var delimiters = {
			warm:{
				"{":"}",
				"(":")",
				"[":"]"
			},
			cold:{
				"'":"'",
				'"':'"',
				"`":"`",
				"/*":"*/",
				"//":"\n",
				"/":"/",
				"<":">"
			}
		}

		//process delims for faster access
		if(inputDelims) delimiters = inputDelims
		delimiters.all = {}
		for (var attrname in delimiters.warm) { delimiters.all[attrname] = delimiters.warm[attrname] }
		for (var attrname in delimiters.cold) { delimiters.all[attrname] = delimiters.cold[attrname] }
		var coldBlocks = Object.keys(delimiters.cold)
		var startDelims = Object.keys(delimiters.all)

		//set default operators
		if(inputOperators) operators = inputOperators
		var operators = 
			["~>",	"->",	"=>",	"<<=",	">>=",	">>>",	"===",	"!==",	">>>",	"...",	
			"+=",	"*=",	"/=",	"%=",	"&=",	"^=",	"|=",	"==",	"!=",	">=",	"<=",	"++",	"--",	"<<",	">>",	"&&",	"||",	
			"=",	">",	"<",	"%",	"-",	"+",	"&",	"|",	"^",	"~",	"!",	"?",	":",	",",	";",	"."]

		//create function used to convert a 'tree node' back into its original string
		var tokenArrayToString = function (ignore){
			//todo: use the ignore paramter to allow only inclusion of code that would be executed in the current scope
			for(var i=0, output=""; i<this.length; i++) output += this[i].toString()
			return output
		}

		var insertChildNode = function(currentNode, newValue, row, col){
			//todo: sourceRow and sourceCol properly
			var newNode = (typeof newValue == "string") ? new String(newValue) : newValue
			currentNode.splice(-1, 0, newNode)
			currentNode.sourceRow = row
			currentNode.sourceCol = col
		}

		//setup initial variables
		var input = inputString || ""
		var escapeMode = false
		var currentNode = [{BOF:true}, {EOF:true}]
		var isWhitespace = /^[\r\n\t\s]+$/
		var cold = false;
		var lineage = [currentNode]
		var buffer = ""

		//begin parsing
		for(var cursor = 0; cursor < input.length; cursor++){
			var processed = 0;
			var awaiting = currentNode.slice(-1)[0]

			//block end
			if(!escapeMode && (input.slice(cursor, cursor + awaiting.length) == awaiting)){
				if(buffer.length) {
					insertChildNode(currentNode, buffer, 0, 0)
					buffer = ""
				}
				currentNode = lineage.pop()
				processed = awaiting
				cold = false
			}

			//block start
			if(!processed && !cold)
			for(var sdi=0; sdi < startDelims.length; sdi++){
				if(input.slice(cursor, cursor + startDelims[sdi].length) === startDelims[sdi]){
					if(buffer.length) {
						insertChildNode(currentNode, buffer, 0, 0)
						buffer = ''
					}
					var start = startDelims[sdi]
					var end = delimiters.all[startDelims[sdi]]
					var newNode = [start, end]
					newNode.toString = tokenArrayToString
					insertChildNode(currentNode, newNode, 0, 0)
					lineage.push(currentNode)
					currentNode = newNode
					processed = startDelims[sdi]
					if(coldBlocks.indexOf(startDelims[sdi]) > -1) cold = true
					break
				}
			}

			//escape character (backslash)
			if(cold && input[cursor] == "\\" && cold) escapeMode = !escapeMode
			else escapeMode	 = false

			//search for operator delims
			if(!processed && !cold)
			for(var operatorId=0; operatorId < operators.length; operatorId++){
				var operator = operators[operatorId]
				if(input.slice(cursor, cursor + operator.length) === operator){
					insertChildNode(currentNode, buffer, 0, 0)
					buffer = ""
					insertChildNode(currentNode, operator, 0, 0)
					processed = operator
					break
				}
			}

			if(!processed && !cold){
				var fromWhitespace = isWhitespace.test(buffer) && !isWhitespace.test(input[cursor])
				var toWhitespace = !isWhitespace.test(buffer) && isWhitespace.test(input[cursor])

				if(false || fromWhitespace || toWhitespace) {
					insertChildNode(currentNode, buffer, 0, 0)
					buffer = input[cursor]
					processed = input[cursor]
				}
			}

			//buffer the current character if it hasn't yet been processed by another rule
			if(!processed) buffer += input[cursor]
			else cursor += processed.length - 1
		}

		//output the tree root excluding the EOF and BOF markers
		var result = lineage[0].slice(1,-1)
		result.toString = tokenArrayToString
		return result
	}
}  