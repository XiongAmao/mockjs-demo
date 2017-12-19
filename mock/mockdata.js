import Mock from 'mockjs'

Mock.setup({
  timeout: '200-1000'
})
var Random = Mock.Random

const data = Mock.mock(
  '/api/data',
  (req, res) => {
    return {
      email: Random.email(),
      name: Random.cname(),
      email2:'@email',
    }
  }
)
export default {
  data
}
