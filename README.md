# Hackathon 2022
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

**Présentation du commanditaire:** 
Wired Beauty propose la vente de produits permettant de synchroniser des données avec l’application mobile. Toutes ces données recueillies permettent de générer des rapports quant à l’efficacité du soin.

**Objectif du site internet:** 
- agréger de nouveaux testeurs
- vendre des rapports de données aux grands groupes cosmétiques.

**Fonctionnalités attendues:** 
Administration:
 - [x] Gérer la liste des campagnes de tests et produits à tester
 - [x] Voir la liste des testeurs
 - [x] Uploader un document contenant les questions et réponses possibles pour le test
 - [x] Afficher les réponses d'un QCM
 - [x] Exporter les données d'une campagne au format pdf
 
 Testeur:
  - [x] Connexion / Inscription
  - [x] Postuler à une campagne de test
  - [x] Remplir le QCM de la campagne
  - [x] Afficher la liste des campagnes ouvertes
  - [x] Afficher son profil utilisateur

**Equipe:** 
* [Alexis Guay](https://github.com/ag7-alexis) 
	* [accéder à son portfolio](https://www.alexis-guay.fr/)
*  [Théo Boudier](https://github.com/TheoLeao/)
	* [accéder à son portfolio](https://www.theoboudier.fr)
* [Pierre Landry](https://github.com/ag7-alexis)
* [Mathieu Siaud](https://github.com/mathieusi38)

# Technologies et librairies utilisées

Technologies
* Laravel
* ReactJS (je sais que c'est une librairie, c'est un choix de le mettre ici)
* NextJS

Librairies:
* [Chakra UI](https://chakra-ui.com/) : Librairie de composants React moderne et performante
* [Lottie](https://lottiefiles.com/): Ressource d'animations implementable sur react via leur [web player](https://github.com/LottieFiles/lottie-react)
* [React Icons](https://react-icons.github.io/react-icons/): Librairie d'icons pour react
* [React Chart JS 2](https://github.com/reactchartjs/react-chartjs-2): Librairie de composants React pour Chart.NJS
* [Formik](https://formik.org/): Librairie permettant de constuire des formulaires React
* [Yup](https://github.com/jquense/yup): Librairie permettant de gérer les schemas de validation de formulaires
* [React Redux](https://react-redux.js.org/): Librairie de gestion d'état pour application web pour React
* [React Redux Toolkit](https://redux-toolkit.js.org/): Librairie qui met à disposition une sur-couche de Redux permettant de faciliter son implémentation

# Pour commencer
 
##  Pré-requis
-   Installer la dernière version de Windows 10 (version 1903+, Build 18362+) ou Windows 11
-   [Installer le Sous-système Windows pour Linux (WSL)](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10), y compris une distribution Linux (comme Ubuntu) et s’assurer qu’elle s’exécute en mode WSL 2. Pour le vérifier, ouvrez PowerShell et entrez :  `wsl -l -v`.
-   [Installer Node.js sur WSL 2](https://docs.microsoft.com/fr-fr/windows/dev-environment/javascript/nodejs-on-wsl) : cela comprend un gestionnaire de version, un gestionnaire de package, Visual Studio Code et l’extension Remote Development.
 
 ## Démarrage
 ```
git clone https://github.com/TheoLeao/ESGI_Hackathon2022
cd ESGI_Hackathon2022
yarn
yarn dev
```

## API Endpoints


```markdown
| Type 	| Lien                                   	| Description                             	| Parametre 	|
|------	|----------------------------------------	|-----------------------------------------	|-----------	|
| POST 	| /api/upload-survey                     	| Upload un questionnaire                 	|           	|
| POST 	| /api/answer                            	| Envoyer une réponse                     	|           	|
| POST 	| /api/login                             	| S'authentifier                          	|           	|
| POST 	| /api/sessions/                         	| Créer une session                       	|           	|
| POST 	| /api/campaigns/{idCampaign}/request    	| Postuler à une campagne                 	|           	|
| POST 	| /api/sessions/{idSession}/accept-user/ 	| Accepter un utilisateur                 	|           	|
| GET  	| /api/campaigns/{idCampaign}/requests   	| Retourne les demandes d'une campagne    	|           	|
| GET  	| /api/campaigns                         	| Retourne l'ensemble des campagnes       	|           	|
| GET  	| /api/metrics/{idSession}               	| Retourne les statistiques d'une session 	|           	|
| GET  	| /api/users/                            	| Retourne les testeurs                   	|           	|
| GET  	| /api/sessions-user/{idSession}         	| Retourne les testeurs de la session     	|           	|
| GET  	| /api/survey/{idSession}                	| Retourne le questionnaire de la session 	|           	|
```

## Diagramme base de donnée

[TODO]