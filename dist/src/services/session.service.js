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
exports.UsersService = void 0;
const aws_db_repo_1 = require("../repositories/aws-db.repo");
class UsersService {
    constructor() {
        this.dynamoClient = new aws_db_repo_1.DynamoClient();
    }
    static getInstance() {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }
    getUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.dynamoClient.getUser(params);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    postUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.dynamoClient.postUser(params);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UsersService = UsersService;
