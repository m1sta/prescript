function test(x, y, #i, #j){
	return "function that accepts x and y with i and j closed over"
}

function test(#i, #j){
	return "function with i and j closed over"
}

function test(#){
	return "executes iife and returns value. does not return function"
}