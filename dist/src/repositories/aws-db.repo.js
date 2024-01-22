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
exports.DynamoClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const config_1 = __importDefault(require("../config/config"));
class DynamoClient {
    constructor() {
        this.DynamoConfig = {
            region: 'us-east-2',
            credentials: {
                accessKeyId: config_1.default.AWS_ACCESS_KEY_ID,
                secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY
            }
        };
        this.DynamoClient = new client_dynamodb_1.DynamoDBClient(this.DynamoConfig);
    }
    getUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramsuser = {
                    KeyConditionExpression: 'mail = :mail',
                    ExpressionAttributeValues: {
                        ':mail': { S: params.mail }
                    },
                    TableName: 'users'
                };
                const command = new client_dynamodb_1.QueryCommand(paramsuser);
                const response = yield this.DynamoClient.send(command);
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
                const paramuser = {
                    Item: {
                        mail: {
                            S: params.mail
                        },
                        password: {
                            S: params.password
                        },
                        name: {
                            S: params.name
                        },
                        id: {
                            S: params.id
                        }
                    },
                    TableName: 'users'
                };
                const command = new client_dynamodb_1.PutItemCommand(paramuser);
                return yield this.DynamoClient.send(command);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DynamoClient = DynamoClient;
