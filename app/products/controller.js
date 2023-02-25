const connection = require("../../config/mysql");
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
    const { search } = req.query
    let execute = {}
    if (search) {
        execute = {
            sql: 'SELECT * FROM products WHERE name LIKE ?',
            values: [`%${search}%`]
        }
    } else {
        execute = {
            sql: 'SELECT * FROM products'
        }
    }

    connection.query(execute, _response(res));
}

const view = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products WHERE id = ?',
        values: [req.params.id]

    }, _response(res));
}

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM products WHERE id = ?',
        values: [req.params.id]

    }, _response(res));
}

const store = (req, res) => {

    const { users_id, name, price, stock, status } = req.body;
    const image = req.file
    const targetRename = path.join(__dirname, '../../uploads', image.originalname)
    fs.renameSync(image.path, targetRename)

    connection.query({
        sql: 'INSERT INTO products (users_id, name, price, stock, status, url_image) VALUES (?,?,?,?,?,?)',
        values: [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`]
    }, _response(res))

}

const update = (req, res) => {

    const { users_id, name, price, stock, status } = req.body;
    const image = req.file
    const targetRename = path.join(__dirname, '../../uploads', image.originalname)
    fs.renameSync(image.path, targetRename)

    let sql;
    let values;
    if (image) {
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, url_image = ? WHERE id = ?'
        values = [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id]
    } else {
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?'
        values = [parseInt(users_id), name, price, stock, status, req.params.id]
    }

    connection.query({ sql, values }, _response(res))

}

//closure
const _response = (res) => {
    return (error, result) => {
        if (error) {
            res.send({
                status: 'failed',
                response: error
            })
        } else {
            res.send({
                status: 'success',
                response: result
            })
        }
    }
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}