"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html lang="fr">
            <body>
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                    <div className="max-w-md w-full text-center space-y-8">
                        <div className="flex justify-center">
                            <div className="h-24 w-24 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 shadow-xl shadow-red-500/20 animate-pulse">
                                <AlertTriangle className="h-10 w-10" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Erreur Critique Système</h1>
                            <p className="text-slate-500 font-medium">
                                Une erreur inattendue a forcé l'arrêt du système de routage. Cela peut être dû à un problème de connexion ou de mémoire cache.
                            </p>
                            <div className="bg-slate-100 p-4 rounded-xl text-left overflow-auto max-h-32 text-[10px] font-mono text-slate-600">
                                {error.message || "Erreur inconnue"}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => reset()}
                                className="w-full bg-slate-900 text-white font-black uppercase tracking-widest h-12 rounded-xl"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" /> Réessayer
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/'}
                                variant="outline"
                                className="w-full border-slate-200 text-slate-900 font-black uppercase tracking-widest h-12 rounded-xl"
                            >
                                <Home className="mr-2 h-4 w-4" /> Dashboard
                            </Button>
                        </div>

                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Code Erreur: INVARIANT_ROUTER_FAIL
                        </p>
                    </div>
                </div>
            </body>
        </html>
    )
}
