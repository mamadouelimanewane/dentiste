# DentisteApp - Logiciel de Gestion de Cabinet Dentaire

Application de gestion de cabinet dentaire "Premium" développée avec Next.js, TailwindCSS et Prisma.

## Pré-requis

- Node.js 18+
- SQLite (inclus via Prisma)

## Installation

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```
    *(Note : L'installation initiale peut être en cours)*

2.  **Configurer la base de données** :
    ```bash
    npx prisma db push
    ```
    Cela va créer le fichier `dev.db` localement basé sur `prisma/schema.prisma`.

3.  **Lancer l'application** :
    ```bash
    npm run dev
    ```
    Accéder à `http://localhost:3000`.

## Structure du Projet

- `src/app`: Pages et Layouts (App Router)
- `src/components`: Composants UI réutilisables
- `prisma/schema.prisma`: Définition de la base de données
- `cahier_des_charges.md`: Documentation fonctionnelle détaillée

## Stack Technique
- Framework: Next.js 14/15
- Styling: Tailwind CSS + Shadcn concepts
- Database: SQLite + Prisma
- Icons: Lucide React
