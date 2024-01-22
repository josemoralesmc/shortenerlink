"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidatePassword = exports.createHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createHash = (password) => {
    const hash = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    return hash;
};
exports.createHash = createHash;
const isValidatePassword = (user, password) => bcrypt_1.default.compareSync(user, password);
exports.isValidatePassword = isValidatePassword;
