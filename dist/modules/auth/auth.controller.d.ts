import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto/auth.dto";
import { ResponseData } from "src/global/globalClass";
import { AuthModel } from "src/models/auth.model";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(authDto: AuthDto): Promise<ResponseData<AuthModel>>;
    refreshToken({ refreshToken }: {
        refreshToken: any;
    }): Promise<any>;
}
