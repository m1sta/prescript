var macro = module.exports = {
	transform: function(ast, helper){

		var tabToSpaceRatio = 8
		var tabToSpace = new Array(tabToSpaceRatio + 1).join("")
		var indentationHeirachy = []
		var clone = function(o){return JSON.parse(JSON.stringify(o))}
		var isWs = /^[\r\n\t\s]+$/

		helper.walk(ast, function(cursor){

			var token = helper.getToken(ast, cursor)
			if(isWs.test(token)){
				//todo: don't insert braces where they already exist by checking previous token
				var indentationLength = token.slice(token.lastIndexOf("\n")).replace(/\t/g, tabToSpace).split(" ").length
				if(!indentationHeirachy[0] || indentationLength - indentationHeirachy[0].length > 1){
					//open braces
					indentationHeirachy.unshift({length:indentationLength, start:clone(cursor)})

				} else {
					//close braces
					while(indentationHeirachy[0] && indentationLength - indentationHeirachy[0].length < -1){
                        helper.replace(ast, cursor, [new Array(indentationLength + 1).join(""), token])
                        cursor[cursor.length -1]++ //todo: replace this line with a helper.incrementCursor
						helper.group(ast, indentationHeirachy[0].start, cursor, "{", "}")
						indentationHeirachy.shift()
					}
				}
			}
		})
		//todo: handle eof
	}
}