module.exports = {
	parse: function (inputString, inputBlocks, inputOperators){
		
		//set default delimiter set
		var defaultBlocks = {
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

        var defaultOperators = [
            "~>",	"->",	"=>",	"<<=",	">>=",	">>>",	"===",	"!==",	">>>",	"...",
            "+=",	"*=",	"/=",	"%=",	"&=",	"^=",	"|=",	"==",	"!=",	">=",	"<=",	"++",	"--",	"<<",	">>",	"&&",	"||",
            "=",	">",	"<",	"%",	"-",	"+",	"&",	"|",	"^",	"~",	"!",	"?",	":",	",",	";",	"."
        ]

        //process delims for faster access
		var blocks = inputBlocks ? inputBlocks : defaultBlocks
        var operators = inputOperators ? inputOperators : defaultOperators
		blocks.all = {}
		for (var attr in blocks.warm) { blocks.all[attr] = blocks.warm[attr] }
		for (var attr in blocks.cold) { blocks.all[attr] = blocks.cold[attr] }
        blocks.start = {}
		blocks.start.cold = Object.keys(blocks.cold)
		blocks.start.all = Object.keys(blocks.all)

		//create function used to convert a 'tree node' back into its original string
		var tokenArrayToString = function (){
            for(var i=0, output=""; i<this.length; i++) {
                this[i].toString = tokenArrayToString;
                output += this[i].toString()
            }
			return output
		}

		var insertChildNode = function(currentNode, newValue, row, col){
			//todo: sourceRow and sourceCol properly
			var newNode = (typeof newValue == "string") ? new String(newValue) : newValue
			currentNode.splice(-1, 0, newNode)
			currentNode.sourceRow = row
			currentNode.sourceCol = col
		}

		//token types
		//todo: add improved handling for 1e-1
		var isWhitespace = /^[\r\n\t\s]+$/

		//setup initial variables
		var input = inputString ? inputString + "\n" : "\n"
		var escapeMode = false
		var currentNode = [{BOF:true}, {EOF:true}]
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
			for(var sdi=0; sdi < blocks.start.all.length; sdi++){
				if(input.slice(cursor, cursor + blocks.start.all[sdi].length) === blocks.start.all[sdi]){
					if(buffer.length) {
						insertChildNode(currentNode, buffer, 0, 0)
						buffer = ''
					}
					var start = blocks.start.all[sdi]
					var end = blocks.all[blocks.start.all[sdi]]
					var newNode = [start, end]
					insertChildNode(currentNode, newNode, 0, 0)
					lineage.push(currentNode)
					currentNode = newNode
					processed = blocks.start.all[sdi]
					if(blocks.start.cold.indexOf(blocks.start.all[sdi]) > -1) cold = true
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