const router = require('express').Router()
const controllerProducts = require('./controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads' })


router.post('/products', upload.single('url_image'), controllerProducts.store)
router.get('/products', controllerProducts.index)
router.get('/products/:id', controllerProducts.viewId)
router.put('/products/:id', upload.single('url_image'), controllerProducts.update)
router.delete('/products/:id', controllerProducts.destroy)


module.exports = router;