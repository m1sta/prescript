var x = try JSON.parse("") catch {error: "Failed to parse JSON"}
function test(){
	return try JSON.parse("") catch {error: "Failed to parse JSON"}
}
