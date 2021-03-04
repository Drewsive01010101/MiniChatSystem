console.log("hello");

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('public/data/userdata.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000;

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running'+port )
})

