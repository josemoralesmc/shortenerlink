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
const url_1 = __importDefault(require("../models/url"));
class UrlRepository {
    getByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urlsUser = yield url_1.default.find({ idUser: idUser });
                return urlsUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getId(idUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield url_1.default.find({ short_url: idUrl });
                return id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUrl(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield url_1.default.findByIdAndDelete({ _id: _id });
            }
            catch (error) {
                throw error;
            }
        });
    }
    postUrl(full_url, short_url, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUrl = new url_1.default({ short_url, full_url, idUser });
                return yield newUrl.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    redirectUrl(shortUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield url_1.default.findOne({ short_url: shortUrl });
                return id;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UrlRepository;
