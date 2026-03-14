"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useRole() {
    const { data: session, status } = useSession()
    const [demoRole, setDemoRole] = useState<string | null>(null)

    useEffect(() => {
        // Init from localStorage
        const saved = localStorage.getItem('elite-demo-role') || 'OWNER'
        setDemoRole(saved)

        // Listen for changes from other components
        const handleRoleChange = (e: any) => {
            setDemoRole(e.detail)
        }
        window.addEventListener('elite:role-change' as any, handleRoleChange)
        
        return () => window.removeEventListener('elite:role-change' as any, handleRoleChange)
    }, [])

    const activeRole = session?.user ? (session.user as any).role : (demoRole || 'OWNER')
    const user = session?.user ? {
        ...session.user,
        role: (session.user as any).role,
    } : {
        name: demoRole === 'OWNER' ? 'Directeur Elite' : 
              demoRole === 'DENTIST' ? 'Dr. Diallo' :
              demoRole === 'ACCOUNTANT' ? 'Comptable Elite' :
              demoRole === 'CLIENT' ? 'Patient VIP' : 'Assistant Elite',
        role: demoRole || 'OWNER'
    }

    const switchDemoRole = (role: string) => {
        setDemoRole(role)
        localStorage.setItem('elite-demo-role', role)
        window.dispatchEvent(new CustomEvent('elite:role-change', { detail: role }))
    }

    return { 
        role: activeRole, 
        user, 
        status, 
        isDemo: !session,
        switchDemoRole 
    }
}
