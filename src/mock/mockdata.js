const Mock = require('mockjs')
const express = require('express')
const mockRouter = express.Router()
const Random = Mock.Random

mockRouter.get('/data', (req, res) => {
  const data = {
    email: Random.email()
  }
  res.json(data)
})
mockRouter.get('/article', (req, res) => {
  const data = {
    article: Random.cparagraph(),
    name:Random.cname(),
    createTime: Mock.mock('@datetime()'),
    id: Mock.mock('@integer(60, 100)')
  }
  res.json(data)
})

module.exports = mockRouter
