const express = require("express");

const router = express.Router();

const indexData = require("./index");

router.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "Users List",
    path: "/users",
    usersList: indexData.users,
  });
});

module.exports = router;
