const express = require("express");
const colors = require("colors")
const dotenv = require("dotenv").config()
const goalRoutes = require("./routes/goalRoutes");
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const PORT = process.env.PORT

connectDB()

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/goals", goalRoutes)

app.use(errorHandler)

app.listen(8800, () => console.log(`Server is listening on port ${PORT}...`))