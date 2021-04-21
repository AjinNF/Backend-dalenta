require('dotenv').config()
const express = require('express')
const cors = require('cors')

const handle = require('./handles/errorReport')
const route = require('./routes')
const middleware = require('../src/middleware/cektoken')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/gettoken', route.gettoken)
app.use('/product', middleware.cektoken, route.product)

app.use((req, res, next) => {
    let err = new Error('Tidak ditemukan')
    err.status = 404
    next(err)
})
app.use(handle.error)

app.listen(process.env.PORT, () =>
    console.log(`Server berjalan do port ${process.env.PORT}`),
)
