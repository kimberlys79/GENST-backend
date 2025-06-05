require("dotenv").config('../env')

const app = require("./app")
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`This app listening on post ${PORT}`)
})