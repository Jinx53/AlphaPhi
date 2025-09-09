## Alphaphi

# AlphaPhi

AlphaPhi is a server-side application designed to manage user authentication, email communication, and data storage for the AlphaPhi platform. The backend is built with Node.js and Express, providing a robust RESTful API for client applications. It integrates with MongoDB for data persistence and supports secure user registration, login, and email notifications.

## Features

- User registration and authentication (JWT-based)
- Password hashing and validation
- Email notifications (via AWS SES, Nodemailer, and MailSlurp)
- RESTful API endpoints for user management
- File uploads with Multer
- Environment variable management with dotenv
- CORS support for cross-origin requests
- Comprehensive testing with Jest and Supertest

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **Nodemailer**
- **AWS SES SDK**
- **MailSlurp**
- **Multer**
- **dotenv**
- **CORS**
- **Jest** & **Supertest** (for testing)
- **Nodemon** (for development)

## Getting Started

1. Clone the repository.
2. Install dependencies:  
   `npm install`
3. Set up your environment variables in a `.env` file.
4. Start the server:  
   `npm start`
5. Run tests:  
   `npm test`

---

# AlphaPhi (Français)

AlphaPhi est une application côté serveur conçue pour gérer l'authentification des utilisateurs, la communication par e-mail et le stockage des données pour la plateforme AlphaPhi. Le backend est construit avec Node.js et Express, offrant une API RESTful robuste pour les applications clientes. Il s'intègre à MongoDB pour la persistance des données et prend en charge l'inscription sécurisée des utilisateurs, la connexion et les notifications par e-mail.

## Fonctionnalités

- Inscription et authentification des utilisateurs (basée sur JWT)
- Hachage et validation des mots de passe
- Notifications par e-mail (via AWS SES, Nodemailer et MailSlurp)
- Points de terminaison API RESTful pour la gestion des utilisateurs
- Téléchargement de fichiers avec Multer
- Gestion des variables d'environnement avec dotenv
- Prise en charge de CORS pour les requêtes cross-origin
- Tests complets avec Jest et Supertest

## Technologies Utilisées

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **Nodemailer**
- **AWS SES SDK**
- **MailSlurp**
- **Multer**
- **dotenv**
- **CORS**
- **Jest** & **Supertest** (pour les tests)
- **Nodemon** (pour le développement)

## Pour Commencer

1. Clonez le dépôt.
2. Installez les dépendances :  
   `npm install`
3. Configurez vos variables d'environnement dans un fichier `.env`.
4. Démarrez le serveur :  
   `npm start`
5. Lancez les tests :  
   `npm test`
