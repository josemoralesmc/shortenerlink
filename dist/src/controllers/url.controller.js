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
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const jwt_1 = require("../utils/jwt");
const url_service_1 = __importDefault(require("../services/url.service"));
const mongodb_1 = require("mongodb");
class UrlController {
    getByIdUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const urlService = yield url_service_1.default.getInstance();
            const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : '';
            const idUser = (0, jwt_1.extractIdToken)(token);
            try {
                const response = yield urlService.getByIdUser(idUser);
                return res.json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    redirectUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlService = yield url_service_1.default.getInstance();
            const shortUrl = req.params.shorturl;
            try {
                const response = yield urlService.redirectUrl(shortUrl);
                if (!response) {
                    return res.sendStatus(404).json({ success: false, message: "" });
                }
                const redirectUrl = response.full_url || "/";
                return res.redirect(redirectUrl);
            }
            catch (error) {
                return res.json({ success: false, message: "error", error });
            }
        });
    }
    postUrl(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const urlService = url_service_1.default.getInstance();
            const uid = new short_unique_id_1.default();
            const { full_url, short_url } = req.body;
            const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : '';
            const idUser = (0, jwt_1.extractIdToken)(token);
            try {
                if (short_url === "") {
                    const new_short_url = uid.rnd();
                    const response = yield urlService.postUrl(full_url, new_short_url, idUser);
                    return res.json({
                        success: true,
                        message: "successful URL shortening",
                        response
                    });
                }
                const idFind = yield urlService.getId(short_url);
                if (idFind === undefined || idFind.length > 0) {
                    return res.json({ success: false, message: "repeated short url" });
                }
                const response = yield urlService.postUrl(full_url, short_url, idUser);
                return res.json({ success: true, message: "successful URL shortening", response });
            }
            catch (error) {
                return res.json({ success: false, message: "error when converting url", error });
            }
        });
    }
    deleteUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlService = yield url_service_1.default.getInstance();
            const id = req.params.id;
            try {
                if (!mongodb_1.ObjectId.isValid(id)) {
                    return res.json({ success: false, message: "invalid id" });
                }
                yield urlService.deleteUrl(id);
            }
            catch (error) {
                return res.json({ success: false, message: "error when deleting url'", error });
            }
        });
    }
}
exports.default = UrlController;
