const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const bodyParser = require('body-parser');
const productRouter = require('./app/products/routes');
const productRouterV2 = require('./app/products_v2/router');
const logger = require('morgan')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/public',express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1', productRouter)
app.use('/api/v2', productRouterV2)

app.use((req,res,next) => {
    res.send('someting broke! Resource: ' + req.originalUrl + ' cannot found')
})

app.listen(port, () => {
    console.log(`runnign in port: ${port}`);
})