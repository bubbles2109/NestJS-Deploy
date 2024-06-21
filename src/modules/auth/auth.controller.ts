import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto/auth.dto";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { AuthModel } from "src/models/auth.model";

@Controller('auth')

export class AuthController {

    constructor( private authService: AuthService ) {}
    
    @Post('login')
    async login(@Body(new ValidationPipe) authDto: AuthDto): Promise<ResponseData<AuthModel>> {
        try {
           const login = await this.authService.login(authDto)
           if (login) {
            return new ResponseData<AuthModel>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, login)
           } else {
            return new ResponseData<AuthModel>(HttpStatus.UNAUTHORIZED, HttpMessage.UNAUTHORIZED, null)
           }
        } catch (error) {
            console.log(error)
            return new ResponseData<AuthModel>(HttpStatus.ERROR, HttpMessage.ERROR, null)
        }
    }

    @Post('refresh-token')
    refreshToken(@Body() {refreshToken}): Promise<any> {
        return this.authService.refreshToken(refreshToken)
    }
}