// src/auth/google-auth.service.ts
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  async verifyGoogleToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);  // שימוש ב- firebase-admin לאימות ה-token
      return decodedToken;  // החזרת הנתונים של המשתמש
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
