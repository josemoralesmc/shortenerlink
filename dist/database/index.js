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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const config_1 = __importDefault(require("../src/config/config"));
function setUpEnviroment() {
    return __awaiter(this, void 0, void 0, function* () {
        const DynamoConfig = {
            region: 'us-east-2',
            credentials: {
                accessKeyId: config_1.default.AWS_ACCESS_KEY_ID,
                secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY
            }
        };
        const DynamoClient = new client_dynamodb_1.DynamoDBClient(DynamoConfig);
        try {
            const describeTableParams = { TableName: 'users' };
            try {
                yield DynamoClient.send(new client_dynamodb_1.DescribeTableCommand(describeTableParams));
                console.log('La tabla ya existe. No es necesario crearla.');
                return;
            }
            catch (error) {
                if (error.name !== 'ResourceNotFoundException') {
                    throw error;
                }
            }
            const params = {
                TableName: 'users',
                KeySchema: [
                    { AttributeName: 'mail', KeyType: 'HASH' },
                    { AttributeName: 'id', KeyType: 'RANGE' }
                ],
                AttributeDefinitions: [
                    { AttributeName: 'id', AttributeType: 'S' },
                    { AttributeName: 'mail', AttributeType: 'S' }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1,
                },
            };
            const command = new client_dynamodb_1.CreateTableCommand(params);
            const result = yield DynamoClient.send(command);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = setUpEnviroment;
