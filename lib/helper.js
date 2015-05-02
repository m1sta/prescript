module.exports = function(){ 
	return {
		createBase64SourceMap: function(){
			return "//SourceMapNotImplemented. History length is " + this.history.length
		},

		history: [],

		getToken: function(ast, cursor){
			return this.getNode(ast, cursor)[cursor[cursor.length - 1]]
		},

        getNode: function(ast, cursor){
            var node = ast || this
            for(var i = 0; i < cursor.length - 1; i++) node = node[cursor[i]]
            return node
        },

		nextToken: function(ast, inputCursor){
            var cursor = this.cloneCursor(inputCursor)
			cursor[cursor.length-1]++
			var token =  this.getToken(ast, cursor)
			if (!token) {
				if(cursor.length > 1){
					cursor.pop()
					cursor[cursor.length-1]++
					token = this.getToken(ast, cursor)
				} else token = undefined
			} else if (token.push) {
				cursor.push(0)
				token = this.getToken(ast, cursor)
			}
			return {cursor:cursor, token:token}
		},

		walk: function(ast, callback){
            var jumpCursor, cursor = [0]
			do {
                var nextTokenResult = this.nextToken(ast, cursor)
                cursor = nextTokenResult.cursor
                if(nextTokenResult.token) do jumpCursor = callback(cursor)
                while(cursor = jumpCursor || cursor, jumpCursor)
            } while (nextTokenResult.token)
		},

        cloneCursor: function(cursor) {
            var outputCursor = []
            for (var i = 0; i < cursor.length; i++) outputCursor.push(cursor[i])
            if(cursor.toString() != outputCursor.toString()) throw "Cursor clone failed"
            return outputCursor
        },

        replace: function(ast, startCursor, endCursor, newValueArray){
            var node = this.getNode(ast, startCursor)
            var startLoc = startCursor[startCursor.length - 1]
            var endLoc =  endCursor[endCursor.length - 1]
            var deleteNodes = endLoc - startLoc
            var spliceArgs = [startLoc, deleteNodes].concat(newValueArray)
            var oldValue = node.slice(startLoc, endLoc)
            node.splice.apply(node, spliceArgs)
            var outputCursor = this.cloneCursor(endCursor)
            outputCursor[outputCursor.length - 1] = endLoc - deleteNodes + newValueArray.length
            this.history.push({start:startCursor, end:endCursor, old:oldValue, new:newValueArray})
            return outputCursor
		}
	}
}