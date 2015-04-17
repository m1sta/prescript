function test(){
	await x()
} 
function test(){
	yield x()
}
function test(){
	if(true){
		await x()
	}
}
function test(){
	if(true){
		yield x()
	}
}
function test(){
	function inner(){
		await x()
	}
	yield x()
}
function test(){
	function inner(){
		yield x()
	}
	await x()
}
