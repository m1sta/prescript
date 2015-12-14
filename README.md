# Introducing Prescript
Prescript is a framework for running macros over code that will eventually become javascript. It includes a number of beautiful macros out of the box.

**[View an example of code written with the out-of-the-box PreScript Macro's here.](demo/input/example.pre.coffee)**. 

Prescript does its best not to touch any code that does not explicitly match a defined macro pattern. Any valid javascript is acceptable in a prescript file without modification. When you decide you want to make use of a Prescript macro, just start using them, one at a time - you don't need to make any bold efforts to learn learn and transition to a new language.

![Example](demo/example1.png)

### Bracket free block and automatic semi-colon insertion
Whitespace defined blocks are wrapped in curly brackets `{}` if they were left out. The result is that the code looks a little Python, Ruby, or well written Coffeescript, if you want it to.

### IIFE generation
Functions declarations containing variables marked with a `#` will be automatically wrapped in an IIFE ensuring a closure is created around the `#` marked parameters. Eg  `fn = (intParam, #extParam) -> body`. Simple IIFEs can also be generated using the `(#) -> doImmediately()` syntax. Simple generator IIFEs (ie. those that use the `yield` keyword) will automatically flush to an array Eg. 
```coffeescript
oneToTen = (#) -> for(x = 1 to 10) yield x
```

### Automatic function prefix creation and promise function shorthand
The `*` (the generator function marker) and `async` will automatically be included as a prefixes to function declarations where the keywords `yield` and `await` are found within a function body. This feature also allows you to notionaly use arrow function syntax while creating async and generator functions. Functions defined using the tilde-arrow `~>` will automatically be wrapped in a `new Promise(function(resove,reject){})`. eg.

```coffeescript
get (url) ~> if(true) resolve(data) else reject("Error")
```

### Skinny arrows, hoisting, and function assignment shorthand
Skinny arrow functions are simply shorthand for the standard function keyword. They'll be translated into hoisted function declarations if assigned directly to a variable defined in the current scope. Eg. `hoistedFn = (params) -> fnBody`. Shorthand function assignment means you can exclude the assignment character (`=`) when assigning an anonymous function to property or variable. Eg. `hoistedFn -> fnBody` or `obj.prop(arg1, arg2) => fnBody`.

### Postfix scope blocks
Code blocks to be run immediatley before an assignment or function invocation can be defined after the assignment or function invocation. Eg.  `x = add(a, 10) where a = multiply(3,7)`. This is most useful where a function has a complex call signature.

Another posfix option simply uses the assignment character (`=`) a function invocation on the left-hand-side Eg. `console.log() = "Hello World"`. In these situations, the right-hand-side will be passed as an additional argument to the function when it is exected. To pass the right-hand-side as an argument in a specific position, use the asterix character Eg. `setTimeout(*, 1000) => alert("Hello")`. Another common pattern where this is useful is `router.get('/path') = (req, res) => res.end("Done")`.

### Automatic variable declaration
Variables can be set to automatically be defined within the scope that they are first used, using either var, let, or const. This can be configured to only apply to variables defined in loop declarations and catch statements. It is recommended to use semantic-colouring in your IDE if you have this feature enabled for cover all variables. Eg. `default const`. Automatic variable declaration can also be switched off for a scope using `default undefined`.

### Block bounded multi-line array definition
Tables of data can be defined using a shorthand syntax by defining a block after an assignment (`=`). Each line within the block *not ending in a comma* is considered a new element of a parent array. Lists's of dictionaries can be created using this syntax too  eg.

```coffeescript
let table1  = 
    "A1", "B1", "C1"
    "A2", "B2", "C2"
    
let table2 = 
    a:1, b:1, c:1
    a:2, b:2, c:2
```

### Inline try/catch
Allows individual expressions to be easily wrapped in a try/catch statement with the catch returning a default value. Eg. `try JSON.parse(string) catch {error: 'poorly formed json'}`

### Bracket free object literals
Lists of colon delimited pairs are wrapped in curly brackets `{}` when used in direct assignment or when wrapped in curved brackets `()`. Eg. `dict = a:b, c:d, e:f` or `fn(a:b, c:d)`

### Existensial check and conditional assignment
Deep properties of an object can be extracted without fear of `cannot read property of undefined` by placing a single question mark at the end of a property list. eg. `a.b.c.d?`. A new `?=` operator sets variables to a value only if that variable is not currently `undefined` Eg. `myArg ?= 10`.

### Cast operator for tags, macros, and embedded dsls
Macros and string template 'tags' can be defined with near-identical syntax. The former are processed at compile and inlined. Note the `macro`, `tag` keywords below which are used to define a tag or macro, and the cast operator `::` in the example below. The `::` operator can also be used for expression typecasting with a static type checker like Flow or Typescript Eg. `x = string :: getResult()` . 

```coffeescript
macroExample ->
	#the only difference between macros and tags are that macros run at compile time
	macro require = (strings) -> strings[0].split(",").map(token) -> `var ${token} = require(${token})\n`
	tag jsx {*} = (strings, values) -> strings.map(token) -> values[token] || token
	tag i8n {{*}} = (strings, values, tokens) -> translations[config.language][strings.join("")].replaceAll(tokens, values)

	require :: express, esprima, redis
	graph = graph :: a -> b
	constraints.push(formula :: a + b ** 2)
	console.log(*) = jsx :: <span><b>{username} says</b>: {message}</span>
	console.log(*) = i8n :: "Hello {{username}}" #quotes are optional
	
	import {sql, promisify} from 'utils'
	query = sql :: select * from table1
	result = await promisify :: http.request(options)
```
An important additional benefit of the `::` operator is that it can be used by IDEs and static processors to help identify how to colour and validate embedded non-javascript syntax (think of it a little like a file extension but for a string expression). Where necessary, new typescript/flow-style types can be defined using the standard type syntax Eg. `type callback = (error:boolean, result:string) -> void` or using the cast operator Eg. `type callback = (boolean :: error, string :: result) -> void`.

### For loops access both key and value, and a 'to' keyword for ranges
For-in loops can be defined to extract both key and value at the same time by providing a second variable name when the loop is declared. This feature exists to reduce confusion between for-of and for-in. Eg. `for (key, value in dict)`. The `to` keyword can be used to define standard for loops. Eg. `for (x = 0 to array.length)`

### Result chaining
The result of one expression can be automatically passed to another expression by combining the `>>` operator and asterix `*` characters. eg. `score = await db.get(input) >> JSON.parse(*) >> parseInt(*.value) / 100`.

### Expect keyword
The `expect` keyword has been proposed to define a block structure containing information relevant at development time. This includes function parameter types, function return types, and textual descriptions of actions, and tests themselves. This feature is not currently in development but is being considered.

Prescript is pre-alpha and not ready for usage in any context. Pull requests and other contributions welcome.
