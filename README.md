# Stalky Node.js Backend

Backend Node.js pour l'application Stalky - Envoi des données vers Zapier.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
```

## ⚙️ Configuration

Créez un fichier `.env` avec :

```bash
# Configuration du serveur
PORT=3001

# URL du premier webhook Zapier (obligatoire)
ZAP_URL=https://hooks.zapier.com/hooks/catch/22608860/uu4fnrk/

# URL du deuxième webhook Zapier (optionnel)
ZAP_URL2=https://hooks.zapier.com/hooks/catch/VOTRE_DEUXIEME_ID/
```

## 🏃‍♂️ Démarrage

```bash
# Mode développement
npm run dev

# Mode développement avec rechargement automatique
npm run dev:watch

# Build et démarrage en production
npm run build
npm start
```

## 📡 Endpoints

- `POST /send-to-zapier` - Envoi des données vers Zapier
- `GET /health` - Vérification de l'état du serveur

## 🔧 Variables d'environnement

- `PORT` - Port du serveur (défaut: 3001)
- `ZAP_URL` - URL du premier webhook Zapier (obligatoire)
- `ZAP_URL2` - URL du deuxième webhook Zapier (optionnel)

## 📝 Utilisation

Le frontend Vue.js envoie les données au backend via `/send-to-zapier`, qui les transmet ensuite à Zapier sans problème CORS.

### 🔄 Flux d'exécution

1. **Premier webhook** (`ZAP_URL`) : Reçoit les données `instagram` et `about`
2. **Deuxième webhook** (`ZAP_URL2`) : Se déclenche automatiquement après le succès du premier (sans données)
3. **Gestion d'erreur** : Si le premier échoue, le deuxième n'est pas appelé
4. **Logs détaillés** : Suivi complet des deux appels dans la console
