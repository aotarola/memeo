'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Inert = require('inert')
const Good = require('good')

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

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err // something bad happened loading the plugin
  }

  server.start((err) => {
    if (err) {
      throw err
    }
    server.log('info', 'Server running at: ' + server.info.uri)
  })
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
