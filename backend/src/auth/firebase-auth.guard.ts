import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from './firebase-admin';  // אם לא יצרת את הקובץ הזה תראה איך יצא מהסבר קודם

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing auth token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      request.user = decodedToken;  // אתה יכול לשמור כאן את המידע על המשתמש
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
