"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function Error({
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
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                        <AlertCircle className="h-8 w-8" />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Erreur du Module</h2>
                    <p className="text-sm text-slate-500 mt-2 font-medium">
                        Ce module a rencontré un problème. Essayez de recharger.
                    </p>
                </div>

                <Button
                    onClick={() => reset()}
                    variant="outline"
                    className="border-slate-200 font-black uppercase tracking-widest text-xs h-10 px-6 rounded-xl"
                >
                    <RefreshCcw className="mr-2 h-3.5 w-3.5" /> Recharger le module
                </Button>
            </div>
        </div>
    )
}
