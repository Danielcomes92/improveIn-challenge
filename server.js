const express = require('express')
const cors = require('cors')

require('dotenv').config()
require('./config/database')
require('./config/passport')

const router = require('./routes/index')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)




const port = 4000

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})