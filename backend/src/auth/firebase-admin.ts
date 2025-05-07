import * as admin from 'firebase-admin';

// אם אתה עובד עם קובץ ServiceAccount
admin.initializeApp({
  credential: admin.credential.applicationDefault(),  // אם זה לא עובד לך, תוכל להוסיף קובץ credentials בפורמט JSON
});

export const firebaseAdmin = admin;
