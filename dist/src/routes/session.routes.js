"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const router = (0, express_1.Router)();
const controllerUser = new session_controller_1.UserController();
router.post('/register', controllerUser.register);
router.post('/login', controllerUser.login);
exports.default = router;
