# Mon Vieux Grimoire - Backend

Ce dépôt contient le backend de l'application Mon Vieux Grimoire : un site web de référencement et de notation de livres.

## Installation

Suivez les étapes ci-dessous pour installer et configurer le projet localement :

1. Clonez ce dépôt sur votre machine :\
   `git clone https://github.com/lmn31190/MonVieuxGrimoire.git`

2. Accédez au répertoire du projet :\
   `cd MonVieuxGrimoire`

3. Installez les dépendances nécessaires avec la commande suivante :\
   `npm install`

## Configuration de la Base de Données

Avant de lancer le projet, assurez-vous d'avoir configuré votre base de données MongoDB. Vous pouvez suivre les étapes suivantes :

1. Accédez au site web de MongoDB https://www.mongodb.com/cloud/atlas/register et inscrivez-vous pour obtenir un compte.

2. Une fois que vous avez accès à votre tableau de bord, créez un cluster et configurez-le selon vos besoins.

3. Récupérez votre code URI sur MongoDB et ajoutez-le dans un fichier .env.local que vous créez à la racine du projet. Configurez les variables d'environnement suivantes (variables listées dans le fichier .env):

```
MONGO_URI = code URI MongoDB
PORT = PORT DE CONNEXION
JWT_SECRET = Random secrect key
URL = url localhost
```

-   Remplacez `PORT` par le port local sur lequel votre backend sera connecté (par défaut : 4000).
-   Remplacez `MONGO_URI` par l'URL de connexion à votre base de données MongoDB, sous le format `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority.`
-   Remplacez `JWT_SECRET` par une clé secrète de votre choix pour les tokens JWT.
-   Remplacez `URL` par http://localhost:4000 ( selon le PORT de votre serveur ).

## Lancement du backend :

Lancez l'application avec la commande suivante :\
`npm start`

L'application sera accessible à l'adresse http://localhost:4000. Si le serveur fonctionne sur un port différent pour une raison quelconque, le numéro de port correspondant s'affichera dans la console.
