var macro = module.exports = {
	transform: function(ast, helper){

		var tabToSpaceRatio = 8
		var tabToSpace = new Array(tabToSpaceRatio + 1).join("")
		var indentationHeirachy = []
		var isWs = /^[\r\n\t\s]+$/

		helper.walk(ast, function(cursor){
			var token = helper.getToken(ast, cursor)
            if(!token) throw new Error("Invalid token")
			if(isWs.test(token)){
				var indentationLength = token.slice(token.lastIndexOf("\n")).replace(/\t/g, tabToSpace).split(" ").length
				if(!indentationHeirachy[0] || indentationLength - indentationHeirachy[0].length > 1){
					//open braces
					indentationHeirachy.unshift({length:indentationLength, start:helper.cloneCursor(cursor)})

				} else {
					//close braces
					if(indentationHeirachy[0] && indentationLength - indentationHeirachy[0].length < -1){
                        var startCursor = indentationHeirachy[0].start
                        var endCursor = cursor
                        var node = helper.getNode(ast, startCursor)
                        var startIndex = startCursor[startCursor.length - 1]
                        var endIndex = endCursor[endCursor.length - 1]
                        var group = node.slice(startIndex, endIndex)
                        var braceIndentation = new Array(indentationHeirachy[0].length + 1).join(" ")
                        group.push("\n"+ braceIndentation)
                        group.push("}")
                        group.unshift("{")
                        var replacementNode = [" ", group]
                        var jumpCursor = helper.replace(ast, startCursor, endCursor, replacementNode)
                        indentationHeirachy.shift()
                        return jumpCursor
					}
				}
			}
		})
		//todo: de-duplicate where braces already existed
	}
}