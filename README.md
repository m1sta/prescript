# Introducing Prescript
Prescript is a framework for running macros over code that will eventually become javascript. It includes a number of beautiful macros out of the box. These are listed below with an example of their usage available [here](example.js). 

Prescript does its best not to touch any code that does not explicitly match a defined macro pattern. This way it works well with other languages and transpilers, including Babel.js. All valid javascript, Typescript, and JSX should work with Prescript without modification in Prescript. When you decide you want to make use of a Prescript macro, just start using it - you don't need to make any bold efforts to learn learn and transition to a new language.

### Bracket free block
Whitespace defined blocks are wrapped in curly brackets `{}` if they were left out. Think Coffeescript, Ruby, or Python.

### Bracket free dictionary
Lists of colon delimited pairs are wrapped in curly brackets `{}` when used in direct assignment or when wrapped in curved brackets `()`. Eg. `dict = a:b, c:d, e:f` or `fn(a:b, c:d)`

### Bracket free array
Lists of comma separated expressions are wrapped in square brackets `[]` when used in direct assignment eg. `list = a, b, c`

### Automatic variable declaration
Variables are automatically defined. This can be configured to only apply to variables defined in loop declarations and catch statements.

### Inline try/catch
Allows individual expressions to be easily wrapped in a try/catch statement with the catch returning a default value. Eg. `try JSON.parse(string) catch undefined`

### Skinny arrow functions with optional hoisting
Skinny arrow functions are standard functions. They will become function declarations instead of function expressions where possible. As function declarations they benefit from function hoisting. Eg. `hoistedFn (params) -> body`

### Shorthand function assignment
Use of an equals sign during function definition and assignment is optional. Eg. `obj.prop -> body`

### For-of conversion to capture both key and value
For-of loops can be defined to extract both key and value at the same time by providing a second variable name when the loop is declared. Eg. `for key, value of dict`

### Array sequence and for loop support using 'to' keyword
A list of values in a sequence can be defined using the `to` keyword. The `to` keyword can also be used to define standard for loops. Eg.  `for x of 1 to 5`

### Postfix scope blocks using the 'where' keyword
Code blocks to be run immediatley before an assignment or function invocation can be defined after the assignment or function invocation. Eg.  `x = a + 10 where a = 5`

### IIFE generation
Functions declarations containing variables marked with a `#` will be automatically wrapped in a IIFE and closure. Simple IIFEs can also be generated using the `(#) -> expression` syntax. Eg  `fn = (a, #b) -> body`

### Asterix based function invocation
The asterix character can be used as a placeholder during function invocation with the eventual value defined using the assignment `=` character. Eg.  `console.log(*) = "Hello World"`

### Result chaining
The result of one expression can be automatically passed to another expression by combining the `>>` operator and asterix characters. eg. `score = JSON.parse(input) >> parseInt(*.value) + 12`

### Automatic function prefix creation
The words `generator` and `async` will automatically be included as a prefixes to function declarations where the keywords `yield` and `await` are found within a function body.

### Promise function shorthand
Functions defined using the tilde-arrow `~>` will automatically be wrapped in a `new Promise(body)`. eg.`get (url) ~> resolve(data)`

### Existensial check
Deep properties of an object can be extracted without fear of `cannot read property of undefined` by placing a single question mark at the end of a property list. eg. `a.b.c.d?`

Prescript is pre-alpha and not ready for usage in any context. Pull requests and other contributions welcome.
