import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Demo accounts with specific roles
const DEMO_USERS = [
    { email: "admin@dentoprestige.sn", name: "Dr. Admin Lao", role: "OWNER", password: "password" },
    { email: "dentiste@dentoprestige.sn", name: "Dr. Diallo", role: "DENTIST", password: "password" },
    { email: "assistant@dentoprestige.sn", name: "Mariam Faye", role: "ASSISTANT", password: "password" },
    { email: "compta@dentoprestige.sn", name: "Oumar Tall", role: "ACCOUNTANT", password: "password" },
    { email: "patient@dentoprestige.sn", name: "Abdoulaye Sall", role: "CLIENT", password: "password" },
];

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
                if (!credentials?.email) return null;

                const user = DEMO_USERS.find(u => u.email === credentials.email);
                
                if (user) {
                    return { 
                        id: user.email, 
                        email: user.email, 
                        name: user.name, 
                        role: user.role 
                    };
                }
                
                // Fallback pour tout autre email (considéré comme OWNER pour la démo si non listé)
                return { 
                    id: "guest-id", 
                    email: credentials.email, 
                    name: "Utilisateur Démo", 
                    role: "OWNER" 
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET || "71b9995c-remove-unused-bcrypt-import-causing-vercel-native-module-configuration-error",
    trustHost: true
} as any;
