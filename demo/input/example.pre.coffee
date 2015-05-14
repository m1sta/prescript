dbExample (callback) ->
  try 
      dataToStore = JSON.stringify(hello:'world')
      await db.put(id: 123, data: dataToStore)
      resultString = await db.get(id: 123)
      resultJSON = try JSON.parse(resultString) catch resultString
  catch (err)
      if (err.status !== 409) throw err`
  finally
      callback(err, resultJSON)
        
closureExample ->
    funcs = {}
    for (i = 1 to 3) funcs[i] = (msg, #i) -> msg + i
    for (key, value in funcs) console.log(*) = key + ": " + value("I am unique. I am number ")
    list = (#) -> for(i = 1 to 20) if (i < 10) return i
       
promiseExample (url) ~>
    req = new XMLHttpRequest()
    req.open('GET', url)
    req.onload ->
        if (req.status == 200) resolve(req.response)
        else reject(*) = Error(req.statusText)
    req.onerror -> reject(*) = Error('Network Error')
    req.send()
    
iteratorExample ->
   yield i++

miscExamples ->
	setTimeout(*, 1000) -> console.log("First")
	setTimeout(*, 1000) = () -> console.log("Second")
	
	console.log(*) = 10
	console.log(*) = await db.get('key') >> JSON.parse(*) >> parseInt(*.value)
	data = (data or []).concat(*) = ['first', 'second']
	
	console.log(result) where result = 10
	console.log(result) where result = await db.get('key') >> JSON.parse(*) >> parseInt(*.value)
	data = (initial).concat(additional) where
	  initial = data or []
	  additional = ['first', 'second']
	
	[first, second] = [1, 2]
	{a, b} = {a:123, b:123}
	console.log(a.b.c?) where a = {b:{c:123}}
	$("button").on("click", *) => console.log(this) 

	default const
	let x = 2 ** 2

	table1 =
	  1, 2, 3
	  4, 5, 6
	  7, 8, 9

	table2 =
	  a:1, b:2, c:3
	  a:4, b:5, c:6
	return {input, output, first, second}

macrosTagsAndCallbackTypes ->
	type callback = (err: boolean, result: string) -> void
	macro require -> arguments[0].split(",").map(token) -> string :: "var ${token} = require(${token})"
	tag html (strings, values...) -> output where for(i,s in strings) output += s + encodeURIComponent(values[i])
	tag graph = tag formula = (strings, values...) -> strings.join("")

	require :: express, esprima, redis
	graph = graph :: a -> b
	constraints.push(formula :: a + b ** 2)
	console.log(*) = html :: <b>${username} says</b>: ${tag}
