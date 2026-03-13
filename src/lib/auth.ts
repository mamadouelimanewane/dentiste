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
                // Pour les démos, on accepte tout le monde automatiquement
                return { 
                    id: "demo-id", 
                    email: credentials?.email || "admin@dentoprestige.sn", 
                    name: "Dr. Démo", 
                    role: "OWNER" 
                };
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
    secret: process.env.NEXTAUTH_SECRET || "71b9995c-remove-unused-bcrypt-import-causing-vercel-native-module-configuration-error",
    trustHost: true
} as any;
