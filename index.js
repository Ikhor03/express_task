const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const bodyParser = require('body-parser');
const router = require('./routes');
const log = require('./middlewares/logger')

app.use(log)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'uploads')))

app.use(router)

app.use((req,res,next) => {
    res.send('someting broke! Resource: ' + req.originalUrl + ' cannot found')
})

app.listen(port, () => {
    console.log(`runnign in port: ${port}`);
})