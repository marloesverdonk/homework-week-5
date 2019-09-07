const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser.json()

const app = express()
app.use(parserMiddleware)
app.post(
  '/messages',
  (request, response) => {
    if (request.body.text === "" || !request.body.text) {
      response.json("Bad Request")
    } else {
      console.log(request.body.text)
      response.json({
        "message": "Message received loud and clear"
      })
    }
  }
)

app.listen(port, () => console.log(`listening on port ${port}`))

