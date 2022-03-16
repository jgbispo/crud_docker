import mysql from 'mysql'
import dotenv from 'dotenv'

// Configuring access to environment variables
dotenv.config()

// Database connection pooling configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
})

// Exporting settings for the rest of the application
export default pool
