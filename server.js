// eslint-disable-next-line no-undef
const express = require('express')
const app = express()

// midlewares
app.use(express.static('build'))


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const closeGracefully = async (signal) => {

  console.log(`*^!@4=> Received signal to terminate: ${signal}`)
  
  server.close()
  
  // eslint-disable-next-line no-undef
  process.kill(process.pid, signal)
}

// eslint-disable-next-line no-undef
process.once('SIGINT', closeGracefully)
// eslint-disable-next-line no-undef
process.once('SIGTERM', closeGracefully)