import fly from './fly.js'

const request = {}

request.test = async () => {
  const result = await fly.get('/testa')
  console.log('/request/index.js request.test')
  if (!result) return
  return result
}

export default request
