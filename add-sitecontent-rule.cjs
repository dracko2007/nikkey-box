const admin = require('firebase-admin');
const sa = require('./serviceAccountKey.json');
const cred = admin.credential.cert(sa);
const proj = sa.project_id;
const RULE = `
    match /siteContent/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
`;
(async () => {
  const token = (await cred.getAccessToken()).access_token;
  const H = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
  const rel = await (await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/releases/cloud.firestore`, { headers: H })).json();
  const rs = await (await fetch(`https://firebaserules.googleapis.com/v1/${rel.rulesetName}`, { headers: H })).json();
  let src = rs.source.files[0].content;
  if (src.includes('match /siteContent/')) { console.log('Regra siteContent JÁ existe.'); return; }
  src = src.replace('match /{document=**}', RULE.trim() + '\n\n    match /{document=**}');
  const newRs = await (await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/rulesets`, { method:'POST', headers:H, body: JSON.stringify({ source:{ files:[{ name:'firestore.rules', content: src }] } }) })).json();
  await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/releases/cloud.firestore`, { method:'PATCH', headers:H, body: JSON.stringify({ release:{ name:`projects/${proj}/releases/cloud.firestore`, rulesetName: newRs.name } }) });
  console.log('REGRA siteContent PUBLICADA ✅');
})().catch(e => console.log('ERRO:', e.message));
