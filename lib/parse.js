module.exports = {
	parse:function (inputString, inputDelims){
		
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
			},
			operator: [
			'\n', ' ', '\t', '\r', 
			'->', '=>', '~>', ',', ';', '>>', '=',
			"+", "^", "-", "*", "/", ".", ":", ">", "<"
			]
		}

		//create function used to convert a 'tree node' back into its original string
		var tokenArrayToString = function (){
			for(var i=0, output=""; i<this.length; i++) output += this[i].toString()
			return output
		}

		//setup initial variables
		var lineNumber = 0; //todo: use this counter to implement source mapping.
		var isWhitespace = /^[\s]+$/
		var blockDelims = {}
		for (var attrname in delims.warmBlock) { blockDelims[attrname] = delims.warmBlock[attrname]; }
		for (var attrname in delims.coldBlock) { blockDelims[attrname] = delims.coldBlock[attrname]; }
		var coldBlocks = Object.keys(delims.coldBlock)
		var operatorDelims = delims.operator
		var startDelims = Object.keys(blockDelims)
		var currentNode = [{BOF:true}, {EOF:true}]
		var cold = false;
		var lineage = [currentNode]
		var buffer = ""

		//parse the file
		for(var cursor = 0; cursor < input.length; cursor++){
			var processed = 0;
			var awaiting = currentNode.slice(-1)

			//block end
			//todo: handle escaped slash before block close eg. "\\" by adding escape-toggle variable
			if((input.slice(cursor - 1, cursor) !== "\\") && (input.slice(cursor, cursor + awaiting.length) == awaiting)){
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

			//search for operator delims
			if(!processed && !cold)
			for(var sdi=0; sdi < operatorDelims.length; sdi++){
				if(input.slice(cursor, cursor + operatorDelims[sdi].length) === operatorDelims[sdi]){

					//if both current and previous characters were whitespace
					if(buffer.length) {
						currentNode.splice(-1, 0, buffer)
						buffer = ""
					}
					if(isWhitespace.test(currentNode[currentNode.length - 2]) && isWhitespace.test(operatorDelims[sdi])) currentNode[currentNode.length - 2] += operatorDelims[sdi]
					else currentNode.splice(-1, 0, operatorDelims[sdi])
					processed = operatorDelims[sdi]
					break
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
