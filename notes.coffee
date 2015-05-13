#support typescript-like type annotations and tag/macro-like string expressions
type callback = (error: boolean, result: string) => number
dsl graph = (input) => input
inline formula = (input) => input
tag = (input) => input

#dsl macros run at compile time and then optionally can get access to runtime params if the macro dev outputs a function
#inline macros are functions that will be inlined for execution at runtime
#if a macro name does not match but a function has been defined just define like a tag

#string expression with processing function defined as expression prefix
constraints.push(formula :: a * b + y) // function(e){body}("a * b + y")
constraints.push(graph :: a -> b)
constraints.push(*) = graph :: a -> b
constraints.push(graph :: placeholder) where placeholder = 
   a -> b
   b -> c

#string expression with processing function defined as variable suffix
constraint :: string = a * b + hello
query :: sql = select * from db where x is null

#question: should always put after expression to make parsing of dictionary literal easier?
var x = 2 ** 2 //Math.pow() 
default const
