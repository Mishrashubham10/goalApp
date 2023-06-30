const path = require('path')
const express = require("express");
const colors = require("colors")
const dotenv = require("dotenv").config()
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const PORT = process.env.PORT

connectDB()

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use("/api/goals", goalRoutes)
app.use("/api/users", userRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set production'))
}

app.use(errorHandler)

app.listen(8800, () => console.log(`Server is listening on port ${PORT}...`))