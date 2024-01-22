import { NextFunction, Request, Response } from "express";
import { refreshToken } from "../utils/jwt";

export  const validateSession = (req: Request, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
  
        const newToken = refreshToken(token);
        if (newToken) {
          res.cookie("Token", token, { 
            domain: 'https://shortfront.onrender.com',
            sameSite: 'none', // Agrega la directiva SameSite
            secure: true, // Agrega la directiva Secure
          });
        }
  
        next()
      } catch (error) {
        return res.json({ success: false, message: "No authorized"})
      }
    }
    
