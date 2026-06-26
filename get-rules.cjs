const admin = require('firebase-admin');
const sa = require('./serviceAccountKey.json');
const cred = admin.credential.cert(sa);
(async () => {
  try {
    const token = (await cred.getAccessToken()).access_token;
    const proj = sa.project_id;
    // pega o release atual do firestore
    const relRes = await fetch(`https://firebaserules.googleapis.com/v1/projects/${proj}/releases/cloud.firestore`, { headers: { Authorization: 'Bearer ' + token } });
    if (!relRes.ok) { console.log('RELEASE ERRO', relRes.status, await relRes.text()); return; }
    const rel = await relRes.json();
    const rulesetName = rel.rulesetName;
    console.log('Ruleset atual:', rulesetName);
    const rsRes = await fetch(`https://firebaserules.googleapis.com/v1/${rulesetName}`, { headers: { Authorization: 'Bearer ' + token } });
    const rs = await rsRes.json();
    const src = rs.source.files.map(f => '--- ' + f.name + ' ---\n' + f.content).join('\n');
    console.log('=== REGRAS ATUAIS ===');
    console.log(src);
  } catch (e) { console.log('ERRO:', e.message); }
})();
