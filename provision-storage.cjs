const admin = require('firebase-admin');
const sa = require('./serviceAccountKey.json');
const cred = admin.credential.cert(sa);
const proj = sa.project_id;
const bucketNames = [`${proj}.firebasestorage.app`, `${proj}.appspot.com`];
(async () => {
  const token = (await cred.getAccessToken()).access_token;
  const H = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
  for (const name of bucketNames) {
    // tenta criar o bucket GCS
    const res = await fetch(`https://storage.googleapis.com/storage/v1/b?project=${proj}`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ name, location: 'US', storageClass: 'STANDARD' })
    });
    const txt = await res.text();
    console.log(`CRIAR ${name}: HTTP ${res.status}`);
    if (res.status === 409) { console.log('  -> já existe'); }
    else if (res.ok) { console.log('  -> criado com sucesso'); }
    else { console.log('  -> ' + txt.slice(0, 300)); }
  }
})().catch(e => console.log('ERRO:', e.message));
