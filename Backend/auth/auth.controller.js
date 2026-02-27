import { AuthUseCase } from "./auth.usecase.js";

const authUseCase = new AuthUseCase();

export const register = async (req, res) => {
  try {
    console.log("🔥 HIT REGISTER");
    const token = await authUseCase.register(req.body);
    res.status(201).json({ accessToken: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authUseCase.login(req.body);
    res.json({ accessToken: token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};