"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_schema_1 = require("../../schemas/auth.schema");
const jwt_1 = require("@nestjs/jwt");
const globalEnum_1 = require("../../global/globalEnum");
const globalClass_1 = require("../../global/globalClass");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(AuthModel, jwtService, configService) {
        this.AuthModel = AuthModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(authDto) {
        const loginUser = await this.AuthModel.findOne({ username: authDto.username });
        if (loginUser) {
            if (authDto.password === loginUser.password) {
                const payload = { id: loginUser.id, username: loginUser.username };
                return this.generateToken(payload);
            }
        }
        return null;
    }
    async refreshToken(refreshToken) {
        try {
            const verify = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('SECRET_KEY')
            });
            const checkExistToken = await this.AuthModel.findOne({ username: verify.username, refreshToken });
            if (checkExistToken) {
                const generateToken = await this.generateToken({ id: verify.id, username: verify.username });
                return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS, generateToken);
            }
            else {
                throw new common_1.HttpException('refreshToken is not valid', globalEnum_1.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (error) {
            throw new common_1.HttpException('refreshToken is not valid', globalEnum_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async generateToken(payload) {
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRES_REFRESH_TOKEN')
        });
        await this.AuthModel.updateOne({ username: payload.username }, { refreshToken: refreshToken });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.AuthSche.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map