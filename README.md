# DentisteApp - Logiciel de Gestion de Cabinet Dentaire

Application de gestion de cabinet dentaire "Premium" développée avec Next.js, TailwindCSS et Prisma.

## Pré-requis

- Node.js 18+
- MongoDB (Atlas recommandé)
- Node.js 18+

## Configuration MongoDB (Atlas)

1.  **Mise à jour du fichier `.env`** :
    Remplacez la variable `DATABASE_URL` par votre chaîne de connexion MongoDB Atlas.
    ```env
    DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.mongodb.net/dentiste"
    ```

2.  **Initialisation de la base** :
    ```bash
    npx prisma db push
    ```
    Cette commande va créer les collections nécessaires sur votre instance MongoDB Atlas.

3.  **Génération du client** :
    ```bash
    npx prisma generate
    ```

## Installation

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```

2.  **Lancer l'application** :
    ```bash
    npm run dev
    ```
    Accédez à `http://localhost:3000`.

## Architecture "Domain-Driven" (Parcours Patient)

L'application est structurée autour d'une architecture modulaire centrée sur le métier du cabinet dentaire. Le code est organisé par "Route Groups" dans `src/app` pour refléter les 6 phases du parcours patient :

### Cœur Métier (`src/app/(core)`)
Le flux opérationnel principal est découpé en 6 étapes :
1. **`(1-accueil)`** : Admission, prise de RDV, création du dossier, portails patients.
2. **`(2-arrivee)`** : Check-in, salle d'attente dynamique, formulaires d'accueil.
3. **`(3-consultation)`** : Dossier clinique, schéma dentaire, intelligence artificielle (radios, Smile Design), devis.
4. **`(4-realisation)`** : Chirurgie, ordonnances, liaison laboratoire, stérilisation/traçabilité.
5. **`(5-administration)`** : Facturation, FSE, encaissements (Wave, OM, CB).
6. **`(6-suivi)`** : GED (Vault), conformité RGPD, alertes et communication Post-Op.

### Modules Transversaux (`src/app/(modules)`)
Les fonctionnalités support sont isolées de la logique patient :
- **`(admin)`** : Pilotage exécutif (Dashboards), Gouvernance (RH), Finance (OHADA), Paramètres.
- **`(intelligence)`** : IA générative, analyses statistiques, marketing, fidélisation.
- **`(ops)`** : Documentation interne, gestion de stock, base de connaissances.

### Conventions de Code
- `src/components`: Composants UI réutilisables (shadcn/ui + Tailwind + Framer Motion).
- `prisma/schema.prisma`: Définition de la base de données MongoDB (Data model ultra-complet).
- `cahier_des_charges.md`: Documentation fonctionnelle détaillée.

## Stack Technique
- Framework: Next.js 16
- Styling: Tailwind CSS + Shadcn concepts
- Database: MongoDB + Prisma
- Icons: Lucide React
