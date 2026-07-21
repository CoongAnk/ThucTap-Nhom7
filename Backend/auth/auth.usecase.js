// auth/auth.usecase.js
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword, generateToken } from "./auth.service.js";
import { RegisterSchema, LoginSchema } from "./auth.schema.js";
import { v4 as uuid } from "uuid";

export class AuthUseCase {
  async register(payload) {
    const { email, name, password, birthDay } = RegisterSchema.parse(payload);

    const existed = await UserModel.findOne({ email });
    if (existed) throw new Error("Email already exists");

    const hashed = await hashPassword(password);

    const user = await UserModel.create({
      uid: uuid(),
      email,
      name,
      password: hashed,
      // Role is never taken from client input to prevent privilege escalation.
      role: "STUDENT",
      birthDay: new Date(birthDay),
    });

    return generateToken(user);
  }

  async login(payload) {
    const { email, password } = LoginSchema.parse(payload);

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const ok = await comparePassword(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    return generateToken(user);
  }
}
