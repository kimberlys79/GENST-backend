require("dotenv").config()

console.log("ENV Loaded. DB_HOST=", process.env.DB_HOST);

const app = require("./app")
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`This app listening on port ${PORT}`)
})