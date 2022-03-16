import express from "express"
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'

import Response from './domain/response.js'
import logger from './util/logger.js'
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

  const patients = {
    fist_name: "João Gustavo",
    last_name: "Soares Bispo",
    email: "jgbispo20@gmail.com",
    phone: "+5527998558423",
    address: "Rua do Exemplo, ExemploBairro - ExempCity/MG - 2838219 Brasil",
    diafnosis: "Nenhum",
    image_url: "http:www.imgens.com",

  }
  const response = new Response(200, 'OK', 'Patient API, v1.0.0 - All System Go', patients)

  res.send(response)
})

// Stating server
app.listen(PORT, () => {
  logger.info(`Server is running on: http://${ip.address()}:${PORT}`)
})
