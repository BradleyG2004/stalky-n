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

# URL du webhook Zapier
ZAP_URL=https://hooks.zapier.com/hooks/catch/22608860/uu4fnrk/
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
- `ZAP_URL` - URL du webhook Zapier

## 📝 Utilisation

Le frontend Vue.js envoie les données au backend via `/send-to-zapier`, qui les transmet ensuite à Zapier sans problème CORS.
