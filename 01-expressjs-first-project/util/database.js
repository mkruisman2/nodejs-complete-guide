const { Sequelize } = require("sequelize");

const password = require("./data");

const sequelize = new Sequelize("node-complete", "root", `${password}`, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;