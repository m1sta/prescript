module.exports = {
	parse: function (inputString, inputDelims){
		
		//set default delimiter set
		var input = inputString || ''
		var delims = inputDelims || {
			warmBlock:{
				"{":"}",
				"(":")",
				"[":"]"
			},
			coldBlock:{
				"'":"'",
				'"':'"',
				"`":"`",
				"//":"\n",
				"/":"/",
				"/*":"*/",
				"<":">"
			}
		}
		var re = {
			word: /^(([a-zA-Z_$][0-9a-zA-Z_$]*)|([0-9.]*)|(0x[0-9a-f]+))$/,
			whitespace: /^[\s]+$/
		}

		//create function used to convert a 'tree node' back into its original string
		var tokenArrayToString = function (ignore){
			//todo: use the ignore paramter to allow only inclusion of code that would be executed in the current scope
			for(var i=0, output=""; i<this.length; i++) output += this[i].toString()
			return output
		}

		//setup initial variables
		var location = {line:0, column: 0} //todo: use for sourcemaps
		var blockDelims = {}
		var escapeMode = false
		for (var attrname in delims.warmBlock) { blockDelims[attrname] = delims.warmBlock[attrname]; }
		for (var attrname in delims.coldBlock) { blockDelims[attrname] = delims.coldBlock[attrname]; }
		var coldBlocks = Object.keys(delims.coldBlock)
		var startDelims = Object.keys(blockDelims)
		var currentNode = [{BOF:true}, {EOF:true}]
		var cold = false;
		var lineage = [currentNode]
		var buffer = ""

		//parse the input string
		for(var cursor = 0; cursor < input.length; cursor++){
			var processed = 0;
			var awaiting = currentNode.slice(-1)

			//block end
			if(!escapeMode && (input.slice(cursor, cursor + awaiting.length) == awaiting)){
				if(buffer.length) {
					currentNode.splice(-1, 0, buffer)
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
						currentNode.splice(-1, 0, buffer)
						buffer = ''
					}
					var start = startDelims[sdi]
					var end = blockDelims[startDelims[sdi]]
					var newNode = [start, end]
					newNode.toString = tokenArrayToString
					currentNode.splice(-1, 0, newNode)
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

			//all other tokens (variables, numbers, operators)
			if(!processed && !cold){
				var bufferIsWhitespace = re.whitespace.test(buffer)
				var bufferIsWord = re.word.test(buffer)
				var bufferIsOperator = !bufferIsWhitespace && !bufferIsWord
				var nextIsWhitepace = re.whitespace.test(buffer + input[cursor])
				var nextIsWord = re.word.test(buffer + input[cursor])
				var nextIsOperator = !nextIsWhitepace && !nextIsWord

				var endWhitespace = bufferIsWhitespace && !nextIsWhitepace
				var endWord = bufferIsWord && !nextIsWord
				var endOperator = bufferIsOperator && !nextIsOperator

				if(endWhitespace || endWord || endOperator){
					if(buffer.length) currentNode.splice(-1, 0, buffer)
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
