<<<<<<< HEAD
// auth/auth.routes.js
const express = require("express");
const { register, login } = require("./auth.controller");
=======
import express from "express";
import { register, login } from "./auth.controller.js";
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f

console.log("🔥 AUTH ROUTE FILE LOADED");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

<<<<<<< HEAD
module.exports = router;

=======
export default router;
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
