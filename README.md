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

## Structure du Projet

- `src/app`: Pages et Layouts (App Router)
- `src/components`: Composants UI réutilisables
- `prisma/schema.prisma`: Définition de la base de données (modifiée pour MongoDB)
- `cahier_des_charges.md`: Documentation fonctionnelle détaillée

## Stack Technique
- Framework: Next.js 16
- Styling: Tailwind CSS + Shadcn concepts
- Database: MongoDB + Prisma
- Icons: Lucide React
