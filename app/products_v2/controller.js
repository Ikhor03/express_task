const Products = require('./model')
const fs = require('fs')
const path = require('path')
const { Op } = require('sequelize')


const index = async (req, res) => {
    const { search } = req.query

    let products = await Products.findAll()

    if (search) {
        products = await Products.findAll({
            where: {
                name: {
                    [Op.substring]: search
                }
            }
        })
    }

    try {
        res.send({
            status: 'successfully',
            response: products
        })
    } catch (error) {
        res.send(error)
    }
}

const viewId = async (req, res) => {
    try {
        res.send({
            status: 'succesfully',
            response: await Products.findAll({
                where: {id: req.params.id}
            })
        })
    } catch (error) {
        res.send(error)
    }
}

const store = async (req, res) => {
    const { users_id, name, price, stock, status } = req.body
    const image = req.file

    let url_image = ''
    if (image) {
        targetRename = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, targetRename)
        url_image = `http://localhost:3000/public/${image.originalname}`
    }


    try {
        await Products.sync()
        const result = await Products.create({ users_id, name, price, stock, status, url_image })
        res.send(result);
    } catch (error) {
        res.send(error)
    }
}

const update = async (req, res) => {
    const { users_id, name, price, stock, status } = req.body
    const image = req.file

    let url_image = ''
    if (image) {
        targetRename = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, targetRename)
        url_image = `http://localhost:3000/public/${image.originalname}`
    }

    try {
        await Products.sync()
        const result = await Products.update({ users_id, name, price, stock, status, url_image }, {
            where: { id: req.params.id }
        })
        res.send(result);
    } catch (error) {
        res.send(error)
    }
}

const destroy = async (req, res) => {

    const result = await Products.destroy({
        where: {
            id: req.params.id
        }
    })

    try {
        res.send({
            status: 'successfully',
            response: result
        })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    store,
    index,
    update,
    destroy,
    viewId
}