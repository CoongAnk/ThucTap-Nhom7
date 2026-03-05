// auth/auth.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = password =>
  bcrypt.hash(password, Number(process.env.SALT_ROUNDS || 10));

export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const generateToken = user =>
  jwt.sign(
    { uid: user.uid, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
