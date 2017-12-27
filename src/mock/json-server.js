const jsonServer = require('json-server')
const path = require('path')

const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

module.exports = function(app){
  app.use(middlewares)
  app.get('/test/json', (req, res)=>{
    res.jsonp({
      yes:'me'
    })
  })
  app.use(router)
}
