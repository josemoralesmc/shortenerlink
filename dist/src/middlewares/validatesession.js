"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const jwt_1 = require("../utils/jwt");
const validateSession = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const newToken = (0, jwt_1.refreshToken)(token);
        if (newToken) {
            res.cookie("Token", token, {
                domain: 'shortfront.onrender.com/',
                sameSite: 'none', // Agrega la directiva SameSite
                secure: true, // Agrega la directiva Secure
            });
        }
        next();
    }
    catch (error) {
        return res.json({ success: false, message: "No authorized" });
    }
};
exports.validateSession = validateSession;
