import express from "express"
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'

import Response from './domain/response.js'
import logger from './util/logger.js'
import HttpStatus from './controller/patient.controller.js'

import patient_router from './router/patient.route.js'

// Configuring access to environment variables
dotenv.config()

// Getting the port on which the server runs
const PORT = process.env.PORT || 1603
const app = express() // Initializing express

// Booting midware
app.use(cors({ origin: '*' }))
app.use(express.json())

// Routes
app.use('/patients', patient_router)

app.all('/', (req, res) => {
  res.send(new Response(HttpStatus.OK.status, HttpStatus.OK.code, `Patient API, v1.0.0 - All System Go `))
})

app.get('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.status, HttpStatus.NOT_FOUND.code, `Not Found Route`))
})

// Stating server
app.listen(PORT, () => {
  logger.info(`Server is running on: http://${ip.address()}:${PORT}`)
})
