/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose from "mongoose";
import { AuthDto } from "src/dto/auth.dto";
import { AuthSche } from "src/schemas/auth.schema";
import { JwtService } from "@nestjs/jwt";
import { ResponseData } from "src/global/globalClass";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private AuthModel;
    private jwtService;
    private configService;
    constructor(AuthModel: mongoose.Model<AuthSche>, jwtService: JwtService, configService: ConfigService);
    login(authDto: AuthDto): Promise<any>;
    refreshToken(refreshToken: string): Promise<ResponseData<any>>;
    private generateToken;
}
