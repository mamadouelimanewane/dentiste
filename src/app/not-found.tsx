import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Ghost, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
            <div className="text-center space-y-8 p-8">
                <div className="flex justify-center">
                    <div className="h-32 w-32 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 animate-bounce cursor-default">
                        <Ghost className="h-16 w-16" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">404 - Page Introuvable</h2>
                    <p className="text-slate-500 font-medium">La ressource que vous recherchez n'existe pas ou a été déplacée.</p>
                </div>

                <Link href="/">
                    <Button className="bg-slate-900 text-white font-black uppercase tracking-widest h-14 rounded-2xl px-8 shadow-xl hover:scale-105 transition-transform">
                        <Home className="mr-2 h-4 w-4" /> Retour au Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}
