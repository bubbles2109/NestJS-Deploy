import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty({ message: 'username is required' })
    username?: string;

    @IsNotEmpty({ message: 'password is required' })
    password?: string;
}