var assert = require('assert')
var pretext = require('../lib/index.js')

//everything below here is just for testing during early development
function testFunction(){
	'Hello This Is World'
	var x = 0 + 10       * 30
	var obj = {a:123, b:456}
	obj["c"] = 789
	/* this is a multi
	line comment
	*/
	function another(){
		console.log(test)
		// this is a comment ((asd)ss)
	}
}

if(true){
	var result
	test1 = testFunction.toString()
	result = pretext.transform(test1.toString())
	//console.log (JSON.stringify(result, null, 4))
	//console.log (result.toString())
	it('the input string should match the output string', function(){
		assert.equal(test1, result.toString().slice(0, test1.length))
	})
}

if(false){
	var test2 = require('fs').readFileSync('io/example1.txt').toString()
	console.log(test2.length)
	result = pretext.transform(test2)
	console.log (JSON.stringify(result, null, 4))
	console.log (result.toString())
}