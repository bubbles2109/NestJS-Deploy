import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import mongoose from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt"
import { AuthSche } from "src/schemas/auth.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(AuthSche.name)
        private authModel: mongoose.Model<AuthSche>,
        private configService: ConfigService
    ) {
        const secret = configService.get<string>('SECRET_KEY')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret
        });
    }

    async validate(payload) {
        const user = await this.authModel.findOne({ _id: payload.id });

        console.log(user)
        if (!user) {
            throw new Error('Unauthorized');
        }

        return user
    }

}