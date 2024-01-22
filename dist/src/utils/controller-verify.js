"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEmail = exports.parseName = exports.verifyUser = void 0;
const verifyUser = (user) => {
    if (user.Count >= 1) {
        return { success: false, message: "User already exists" };
    }
};
exports.verifyUser = verifyUser;
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest)) {
        throw new Error("Incorrect or missing name");
    }
    return nameFromRequest;
};
exports.parseName = parseName;
const parseEmail = (emailFromRequest) => {
    if (!isEmail(emailFromRequest)) {
        console.log(emailFromRequest);
        throw new Error("enter valid email");
    }
    return emailFromRequest;
};
exports.parseEmail = parseEmail;
const isEmail = (string) => {
    console.log(string);
    const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patronEmail.test(string);
};
const isString = (string) => {
    return typeof string === "string";
};
