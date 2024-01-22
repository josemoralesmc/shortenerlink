import { user } from "./types/userController";
import { createHash, isValidatePassword } from "../utils/bycript";
import { Request, Response } from "express";
import { UsersService } from "../services/session.service";
import { generateToken } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";
import { parseName, parseEmail } from "../utils/controller-verify";

export class UserController {
  async login(req: Request, res: Response): Promise<any> {
    const { mail, password } = req.body;
    const usersService = UsersService.getInstance();
    try {
      const user = await usersService.getUser({ mail, password });
      const id = user.Items[0].id.S;
      if (!isValidatePassword(password, user.Items[0].password.S)) {
        return res.json("Contraseña incorrecta");
      }
      const token = generateToken(mail, id);
      console.log(token);
      
      res.cookie("Token", token, { 
        domain: 'shortfront.onrender.com',
        path: '/',
        sameSite: 'none', // Agrega la directiva SameSite
        secure: true,
      });

      return res.json({success: true, message: "Login successes", data: token, });
    } catch (error) {
      return res.status(400).json({ success: false, message: "failed to login", data: error });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    const { mail, password, name } = req.body;
    const idGenerate = uuidv4();
    const passwordHash = createHash(password);

    const newUser: user = {
      name: parseName(name),
      mail: parseEmail(mail),
      password: passwordHash,
      id: idGenerate,
    };
    const usersService = UsersService.getInstance();
    try {
      const user = await usersService.getUser({ mail });

      if (user.Count >= 1) {
        return res.json({ success: false, message: "User already exists" })
      }

      await usersService.postUser(newUser);
      return res.json({success: true, message: "User created"});
    } catch (error) {
      console.log(error);

      return res.json({success: false,message: "Registration failed",data: error});
    }
  }
}
