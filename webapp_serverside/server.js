require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de la connexion à MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Test de la connexion
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base : ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données MySQL avec l\'ID ' + db.threadId);
});

app.get('/', (req, res) => {
    res.send("Serveur Green-IT connecté à la base de données !");
});

const PORT = process.env.PORT || 3000;

const bcrypt = require('bcryptjs');

app.post('/register', async (req, res) => {
    const { nom_complet, email, password } = req.body;

    try {
        // 1. Hachage du mot de passe (Sécurité)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Requête SQL pour insérer l'utilisateur
        const sql = "INSERT INTO users (nom_complet, email, password) VALUES (?, ?, ?)";
        
        db.query(sql, [nom_complet, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Cet email est déjà utilisé." });
                }
                return res.status(500).json({ error: "Erreur lors de l'inscription." });
            }
            res.status(201).json({ message: "Utilisateur créé avec succès !" });
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur." });
    }
});

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur serveur." });
        if (result.length === 0) return res.status(401).json({ error: "Identifiants invalides." });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ error: "Identifiants invalides." });

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            message: "Connexion réussie !",
            token: token, // On envoie le ticket au front-end
            user: { id: user.id, nom: user.nom_complet } 
        });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});