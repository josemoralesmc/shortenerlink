"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_repo_1 = __importDefault(require("../repositories/url-repo"));
class UrlService {
    constructor() {
        this.urlService = new url_repo_1.default();
    }
    static getInstance() {
        if (!UrlService.instance) {
            UrlService.instance = new UrlService();
        }
        return UrlService.instance;
    }
    getByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.urlService.getByIdUser(idUser);
                return response;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.urlService.getId(id);
                return response;
            }
            catch (error) {
                throw new Error('Error getting ID');
            }
        });
    }
    redirectUrl(shorturl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.urlService.redirectUrl(shorturl);
                return response;
            }
            catch (error) {
                throw new Error('Error getting ID');
            }
        });
    }
    postUrl(full_url, short_url, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.urlService.postUrl(full_url, short_url, idUser);
                return response;
            }
            catch (error) {
                throw new Error('Error publishing URL');
            }
        });
    }
    deleteUrl(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.urlService.deleteUrl(_id);
                return response;
            }
            catch (error) {
                throw new Error('error when deleting url');
            }
        });
    }
}
exports.default = UrlService;
