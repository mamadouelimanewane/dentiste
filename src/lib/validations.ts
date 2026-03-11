import { z, ZodError } from 'zod'

// ============================================
// PATIENTS
// ============================================
export const createPatientSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis").max(100),
    lastName: z.string().min(1, "Le nom est requis").max(100),
    email: z.string().email("Format d'email invalide").optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
    dob: z.string().datetime().optional().nullable(),
    gender: z.enum(["M", "F", "OTHER"]).optional().nullable(),
    address: z.string().max(500).optional().nullable(),
    source: z.string().max(100).optional().nullable(),
    workflowStatus: z.string().max(50).optional().nullable(),
})

export const updatePatientSchema = createPatientSchema.partial().extend({
    id: z.string().uuid("ID patient invalide"),
})

// ============================================
// APPOINTMENTS
// ============================================
export const createAppointmentSchema = z.object({
    patientId: z.string().min(1, "L'ID du patient est requis"),
    title: z.string().min(1, "Le titre est requis").max(200),
    start: z.string().min(1, "La date de début est requise"),
    end: z.string().min(1, "La date de fin est requise"),
    type: z.string().min(1, "Le type est requis").max(50),
    status: z.string().max(30).optional().default("CONFIRMED"),
    notes: z.string().max(2000).optional().nullable(),
    isSurgery: z.boolean().optional().default(false),
    siteId: z.string().max(50).optional().default("CABINET_DAKAR"),
    dentistId: z.string().optional().nullable(),
    assistantId: z.string().optional().nullable(),
    roomId: z.string().optional().nullable(),
})

// ============================================
// INVENTORY / STOCK
// ============================================
export const createStockItemSchema = z.object({
    name: z.string().min(1, "Le nom est requis").max(200),
    category: z.string().min(1, "La catégorie est requise").max(100),
    quantity: z.coerce.number().int().min(0, "La quantité doit être positive"),
    minQuantity: z.coerce.number().int().min(0).optional().default(5),
    unit: z.string().min(1, "L'unité est requise").max(50),
    lotNumber: z.string().max(100).optional().nullable(),
    expiryDate: z.string().datetime().optional().nullable(),
    isSterile: z.boolean().optional().default(false),
})

export const updateStockItemSchema = createStockItemSchema.partial()

// ============================================
// PRESCRIPTIONS
// ============================================
const prescriptionItemSchema = z.object({
    name: z.string().min(1, "Le nom du médicament est requis").max(200),
    dosage: z.string().max(200).optional().nullable(),
    duration: z.string().max(100).optional().nullable(),
    instructions: z.string().max(500).optional().nullable(),
})

export const createPrescriptionSchema = z.object({
    patientId: z.string().min(1, "L'ID du patient est requis"),
    notes: z.string().max(2000).optional().nullable(),
    items: z.array(prescriptionItemSchema).min(1, "Au moins un médicament est requis"),
})

// ============================================
// QUOTES (DEVIS)
// ============================================
export const createQuoteSchema = z.object({
    patientId: z.string().min(1, "L'ID du patient est requis"),
    title: z.string().min(1, "Le titre est requis").max(300),
    total: z.coerce.number().min(0, "Le total doit être positif"),
    status: z.enum(["DRAFT", "SENT", "ACCEPTED", "REJECTED"]).optional().default("DRAFT"),
})

export const updateQuoteSchema = createQuoteSchema.partial()

// ============================================
// STERILIZATION
// ============================================
export const createSterilizationSchema = z.object({
    operator: z.string().min(1, "L'opérateur est requis").max(100),
    machineId: z.string().min(1, "L'ID de la machine est requis").max(50),
    cycleNumber: z.coerce.number().int().min(1, "Le numéro de cycle est requis"),
    status: z.enum(["SUCCESS", "FAILURE", "PENDING"]).optional().default("SUCCESS"),
    notes: z.string().max(1000).optional().nullable(),
    instruments: z.string().max(2000).optional().nullable(),
})

// ============================================
// TASKS
// ============================================
export const createTaskSchema = z.object({
    title: z.string().min(1, "Le titre est requis").max(300),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional().default("TODO"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional().default("MEDIUM"),
    category: z.enum(["CLINICAL", "ADMIN", "LAB", "FOLLOW_UP"]).optional().default("ADMIN"),
    patientId: z.string().optional().nullable(),
    dueDate: z.string().datetime().optional().nullable(),
})

export const updateTaskSchema = z.object({
    id: z.string().min(1, "L'ID est requis"),
    title: z.string().min(1).max(300).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    category: z.enum(["CLINICAL", "ADMIN", "LAB", "FOLLOW_UP"]).optional(),
    patientId: z.string().optional().nullable(),
    dueDate: z.string().datetime().optional().nullable(),
})

// ============================================
// LAB WORK
// ============================================
export const createLabWorkSchema = z.object({
    patientId: z.string().min(1, "L'ID du patient est requis"),
    labName: z.string().min(1, "Le nom du labo est requis").max(200),
    type: z.string().min(1, "Le type d'acte est requis").max(100),
    material: z.string().max(100).optional().nullable(),
    shade: z.string().max(50).optional().nullable(),
    status: z.enum(["SENT", "IN_PROGRESS", "RECEIVED", "RETURNED"]).optional().default("SENT"),
    dueDate: z.string().datetime().optional().nullable(),
    notes: z.string().max(1000).optional().nullable(),
})

export const updateLabWorkSchema = createLabWorkSchema.partial()

// ============================================
// COMMUNICATION
// ============================================
export const sendCommunicationSchema = z.object({
    type: z.enum(["SMS", "WHATSAPP", "EMAIL"], { message: "Le type doit être SMS, WHATSAPP ou EMAIL" }),
    recipients: z.array(z.string().min(1)).min(1, "Au moins un destinataire requis"),
    content: z.string().min(1, "Le contenu est requis").max(5000),
    category: z.enum(["REMINDER", "POST_OP", "RECALL", "EDUCATION", "BILLING"]).optional().default("REMINDER"),
    scheduledAt: z.string().datetime().optional().nullable(),
})

// ============================================
// HELPER: Format Zod errors into readable messages
// ============================================
export function formatZodErrors(error: any): string {
    return error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ')
}
