const admin = require('firebase-admin');
const sa = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(sa) });
const auth = admin.auth();
const EMAIL = 'dracko2007@gmail.com';
const PASS = 'admin123';
(async () => {
  let user;
  try {
    user = await auth.getUserByEmail(EMAIL);
    console.log('Usuário já existe:', user.uid);
    await auth.updateUser(user.uid, { password: PASS, emailVerified: true });
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      user = await auth.createUser({ email: EMAIL, password: PASS, emailVerified: true, displayName: 'Administrador' });
      console.log('Usuário criado:', user.uid);
    } else { throw e; }
  }
  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log('Claim admin=true definido. OK');
  process.exit(0);
})().catch(e => { console.log('ERRO:', e.message); process.exit(1); });
