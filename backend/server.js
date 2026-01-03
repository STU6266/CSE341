// server.js
const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 8080

// Global middleware
app.use(cors())
app.use(express.json())


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

