const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "store_rating",
  "root",
  "Rahul@1114",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;