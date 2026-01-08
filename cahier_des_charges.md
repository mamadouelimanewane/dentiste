# Cahier des Charges : Logiciel de Gestion de Cabinet Dentaire (DentisteApp)

## 1. Contexte et Objectifs
Le projet consiste à développer une application web locale complète et moderne pour la gestion d'un cabinet dentaire. L'objectif est de fournir une interface "Premium", fluide et intuitive, permettant au praticien et à son assistante de gérer l'intégralité de l'activité du cabinet.

## 2. Technologies
- **Frontend/Backend**: Next.js (App Router)
- **Langage**: TypeScript
- **Style**: TailwindCSS (Design système moderne, mode sombre/clair, animations fluides)
- **Base de données**: SQLite (pour usage local initial) avec Prisma ORM
- **Composants UI**: Radix UI / Shadcn (implémentation custom pour un look unique)
- **Icones**: Lucide React

## 3. Fonctionnalités Principales

### 3.1. Gestion des Patients (Dossier Patient Complexe)
- **Liste des patients** : Recherche rapide, filtrage, ajout facile.
- **Fiche d'identité** : Informations civiles, contact, photo.
- **Anamnèse médicale** : Questionnaire médical interactif (allergies, antécédents, risques).
- **Odontogramme (Schéma Dentaire)** :
    - Représentation graphique des dents (adulte/enfant).
    - Interaction visuelle pour marquer les soins (caries, couronnes, extractions).
    - Historique des soins par dent.

### 3.2. Agenda et Prise de Rendez-vous
- **Vue Calendrier** : Jour, Semaine, Mois.
- **Gestion des RDV** : Drag & drop, codes couleurs par type d'acte (consultation, chirurgie, urgence).
- **Rappels** : Statut des RDV (confirmé, manqué, en salle d'attente).

### 3.3. Facturation et Devis
- **Création de Devis** : Basé sur une nomenclature personnalisable.
- **Facturation** : Génération de factures PDF, gestion des paiements (espèces, CB, chèque).
- **Suivi des impayés** : Chiffre d'affaires, reste à charge.

### 3.4. Tableau de Bord (Dashboard)
- **Statistiques clés** : CA du jour/mois, nombre de patients, taux d'occupation.
- **Activités récentes** : Derniers patients vus, prochains RDV.

### 3.5. Administration
- **Gestion des utilisateurs** : Praticiens, secrétaires (rôles et permissions).
- **Paramètres du cabinet** : Nom, logo, horaires, configuration des actes.

## 4. Design et Expérience Utilisateur (UX)
- **Esthétique** : "Glassmorphism", dégradés subtils, typographie moderne (Inter/Outfit).
- **Réactivité** : Application totalement responsive (Tablette/Desktop).
- **Feedback** : Animations lors des interactions (clics, chargements).

## 5. Livrables Attendus
- Structure du projet Next.js configurée.
- Base de données Prisma initialisée.
- Interface utilisateur (UI) implémentée pour les modules principaux.
- Navigation fluide entre les pages.
