import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Si l'utilisateur est authentifié mais essaie d'accéder à certaines routes,
        // on peut rajouter du Role-Based Access Control (RBAC) ici.

        const url = req.nextUrl.pathname;
        const token = req.nextauth.token;

        // Exemple de protection granulaire (RBAC) pour les routes API:
        // Seul le propriétaire ou le comptable peut accéder à la finance
        if (url.startsWith('/api/accounting') && token?.role !== 'OWNER' && token?.role !== 'ACCOUNTANT') {
            return NextResponse.json({ error: "Accès refusé. Rôle insuffisant." }, { status: 403 });
        }

        // Seul le propriétaire ou le dentiste peut accéder aux ordonnances avec droit d'écriture
        if (req.method !== 'GET' && url.startsWith('/api/prescriptions') && token?.role !== 'OWNER' && token?.role !== 'DENTIST') {
            return NextResponse.json({ error: "Accès refusé. Réservé aux praticiens." }, { status: 403 });
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true, // Bypass d'authentification temporaire pour les démos
        },
    }
);

export const config = {
    // On protège l'intégralité de l'application (UI et API) sauf la page de login, les assets publics et les webhooks
    matcher: [
        "/((?!login|_next/static|_next/image|favicon.ico|api/auth|public).*)",
    ],
};
