// auth/auth.controller.js
const { AuthUseCase } = require("./auth.usecase");

const authUseCase = new AuthUseCase();

const register = async (req, res) => {
  try {
    console.log("🔥 HIT REGISTER");
    const token = await authUseCase.register(req.body);
    res.status(201).json({ accessToken: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authUseCase.login(req.body);
    res.json({ accessToken: token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};

