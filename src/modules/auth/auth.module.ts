import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthSche, AuthSchema } from "src/schemas/auth.schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
          }),
        PassportModule.register({defaultStrategy: 'jwt' }),
        MongooseModule.forFeature([{ name: AuthSche.name, schema: AuthSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('SECRET_KEY'),
              signOptions: { expiresIn: configService.get<string>('EXPIRES_ACCESS_TOKEN') },
            }),
            inject: [ConfigService],
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthGuard],
    exports: [JwtStrategy, PassportModule, AuthGuard, JwtModule]
})

export class AuthModule {}