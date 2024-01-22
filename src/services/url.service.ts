import UrlRepository from "../repositories/url-repo";

export default class UrlService {
  private static instance: UrlService;
  private urlService: UrlRepository;

  private constructor() {
    this.urlService = new UrlRepository();
  }

  public static getInstance(): UrlService {
    if (!UrlService.instance) {
      UrlService.instance = new UrlService();
    }
    return UrlService.instance;
  }

  async getByIdUser(idUser: string){
    try {
      const response = await this.urlService.getByIdUser(idUser)
      return response
    } catch (error) {
    console.log(error);
         
    }
  }
  async getId(id: string) {
    try {
      const response = await this.urlService.getId(id);
      return response;
    } catch (error) {
      throw new Error('Error getting ID');
    }
  }
  async redirectUrl(shorturl: string) {
    try {
      const response = await this.urlService.redirectUrl(shorturl);
      return response;
    } catch (error) {
      throw new Error('Error getting ID');
    }
  }

  async postUrl(full_url: any, short_url: any, idUser: string) {
    try {
      const response = await this.urlService.postUrl(full_url, short_url, idUser);
      return response;
    } catch (error) {
      throw new Error('Error publishing URL');
    }
  }
  async deleteUrl(_id: any) {
    try {
      const response = await this.urlService.deleteUrl(_id);
      return response;
    } catch (error) {
      throw new Error('error when deleting url');
    }
  }
}

