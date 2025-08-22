"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// Charger les variables d'environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://stalky-theta.vercel.app'], // Autoriser votre frontend Vue
    credentials: true
}));
app.use(express_1.default.json());
// Route pour envoyer les données vers Zapier
app.post('/send-to-zapier', async (req, res) => {
    const { instagram, about } = req.body;
    console.log('Données reçues du frontend:', { instagram, about });
    try {
        const zapierWebhook = process.env.ZAP_URL;
        if (!zapierWebhook) {
            console.error('Variable d\'environnement ZAP_URL manquante');
            return res.status(500).json({
                success: false,
                error: 'Configuration Zapier manquante'
            });
        }
        console.log('Envoi vers Zapier webhook:', zapierWebhook);
        const response = await (0, node_fetch_1.default)(zapierWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ instagram, about })
        });
        const responseText = await response.text();
        console.log('Réponse de Zapier:', response.status, responseText);
        if (response.ok) {
            res.status(200).json({
                success: true,
                message: 'Données envoyées avec succès vers Zapier',
                zapierResponse: responseText
            });
        }
        else {
            res.status(response.status).json({
                success: false,
                error: `Erreur Zapier: ${response.status}`,
                zapierResponse: responseText
            });
        }
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi vers Zapier:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        });
    }
});
// Route de test
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend Stalky Node.js opérationnel',
        timestamp: new Date().toISOString()
    });
});
// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Backend Stalky démarré sur le port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map