const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'uploads'})
const fs = require('fs')
const path = require('path')


router.get('/', (req, res) => {
    const {page, sumPage} = req.query
    res.send({
        status: "success",
        message: "hello route express",
        page,
        sumPage
    })
})

router.get('/product/:id', (req, res) => {
    res.send( 'Product dengan id ' + req.params.id)
})

router.put("/username", (req, res) => {
    console.log(req.body, req.query)
    res.send('update berhasil')
})

router.post('/login', (req, res) => {
    console.log({requestFromOutside : req.body});
    res.send('login berhasil')
})

router.post('/profile', upload.single('avatar'), (req, res, next) =>{
    const {name, age} = req.body
    const avatar = req.file

    const targetRename = path.join(__dirname, 'uploads', avatar.originalname)
    fs.renameSync(avatar.path, targetRename)
    // res.send({
    //     name,
    //     age,
    //     avatar
    // })

    res.sendFile(targetRename)
})

module.exports = router;