const sequelize = require('../../config/sequelize')
const { DataTypes } = require('sequelize')

const Products = sequelize.define('Products', {
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  url_image: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

module.exports = Products;