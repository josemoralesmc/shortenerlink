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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bycript_1 = require("../utils/bycript");
const session_service_1 = require("../services/session.service");
const jwt_1 = require("../utils/jwt");
const uuid_1 = require("uuid");
const controller_verify_1 = require("../utils/controller-verify");
class UserController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mail, password } = req.body;
            const usersService = session_service_1.UsersService.getInstance();
            try {
                const user = yield usersService.getUser({ mail, password });
                const id = user.Items[0].id.S;
                if (!(0, bycript_1.isValidatePassword)(password, user.Items[0].password.S)) {
                    return res.json("Contraseña incorrecta");
                }
                const token = (0, jwt_1.generateToken)(mail, id);
                console.log(token);
                res.cookie("Token", token, {
                    domain: '.shortfront.onrender.com',
                    sameSite: 'none', // Agrega la directiva SameSite
                    secure: true,
                });
                return res.json({ success: true, message: "Login successes", data: token, });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: "failed to login", data: error });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mail, password, name } = req.body;
            const idGenerate = (0, uuid_1.v4)();
            const passwordHash = (0, bycript_1.createHash)(password);
            const newUser = {
                name: (0, controller_verify_1.parseName)(name),
                mail: (0, controller_verify_1.parseEmail)(mail),
                password: passwordHash,
                id: idGenerate,
            };
            const usersService = session_service_1.UsersService.getInstance();
            try {
                const user = yield usersService.getUser({ mail });
                if (user.Count >= 1) {
                    return res.json({ success: false, message: "User already exists" });
                }
                yield usersService.postUser(newUser);
                return res.json({ success: true, message: "User created" });
            }
            catch (error) {
                console.log(error);
                return res.json({ success: false, message: "Registration failed", data: error });
            }
        });
    }
}
exports.UserController = UserController;
