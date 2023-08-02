# Lighthouse report 
Génère des rapports lighthouse en ligne de commande. 


## Prérequis
- NodeJS

## Installation
- Cloner le projet
- Installer les dépendances avec `npm install`
- Lancer le script avec `node index.js`

## Utilisation
- Lancer le script avec `node index.js`
La commande `node index.js` prends un paramètre obligatoire : le fichier JSON contenant les urls à auditer.
- Exemple : `node index.js input-example.json`

Un deuxième paramètre est optionnel : le nom du fichier de sortie. Il ne faut pas rajouter l'extention du ficher, celle-ci sera rajouter.
Par défaut, le fichier de sortie est `lh-report.json`.
- Exemple : `node index.js input-example.json my-report`