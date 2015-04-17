x = -> 123
x -> 123
x() -> 123
x(a) -> a * 123
x(a, b) -> (a + b) * 123
x = -> {return 123}
x -> {return 123}
x() -> {return 123}
x(a) -> {return a * 123}
x(a, b) -> {return (a + b) * 123}

x = => 123
x => 123
x() => 123
x(a) => a * 123
x(a, b) => (a + b) * 123
x = => {return 123}
x => {return 123}
x() => {return 123}
x(a) => {return a * 123}
x(a, b) => {return (a + b) * 123}

x = ~> 123
x ~> 123
x() ~> 123
x(a) ~> a * 123
x(a, b) ~> (a + b) * 123
x = ~> {return 123}
x ~> {return 123}
x() ~> {return 123}
x(a) ~> {return a * 123}
x(a, b) ~> {return (a + b) * 123}

something.x(a,b) -> (a + b) * 123
something.x = (a,b) -> {return 123 + a + b}


