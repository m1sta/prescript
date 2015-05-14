#string expression with processing function defined as variable suffix
constraint :: string = a * b + hello
query :: sql = select * from db where x is null

#question: should always put after expression to make parsing of dictionary literal easier?

default const
let x = 2 ** 2

type callback  = (err: boolean, result: string) -> void
macro require -> arguments[0].split(",").map(token) -> string :: "var ${token} = require(${token})"
html (strings, values...) -> return output where for(i,s in strings) output += s + encodeURIComponent(values[i])

require :: express, esprima, redis
graph = graph :: a -> b
constraints.push(formula :: a + b ** 2)
console.log(*) = html :: <b>{username} says</b>: {tag}