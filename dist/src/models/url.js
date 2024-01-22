"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UrlSchema = new mongoose_1.default.Schema({
    full_url: {
        type: String,
        require: true
    },
    short_url: {
        type: String,
        require: true,
        unique: true
    },
    click: {
        type: Number,
        default: 0
    },
    idUser: {
        type: String,
        required: true
    }
});
const UrlModel = mongoose_1.default.model('Url', UrlSchema);
exports.default = UrlModel;
