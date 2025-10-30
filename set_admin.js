// IMPORTANTE: Este script deve ser executado APENAS uma vez para conceder o privilégio de administrador.

const admin = require('firebase-admin');

// Substitua pelo caminho real do seu arquivo Service Account Key
const serviceAccount = require('./serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ************************************************
// 🛑 PASSO CRÍTICO: SUBSTITUA PELO SEU UID REAL 🛑
// ************************************************
const YOUR_ADMIN_UID = "COLE_O_SEU_UID_AQUI"; 
const TARGET_EMAIL = "seu.email@exemplo.com"; 

async function setAdminClaim() {
    try {
        await admin.auth().setCustomUserClaims(YOUR_ADMIN_UID, { admin: true });
        console.log(`✅ SUCESSO: O usuário ${TARGET_EMAIL} (UID: ${YOUR_ADMIN_UID}) agora é ADMINISTRADOR.`);
        console.log("Para que a mudança seja efetiva no Frontend, o usuário deve fazer LOGOUT e LOGIN novamente.");
    } catch (error) {
        console.error("❌ ERRO ao definir claim de administrador:", error.message);
    } finally {
        // Encerra o processo
        process.exit(); 
    }
}

setAdminClaim();
```
eof

#### 3. Execute o Script

Rode este script no seu terminal (ainda dentro da pasta `backend/`):

```bash
node set_admin.js
