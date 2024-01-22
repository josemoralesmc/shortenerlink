"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = __importDefault(require("../controllers/url.controller"));
const validatesession_1 = require("../middlewares/validatesession");
const urlController = new url_controller_1.default();
const router = (0, express_1.Router)();
router.post("/create", validatesession_1.validateSession, urlController.postUrl);
router.delete("/:id", validatesession_1.validateSession, urlController.deleteUrl);
router.get("/myurls", validatesession_1.validateSession, urlController.getByIdUser);
router.get("/:shorturl", validatesession_1.validateSession, urlController.redirectUrl);
exports.default = router;
