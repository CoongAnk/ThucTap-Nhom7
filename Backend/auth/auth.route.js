// auth/auth.routes.js
const express = require("express");
const { register, login } = require("./auth.controller");

console.log("🔥 AUTH ROUTE FILE LOADED");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;

