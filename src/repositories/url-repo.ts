import UrlModel from "../models/url";

interface ShortUrl {
  short_url: string;
  full_url: string;
  idUser: string
}
export default class UrlRepository {
  async getByIdUser(idUser: string){
    try {
      const urlsUser = await UrlModel.find({idUser: idUser})
      return urlsUser
    } catch (error) {
      throw error
    }
  }
  async getId(idUrl: string) {
    try {
      const id = await UrlModel.find({ short_url: idUrl });
    
      return id;
    } catch (error) {
        
        throw error
    }
}
  async deleteUrl(_id: string) {
    try {
      return await UrlModel.findByIdAndDelete({_id: _id})
    
      
    } catch (error) {
        
        throw error
    }
}

async postUrl(full_url: string, short_url: string, idUser: string) {
    try {
        const newUrl = new UrlModel({ short_url, full_url, idUser });
        
        return await newUrl.save();
    } catch (error) {
        throw error
    }
  }
async redirectUrl(shortUrl: string) {
  try {
    const id = await UrlModel.findOne({ short_url: shortUrl});
  
    return id;
  } catch (error) {
      
      throw error
  }
}}
