import express from "express"
import ip from 'ip'
import dotenv from 'dotenv'
import cors from 'cors'

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
  res.send({ message: 'UP' })
})

// Stating server
app.listen(PORT, () => {
  console.log(`Server is runing on: http://${ip.address()}:${PORT}`)
})
