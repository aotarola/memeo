'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Inert = require('inert')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
})

server.connection({
  host: 'localhost',
  port: 8080
})

server.register(Inert, () => {})

server.start(err => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: 'index.html'
  }
})

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('hola!')
})
