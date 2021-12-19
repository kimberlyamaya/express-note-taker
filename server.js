const express = require("express");
const apiRoutes = require("./routes/apiRoutes/index");
const htmlRoutes = require("./routes/htmlRoutes/index");

const app = express()
const port = process.env.PORT || 3002

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)

app.listen(port, () => {
    console.log(`API server now on port ${port}!`)
  })