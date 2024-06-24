import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { HttpStatus } from 'src/global/globalEnum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new HttpException('Authorization header missing', HttpStatus.UNAUTHORIZED);
        }
        
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new HttpException('Token missing', HttpStatus.UNAUTHORIZED);
        }

        request.user = this.jwtService.verify(token);
        console.log('Verified user:', request.user);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
        } else if (error instanceof JsonWebTokenError) {
            throw new HttpException('Token is incorrect', HttpStatus.UNAUTHORIZED);
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
    return true;
  }
}
