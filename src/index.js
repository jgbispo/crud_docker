import express from "express"
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'

import Response from './domain/response.js'
import logger from './util/logger.js'
import HttpStatus from './controller/patient.controller.js'

// Configuring access to environment variables
dotenv.config()

// Getting the port on which the server runs
const PORT = process.env.PORT || 1603
const app = express() // Initializing express

// Booting midware
app.use(cors({ origin: '*' }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {

  const response = new Response(
    HttpStatus.OK.code,
    HttpStatus.OK.status,
    'Patient API, v1.0.0 - All System Go'
  )

  res.send(response)
})

// Stating server
app.listen(PORT, () => {
  logger.info(`Server is running on: http://${ip.address()}:${PORT}`)
})
