"use client"

import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Printer, Trash2, Check, X } from 'lucide-react'

interface SignaturePadProps {
    onSave: (signature: string) => void
    onCancel: () => void
}

export function SignaturePad({ onSave, onCancel }: SignaturePadProps) {
    const sigCanvas = useRef<SignatureCanvas>(null)

    const clear = () => sigCanvas.current?.clear()

    const save = () => {
        if (sigCanvas.current?.isEmpty()) return
        const dataURL = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png')
        if (dataURL) onSave(dataURL)
    }

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="#0f172a"
                    canvasProps={{
                        className: 'w-full h-64 cursor-crosshair'
                    }}
                />
            </div>
            <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={clear}>
                    <Trash2 className="h-4 w-4 mr-2" /> Effacer
                </Button>
                <Button variant="ghost" onClick={onCancel}>
                    Annuler
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={save}>
                    <Check className="h-4 w-4 mr-2" /> Valider la signature
                </Button>
            </div>
        </div>
    )
}

