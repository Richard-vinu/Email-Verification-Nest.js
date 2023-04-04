import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface DecodedToken {
  isAdmin: boolean;
  // Add other properties of the decoded token here, as needed
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return false;
    } 
    const token = authorizationHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format

    try {
      const decoded: DecodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as DecodedToken; 
      

      console.log(decoded);
      
      if (decoded.isAdmin) {
        return true;
      } else {
        return false;
      }
    } 
    catch (err) {
      console.error(err);
      return false;
    }
  }
}
