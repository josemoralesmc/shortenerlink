"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractIdToken = exports.refreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generateToken = (mail, id) => {
    const newToken = jsonwebtoken_1.default.sign({
        id,
        mail,
        exp: Date.now() + 3600000,
    }, config_1.default.SECRET_JWT);
    return newToken;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const verifiedtoken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET_JWT);
    const limit = verifiedtoken.exp - 1200000;
    if (verifiedtoken.exp !== undefined && verifiedtoken.exp < Date.now()) {
        throw new Error("Token expirado");
    }
    if (Date.now() < limit)
        return null;
    return { id: verifiedtoken.id, mail: verifiedtoken.mail };
};
exports.verifyToken = verifyToken;
const refreshToken = (token) => {
    const response = (0, exports.verifyToken)(token);
    if (response != null) {
        const newToken = (0, exports.generateToken)(response === null || response === void 0 ? void 0 : response.id, response === null || response === void 0 ? void 0 : response.mail);
        return newToken;
    }
};
exports.refreshToken = refreshToken;
function extractIdToken(token) {
    const res = jsonwebtoken_1.default.verify(token, config_1.default.SECRET_JWT);
    return res.id;
}
exports.extractIdToken = extractIdToken;
