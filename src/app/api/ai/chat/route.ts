import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL,
})

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        const response = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: 'Tu es un assistant expert pour un cabinet dentaire. Tu réponds de manière professionnelle, précise et concise. Tu as accès aux données du dossier patient (antécédents, soins, imagerie). Ton but est d\'aider le dentiste dans son diagnostic et ses prescriptions en respectant les normes de sécurité médicale.'
                },
                ...messages
            ],
            stream: false,
        })

        return NextResponse.json({ text: response.choices[0].message.content })
    } catch (error: any) {
        console.error('DeepSeek Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
