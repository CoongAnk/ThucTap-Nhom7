<<<<<<< HEAD
// auth/auth.controller.js
const { AuthUseCase } = require("./auth.usecase");

const authUseCase = new AuthUseCase();

const register = async (req, res) => {
=======
import { AuthUseCase } from "./auth.usecase.js";

const authUseCase = new AuthUseCase();

export const register = async (req, res) => {
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
  try {
    console.log("🔥 HIT REGISTER");
    const token = await authUseCase.register(req.body);
    res.status(201).json({ accessToken: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

<<<<<<< HEAD
const login = async (req, res) => {
=======
export const login = async (req, res) => {
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
  try {
    const token = await authUseCase.login(req.body);
    res.json({ accessToken: token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
<<<<<<< HEAD
};

module.exports = {
  register,
  login,
};

=======
};
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
