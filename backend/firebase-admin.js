
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'node:fs';

if (getApps().length === 0) {
  const credenciales = JSON.parse(
    readFileSync(
      new URL('./credenciales/service-account.json', import.meta.url),
      'utf8'
    )
  );

  initializeApp({
    credential: cert(credenciales),
    projectId: 'travellingnow-51ace'
  });
}

export const dbAdmin = getFirestore();
export const authAdmin = getAuth();
