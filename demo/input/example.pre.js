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
    for (i = 1 to 3) funcs[i] = (msg, #i) -> msg + i
    for (key, value in funcs) console.log(*) = key + ": " + value("I am unique. I am number ")
    list = (#) -> for(i = 1 to 20) if (i < 10) return i
       
interpolationExample (input) ->
    [first, second] = [1, 2]
    {a, b} = {a:123, b:123}
    console.log(a.b.c?) where a = {b:{c:123}}
    $("button").on("click", *) => console.log(this)
    return {input, output, first, second}
       
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
   data = (data or []).concat(*) = :: 'first', 'second'
    
   console.log(result) where result = 10
   console.log(result) where result = await db.get('key') >> JSON.parse(*) >> parseInt(*.value)
   data = (initial).concat(additional) where
      initial = data or []
      additional = :: 'first', 'second'
  
