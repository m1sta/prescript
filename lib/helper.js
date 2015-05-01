module.exports = function(){ 
	return {
		createBase64SourceMap: function(){
			return "//SourceMapNotImplemented. History length is " + this.history.length
		},

		history: [],

		getToken: function(ast, cursor){
			var node = ast || this
			for(var i = 0; i < cursor.length; i++) node = node[cursor[i]]
			return node
		},

		nextToken: function(ast, cursor){
			if(!cursor.length) cursor.push(0)
			else cursor[cursor.length-1]++

			var ast = ast || this
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
			return token
		},

		walk: function(ast, callback){
			var cursor = []
			while (token = this.nextToken(ast, cursor)) callback(cursor)
		},

		replace: function(ast, cursor, newValueArray){
            var node = ast || this
			for(var i = 0; i < cursor.length - 1; i++) node = node[cursor[i]]
            var deleteChar = newValueArray.length == 0 ? 1 : 0
			node.splice(cursor[i], deleteChar, newValueArray)
			this.history.push({command:"setToken", args: arguments})
			//todo: parse newValue before insertion and/or use splice
		},

		group: function(ast, startCursor, endCursor, openToken, closeToken){
			var node = ast || this
			for(var i = 0; i < startCursor.length - 1; i++) node = node[startCursor[i]]
			var startIndex = startCursor[i]
			var endIndex = endCursor[endCursor.length - 1]
			var group = node.slice(startIndex, endIndex)
            group.push(closeToken)
            group.unshift(openToken)
			node.splice(startIndex, endIndex - startIndex, group)
			this.history.push({command:"setToken", args: arguments})
		}
	}
}