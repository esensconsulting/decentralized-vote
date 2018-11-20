# Vote on Ethereum
Application de vote décentralisé sur la blockchain Ethereum

## Compilation et installation du projet

### Prérequis
- Installer [Ganache](https://github.com/trufflesuite/ganache/releases) (.exe)
- Installer [NPM et Node.js](https://nodejs.org/fr)
- Installer l'extension [Metamask](https://metamask.io) sur votre navigateur
- Récupérer les sources du projet 
```
$ git clone https://github.com/esensconsulting/decentralized-vote.git
```


### Configurer Metamask

- Lancer ganache sur votre poste
- Cliquer sur l'extension Metamask dans votre navigateur
- Attention, ne pas remplir le mot de passe
- Récupérer les 12 mots de votre ganache en local en dessous de MNEMONIC
- Cliquer sur "Import with seed phrase"
- Coller les 12 mots
- Créer un nouveau mot de passe
- Valider
- Cliquer sur le réseau
- Sélectionner RPC personnalisé
- Coller dans New Network : http://127.0.0.1:7545
- Enregistrer
- Votre compte metamask est maintenant connecté à votre ganache en local

### Instalation du projet
Ouvrir un terminal en tant qu'administrateur et exécuter ces commandes : 
```
$ npm install --global node-gyp
$ npm install --global --production windows-build-tools
$ npm install -g truffle
$ truffle migrate --reset --compile-all
$ npm rebuild node-sass --force
$ npm install
$ npm start
```
Pour accéder au projet, il suffit de se connecter à cette URL : http://localhost:8080

## Tutos

- https://cryptozombies.io/
- http://truffleframework.com/tutorials/pet-shop


[ESENS Consulting](https://www.esensconsulting.com/)
