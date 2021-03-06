dbExample (callback) ->
  try 
      dataToStore = JSON.stringify(hello:'world')
      await db.put(id: 123, data: dataToStore)
      resultString = await db.get(id: 123)
      resultJSON = try JSON.parse(resultString) catch resultString
  catch (err)
      if (err.status !== 409) throw err
  finally
      callback(err, resultJSON)
        
iifeExample ->
    funcs = {}
    for (i = 1 to 3) funcs[i] = (msg, #i) -> msg + i
    for (key, value in funcs) console.log(*) = key + ": " + value("I am unique. I am number ")
    list = (#) -> for(i = 1 to 20) if (i < 10) yield i #IIFE generator functions will be flushed into an array
       
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
	param ?= 10 #equivalent to param = param == undefined ? 10 : param
	$("button").on("click", *) => console.log(this) 

	default const
	let x = 2 ** 2
	type callback = (err:boolean, result:any) -> void
	doubles = singles.map(token) -> token * 2

	table1 =
	  1, 2, 3
	  4, 5, 6
	  7, 8, 9

	table2 =
	  a:1, b:2, c:3
	  a:4, b:5, c:6
	  
	return {input, output, first, second}

macros ->
	#the only difference between macros and tags are that macros run at compile time
	macro require = (strings) -> strings[0].split(",").map(token) -> `var ${token} = require(${token})\n`
	tag graph, formula = (strings, values) -> strings.join("")
	tag jsx {*} = (strings, values) -> strings.map(token) -> values[token] || token
	tag i8n {{*}} = (strings, values, tokens) -> translations[config.language][strings.join("")].replaceAll(tokens, values)

	require :: express, esprima, redis
	graph = graph :: a -> b
	constraints.push(formula :: a + b ** 2)
	console.log(*) = jsx :: <span><b>{username} says</b>: {message}</span>
	console.log(*) = i8n :: "Hello {{username}}" #quotes are optional
	
	import {sql, promisify} from 'utils'
	query = sql :: select * from table where criteria = true
	result = await promisify :: http.get(url) #macro to promisify an async function with the err, result callback
