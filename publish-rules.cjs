const admin = require('firebase-admin');
const sa = require('./serviceAccountKey.json');
const cred = admin.credential.cert(sa);
const proj = sa.project_id;

const PRODUCTS_RULE = `
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
`;

(async () => {
  const token = (await cred.getAccessToken()).access_token;
  const H = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };

  // 1) pega ruleset atual
  const rel = await (await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/releases/cloud.firestore`, { headers: H })).json();
  const rs = await (await fetch(`https://firebaserules.googleapis.com/v1/${rel.rulesetName}`, { headers: H })).json();
  let src = rs.source.files[0].content;

  if (src.includes('match /products/')) { console.log('Regra de products JÁ existe. Nada a fazer.'); return; }

  // 2) insere a regra de products ANTES do catch-all
  const anchor = 'match /{document=**}';
  src = src.replace(anchor, PRODUCTS_RULE.trim() + '\n\n    ' + anchor);

  // 3) cria novo ruleset
  const createRes = await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/rulesets`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ source: { files: [{ name: 'firestore.rules', content: src }] } })
  });
  if (!createRes.ok) { console.log('CRIAR RULESET ERRO', createRes.status, await createRes.text()); return; }
  const newRs = await createRes.json();
  console.log('Novo ruleset:', newRs.name);

  // 4) atualiza o release para apontar pro novo ruleset
  const patchRes = await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/releases/cloud.firestore`, {
    method: 'PATCH', headers: H,
    body: JSON.stringify({ release: { name: `projects/${proj}/releases/cloud.firestore`, rulesetName: newRs.name } })
  });
  if (!patchRes.ok) { console.log('PUBLICAR ERRO', patchRes.status, await patchRes.text()); return; }
  console.log('REGRAS PUBLICADAS COM SUCESSO ✅ (products liberado)');
})().catch(e => console.log('ERRO:', e.message));
