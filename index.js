let express = require('express')
let bp = require('body-parser')
let server = express()
let PORT = 3000

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//above is usually always the same ^
//------------------------------------------

server.get('/', (req, res, next) => {
  res.send("hello good friends")
})

//this imports the router we built up within the dogs.js file
let dogRoutes = require('./routes/dogs')

//this tells our server to use that router that we pulled in from dogs.js
server.use('/api/dogs', dogRoutes)




server.listen(PORT, () => {console.log('server is running on port', PORT)})