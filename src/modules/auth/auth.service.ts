import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AuthDto } from "src/dto/auth.dto";
import { AuthSche, AuthSchema } from "src/schemas/auth.schema";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class AuthService {

    constructor(
        @InjectModel(AuthSche.name)
        private AuthModel: mongoose.Model<AuthSche>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(authDto: AuthDto): Promise<any> {
        const loginUser = await this.AuthModel.findOne({ username: authDto.username })
        if (loginUser) {
            // const checkPassword = await bcrypt.compare(authDto.password, loginUser.password)  check mã hóa
            if (authDto.password === loginUser.password) {
                const payload = {id: loginUser.id, username: loginUser.username}
                return this.generateToken(payload)
            }
        } 
        return null
    }

    async refreshToken(refreshToken: string): Promise<ResponseData<any>> {
        try {
            const verify = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get<string>('SECRET_KEY')
            })

            const checkExistToken = await this.AuthModel.findOne({username: verify.username, refreshToken})
            console.log(checkExistToken)
            if (checkExistToken) {
                const generateToken = await this.generateToken({id: verify.id, username: verify.username})

                return new ResponseData<any>(
                    HttpStatus.SUCCESS, 
                    HttpMessage.SUCCESS, 
                    generateToken
                )
            } else {
                throw new HttpException('refreshToken is not valid', HttpStatus.UNAUTHORIZED)
            }
        } catch (error) {
            throw new HttpException('refreshToken is not valid', HttpStatus.UNAUTHORIZED)
        }
    }

    private async generateToken(payload: {id: any, username: string}) {
        const accessToken = await this.jwtService.signAsync(payload)
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('SECRET_KEY'),
            expiresIn: this.configService.get<string>('EXPIRES_REFRESH_TOKEN')
        })
        await this.AuthModel.updateOne(
            {username: payload.username},
            {refreshToken: refreshToken}
        )

        return {accessToken, refreshToken}
    }
}