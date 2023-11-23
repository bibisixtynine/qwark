const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.text());
app.use(bodyParser.json());

// Pour servir des fichiers statiques comme votre fichier HTML
app.use(express.static('public'));

const fsPromises = require('fs').promises;

app.post('/save', async (req, res) => {
  try {
    let { name, image, description, code } = req.body;
    
    // Si 'name' est vide, lui attribuer la valeur 'tempo'
    name = name.trim() ? name : 'tempo';
    
    const appDir = 'public/' + name
    
    await fsPromises.mkdir(appDir, { recursive: true });
    await fsPromises.writeFile(appDir + '/app.json', JSON.stringify({ name, image, description }));
    await fsPromises.writeFile(appDir + '/app.js', code);
    
    // Copier index_model.html dans le dossier de l'application sous le nom index.html
    const modelPath = './index_model.html'; // Chemin vers index_model.html
    const indexPath = appDir + '/index.html'; // Chemin où index.html sera créé
    await fsPromises.copyFile(modelPath, indexPath);
    
    // Copier toolbox.js dans le dossier de l'application sous le nom toolbox.js
    const modelPath2 = './public/toolbox.js'; // Chemin vers toolbox.js source
    const indexPath2 = appDir + '/toolbox.js'; // Chemin destination
    await fsPromises.copyFile(modelPath2, indexPath2);
    
    res.send('Application sauvegardée avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la sauvegarde de l\'application');
  }
});

// Route pour charger le code depuis le serveur
app.get('/load', (req, res) => {
    fs.readFile('code.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors du chargement');
        } else {
            res.send(data);
        }
    });
});


// Route pour lister les applications
app.get('/listApps', async (req, res) => {
  try {
    const appsDir = 'public';
    const entries = await fsPromises.readdir(appsDir, { withFileTypes: true }); // Utilisez withFileTypes pour obtenir des informations sur les entrées
    const dirs = [];

    for (const entry of entries) {
      if (entry.isDirectory()) { // Vérifie si l'entrée est un dossier
        dirs.push(entry.name);
      }
    }

    res.json(dirs);
  } catch (error) {
    res.status(500).send('Erreur lors de la liste des applications');
  }
});


// Route pour charger une application spécifique
app.get('/loadApp', async (req, res) => {
  try {
    const appName = req.query.name;
    const appDir = 'public/' + appName
    const appData = await fsPromises.readFile(appDir + '/app.json', 'utf8');
    const appCode = await fsPromises.readFile(appDir + '/app.js', 'utf8');
    res.json({ ...JSON.parse(appData), code: appCode });
  } catch (error) {
    res.status(500).send('Erreur lors du chargement de l\'application');
  }
});


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
