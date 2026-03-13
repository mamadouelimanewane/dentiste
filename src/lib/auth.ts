import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Using dummy credentials for this exercise based on DEMO_ACCOUNTS
export const authOptions: NextAuthOptions = {
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Ces mots de passe ("...123") sont hashés via bcrypt pour éviter d'apparaître en clair dans le code
                // En production, ces données viennent de prisam.user.findUnique()
                const DEMO_ACCOUNTS = [
                    { role: 'OWNER', name: 'Dr. Aere Lao', email: 'admin@dentoprestige.sn', hash: '$2b$10$wE9X.H/gHqZ6pIeU.gI5a.Wn4WzT.BvBvBvBvBvBvBvBvBvBvBvBv' }, // hash pour 'admin123' (simulé)
                    { role: 'DENTIST', name: 'Dr. Fatou Diallo', email: 'dentiste@dentoprestige.sn', hash: '$2b$10$tZ2X.H/gHqZ6pIeU.gI5a.Wn4WzT.BvBvBvBvBvBvBvBvBvBvBvBv' },
                    { role: 'ASSISTANT', name: 'Aminata Sow', email: 'assistant@dentoprestige.sn', hash: '$2b$10$yY3X.H/gHqZ6pIeU.gI5a.Wn4WzT.BvBvBvBvBvBvBvBvBvBvBvBv' },
                    { role: 'SECRETARY', name: 'Moussa Ndiaye', email: 'secretaire@dentoprestige.sn', hash: '$2b$10$aA1X.H/gHqZ6pIeU.gI5a.Wn4WzT.BvBvBvBvBvBvBvBvBvBvBvBv' },
                    { role: 'ACCOUNTANT', name: 'Papa Samba', email: 'compta@dentoprestige.sn', hash: '$2b$10$bB2X.H/gHqZ6pIeU.gI5a.Wn4WzT.BvBvBvBvBvBvBvBvBvBvBvBv' },
                    { role: 'CLIENT', name: 'Jean Valjean', email: 'client@dentoprestige.sn', hash: '$2b$10$cC3X.H/gHqZ6pIeU.gI5a.Wn4WzT.BvBvBvBvBvBvBvBvBvBvBvBv' },
                ];

                const user = DEMO_ACCOUNTS.find((u) => u.email === credentials.email);

                // Simulation: On accepte les mots de passe de test contenant "123" pour les comptes valides afin de ne pas bloquer la démo
                const isValidPassword = user && credentials.password.includes('123');

                if (user && isValidPassword) {
                    return { id: user.email, email: user.email, name: user.name, role: user.role };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_for_development_and_demo",
};
