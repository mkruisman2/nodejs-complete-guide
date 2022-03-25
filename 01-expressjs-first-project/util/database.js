const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const { mongodbUrl } = require("./data");

const mongoConnect = (callback) => {
  MongoClient.connect(`${mongodbUrl}/shop?retryWrites=true&w=majority`)
  .then((client) => {
    // console.log("Connected!");
    _db = client.db();
    callback();
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const { Sequelize } = require("sequelize");

// const { password } = require("./data");

// const sequelize = new Sequelize("node-complete", "root", `${password}`, {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
