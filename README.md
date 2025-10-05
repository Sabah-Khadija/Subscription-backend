# Subscription Tracker API

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 🔋 Features

* **Advanced Rate Limiting and Bot Protection** — Intégration avec Arcjet pour sécuriser l’application.
* **Database Modeling** — Modèles et relations conçus avec MongoDB & Mongoose.
* **JWT Authentication** — Authentification par tokens, opérations CRUD sur les utilisateurs et gestion des abonnements.
* **Global Error Handling** — Validation des entrées et gestion via middlewares.
* **Logging Mechanisms** — Journaux pour faciliter le debug et le monitoring.
* **Email Reminders** — Automatisation des rappels par email (workflows avec Upstash / Qstash).
* **Architecture scalabe** — Séparation claire des couches (routes, controllers, services, models, middlewares) pour la réutilisabilité et la maintenabilité.
---

##  Quick Start

Suivez ces étapes pour configurer le projet localement.

### Prérequis

* Git
* Node.js (version recommandée >= 18)
* npm ou yarn

### Cloner le dépôt

```bash
git clone https://github.com/Sabah-Khadija/Subscription-backend.git
cd subscription-tracker-api
```

### Installation

```bash
npm install
```

### Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez :

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"


```
after that you can start 
```bash
npm run dev
```

Ouvrez `http://localhost:5500` (ou testez via Postman / Insomnia ....).

---

## 📁 Structure du projet (exemple)

```
src/
├─ config/          # configuration (db, env, services)
├─ controllers/     # logique des routes
├─ middlewares/     # middlewares (auth, error handler, rate limit)
├─ models/          # Mongoose models
├─ routes/          # definitions des endpoints
└─ app.js          # point d'entrée
```

---

## 🔌 Endpoints (exemples)

> Ces exemples montrent la logique attendue — adapte selon ton implémentation.

* `POST /api/v1/auth/` — créer un compte utilisateur
* `POST /api/v1/auth/login` — authentifier (retourne un JWT)
* `GET /api/v1/users/1234444567788` — obtenir le profil (protected)
* `POST /api/v1/subscriptions` — créer un abonnement
* `GET /api/v1/subscriptions` — lister les abonnements d’un utilisateur
* `PUT /api/v1/subscriptions/:id` — mettre à jour un abonnement
* `DELETE /api/v1/subscriptions/:id` — supprimer un abonnement

