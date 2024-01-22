import ShortUniqueId from "short-unique-id";
import { extractIdToken } from "../utils/jwt";
import UrlService from "../services/url.service";
import { Request, Response } from "express";
import {ObjectId} from 'mongodb'

export default class UrlController {

  async getByIdUser(req: Request, res: Response){
    const urlService = await UrlService.getInstance()
    const token = req.headers.authorization?.split(" ")[1] ?? '';
    const idUser = extractIdToken(token)
    try {
      const response = await urlService.getByIdUser(idUser)
      return res.json(response)
    } catch (error) {
      console.log(error);
      
    }
  }
  async redirectUrl(req: Request, res: Response){
    const urlService = await UrlService.getInstance()
    const shortUrl = req.params.shorturl
    
    try {
      const response = await urlService.redirectUrl(shortUrl)
      if (!response) {
        return res.sendStatus(404).json({ success: false, message: "" })
      }
      
      const redirectUrl = response.full_url || "/"
      
      return res.redirect(redirectUrl)
      
    } catch (error) {
      return res.json({ success: false, message: "error", error })
      
    }
  }
  
  async postUrl(req: Request, res: Response) {
    const urlService = UrlService.getInstance();
    const uid = new ShortUniqueId();
    const { full_url, short_url } = req.body;
    const token = req.headers.authorization?.split(" ")[1] ?? '';
    const idUser = extractIdToken(token)
    try {
      if (short_url === "") {
        const new_short_url = uid.rnd();
        const response = await urlService.postUrl(full_url, new_short_url, idUser);
        
        return res.json({
          success: true,
          message: "successful URL shortening",
          response
        })
      }
      const idFind = await urlService.getId(short_url);
      
      if (idFind === undefined || idFind.length > 0) {
        return res.json({ success: false, message: "repeated short url" })
      }

      const response = await urlService.postUrl(full_url, short_url, idUser);
      return res.json({ success: true, message: "successful URL shortening", response })
    } catch (error) {
      return res.json({ success: false, message: "error when converting url", error })
    }
  }

  async deleteUrl(req: Request, res: Response){
    const urlService = await UrlService.getInstance()
    const id = req.params.id
    try {
      if (!ObjectId.isValid(id)) {
        return res.json({ success: false, message: "invalid id" })
      }
      await urlService.deleteUrl(id) 
    } catch (error) {
      return res.json({ success: false, message: "error when deleting url'", error })
    }
  }
}
