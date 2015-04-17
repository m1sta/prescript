
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
        
closureExample ->
    funcs = {}
    for (i in 1 to 3) funcs[i] = (msg, #i) -> msg + i
    for (key, value in funcs) console.log(*) = key + ": " + value("I am ")
    list = (#) -> for(i = 1 to 20) if (i<10) return i
       
 interpolationExample (input) ->
    output = "Wrapped #{input}"
    [first, second] = [1,2]
    console.log(a.b.c?) where a = {b:{c:123}}
    return {input, output, first, second}
       

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
        
closureExample ->
    funcs = {}
    for (i in 1 to 3) funcs[i] = (msg, #i) -> msg + i
    for (key, value in funcs) console.log(*) = key + ": " + value("I am ")
    list = (#) -> for(i = 1 to 20) if (i < 10) return i
       
interpolationExample (input) ->
    output = "Wrapped #{input}"
    [first, second] = [1, 2]
    {a, b} = {a:123, b:123}
    console.log(a.b.c?) where a = {b:{c:123}}
    return {input, output, first, second}
    $("button").on("click", *) => console.log(this)
       
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

chainExample ->
   setTimeout(*, 1000) -> console.log("First")
   setTimeout(*, 1000) = () -> console.log("Second")
   
   console.log(*) = 10
   console.log(*) = await db.get('key') >> JSON.parse(*) >> parseInt(*.value)
   data = (data or []).concat(*) = 'first', 'second'
    
   console.log(result) where result = 10
   console.log(result) where 
      result = await db.get('key') >> JSON.parse(*) >> parseInt(*.value)
   data = (base).concat(list) where
      base = data or []
      list = 'first', 'second'
  
   
   
  
/*
   bracket free blocks

bracket free arrays
bracket free object literals
automatic variable declaration
inline try catch
finally access to catch parameters
hoisted arrow functions
shorthand arrow function assignment
multi-purpose for-in with access to 'to' operator
array generation with 'to' operator
IIFE generation character with optonal automatic closure using # parameters
asterix/assignment function invocation
string destrucuring keyword
tilde arrow promise generation with re-assignable resolve and reject (arguments like)
automatic async and generator keyword inclusion on yield and await keyword use
output chaining using asterix and double-right-arrow
assignment linked blocks using 'where' keyword
fat arrow functions
jsx, flow type annotations, and javascript passthrough, coffeeblock


coffeescript + babel but without bracketless function invocation, complier has flag for target environment
existensial operator
*/
