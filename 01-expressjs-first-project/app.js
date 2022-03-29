const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const sequelize = require("./util/database");
// const Product = require("./models/product");
const User = require("./models/user");
const { userId, mongodbUrl } = require("./util/data");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById(userId)
    .then((user) => {
      req.user = user; // user is full Mongoose model
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(`${mongodbUrl}/shop?retryWrites=true&w=majority`)
  .then((result) => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Marit",
          email: "test@test.com",
          items: [],
        });
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// mongoConnect(() => {
//   app.listen(3000);
// });

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // Products created by User on admin page. Product is deleted when user is deleted
// User.hasMany(Product); // A User can have multiple products.
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "Marit",
//         email: "test@test.com",
//       });
//     }
//     return Promise.resolve(user);
//   })
//   .then((user) => {
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
