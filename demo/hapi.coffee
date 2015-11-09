#example server using hapi and prescript
default const
require :: hapi, redis, inert, consoleLogger as log

server = new hapi.server(host: 'localhost', port: 8000)
await server.register(inert) catch (err.registrationFailure)

server.route(*) =
    method: 'GET'
    path: '/hello'
    handler: (request, reply) -> reply.file('./public/hello.html')

server.route(*) =
    method: 'GET'
    path: '/counter'
        handler: (request, reply) ->
        counter = await redis.incr('counter')
        reply(*) = string :: Welcome visitor number #{counter}

await server.start() catch (err.startFailure)
if (!err) log :: Server started successfully: #{server.info.uri}
else log :: err
 
