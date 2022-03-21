const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/users");
const indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(userRoutes);
app.use("/", indexRoutes.routes);
app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "",
  });
});

app.listen(3000);
