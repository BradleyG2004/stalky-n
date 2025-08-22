import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173','https://stalky-theta.vercel.app'], // Autoriser votre frontend Vue
  credentials: true
}));
app.use(express.json());

// Route pour envoyer les données vers Zapier
app.post('/send-to-zapier', async (req, res) => {
  const { instagram, about } = req.body;

  console.log('Données reçues du frontend:', { instagram, about });

  try {
    const zapierWebhook = process.env.ZAP_URL;
    const zapierWebhook2 = process.env.ZAP_URL2;
    
    if (!zapierWebhook) {
      console.error('Variable d\'environnement ZAP_URL manquante');
      return res.status(500).json({ 
        success: false, 
        error: 'Configuration Zapier manquante' 
      });
    }

    console.log('Envoi vers premier Zapier webhook:', zapierWebhook);

    // Premier appel vers Zapier
    const response = await fetch(zapierWebhook, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ instagram, about })
    });

    const responseText = await response.text();
    console.log('Réponse du premier Zapier:', response.status, responseText);

    if (response.ok) {
      console.log('Premier webhook Zapier réussi, déclenchement du deuxième...');
      
      // Si le premier webhook réussit, appeler le deuxième
      if (zapierWebhook2) {
        try {
          console.log('Envoi vers deuxième Zapier webhook:', zapierWebhook2);
          
          const response2 = await fetch(zapierWebhook2, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ instagram, about }) // Pas de données à transmettre
          });

          const responseText2 = await response2.text();
          console.log('Réponse du deuxième Zapier:', response2.status, responseText2);

          if (response2.ok) {
            console.log('Deuxième webhook Zapier réussi');
          } else {
            console.warn('Deuxième webhook Zapier échoué:', response2.status);
          }
        } catch (error2) {
          console.warn('Erreur lors de l\'appel du deuxième webhook:', error2);
        }
      } else {
        console.log('ZAP_URL2 non configuré, deuxième webhook ignoré');
      }

      res.status(200).json({ 
        success: true, 
        message: 'Données envoyées avec succès vers Zapier',
        zapierResponse: responseText,
        secondWebhookTriggered: !!zapierWebhook2
      });
    } else {
      res.status(response.status).json({ 
        success: false, 
        error: `Erreur Zapier: ${response.status}`,
        zapierResponse: responseText
      });
    }

  } catch (error) {
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
  console.log(`🚀 Backend Stalky démarré sur le port ${PORT}`)
});

export default app;
