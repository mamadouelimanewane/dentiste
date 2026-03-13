#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DentoPrestige_Signature.pdf - 10 pages
Modeled after AvocatSignature.pdf (LexPremium)
Document: ERP clinique Elite + GED Sécurisé - Module par module avec signature
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "DentoPrestige_Signature.pdf")
W, H = A4

DARK  = colors.HexColor("#0f172a")
GOLD  = colors.HexColor("#d4af37")
WHITE = colors.white
LIGHT = colors.HexColor("#f8fafc")
SLATE = colors.HexColor("#334155")
NAVY  = colors.HexColor("#1e3a5f")
GREY  = colors.HexColor("#64748b")

def footer(c, pg):
    c.setFillColor(DARK)
    c.rect(0, 0, W, 28, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, 28, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(WHITE)
    c.drawString(18, 10, "DentoPrestige Africa  \u2022  ERP Dentaire d\u2019\u00c9lite & Intelligence Artificielle")
    c.drawRightString(W-18, 10, "mamadou.dia@processingenierie.com  |  +221 777 529 288")
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 10, f"\u25c6  {pg}  \u25c6")

def dark_hdr(c, title, subtitle=None):
    c.setFillColor(DARK)
    c.rect(0, H-110, W, 110, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H-5, W, 5, stroke=0, fill=1)
    c.rect(0, H-110, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H-60, title)
    if subtitle:
        c.setFont("Helvetica", 11)
        c.setFillColor(WHITE)
        c.drawCentredString(W/2, H-82, subtitle)

def body(c, text, x, y, maxw=None, sz=9.5, col=SLATE, lh=15):
    if maxw is None:
        maxw = W-x-24
    c.setFont("Helvetica", sz)
    c.setFillColor(col)
    words = text.split()
    line = ""
    for w in words:
        t = line + (" " if line else "") + w
        if c.stringWidth(t, "Helvetica", sz) < maxw:
            line = t
        else:
            c.drawString(x, y, line)
            y -= lh
            line = w
    if line:
        c.drawString(x, y, line)
        y -= lh
    return y-4

def bul(c, text, y, x=28, sz=9.5):
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawString(x, y, "\u25c6")
    c.setFont("Helvetica", sz)
    c.setFillColor(SLATE)
    words = text.split()
    line = ""
    x2 = x+14
    maxw = W-x2-24
    for w in words:
        t = line + (" " if line else "") + w
        if c.stringWidth(t, "Helvetica", sz) < maxw:
            line = t
        else:
            c.drawString(x2, y, line)
            y -= 14
            line = w
    if line:
        c.drawString(x2, y, line)
        y -= 14
    return y-4

def sec(c, title, y, x=24):
    c.setFillColor(GOLD)
    c.rect(x, y-4, 4, 18, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(DARK)
    c.drawString(x+10, y, title)
    return y-28

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 1 — COVER
# ═══════════════════════════════════════════════════════════════════════════════
def p01(c):
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#d4af3710"))
    c.circle(W-80, H-80, 150, stroke=0, fill=1)
    c.circle(80, 80, 120, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H-5, W, 5, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 34)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H-90, "\u25c6")
    c.setFont("Helvetica-Bold", 40)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, H-148, "DENTOPRESTIGE")
    c.setFillColor(GOLD)
    c.rect(W/2-120, H-162, 240, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H-188, "ERP Dentaire d\u2019\u00c9lite & Intelligence Artificielle")
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(W/2, H-218, "Document de pr\u00e9sentation & engagement de service")
    # Modules coverage
    c.setFillColor(colors.HexColor("#1e293b"))
    c.roundRect(60, H-390, W-120, 140, 10, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(60, H-252, W-120, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H-276, "Ce document pr\u00e9sente les modules cl\u00e9s de DentoPrestige :")
    modules = [
        "GED \u00c9lite & Archivage S\u00e9curis\u00e9 des Dossiers Cliniques",
        "Intelligence Artificielle Clinique Int\u00e9gr\u00e9e (DentoAI)",
        "Comptabilit\u00e9 OHADA Compl\u00e8te & Financial War Room",
        "S\u00e9curit\u00e9 de Niveau Bancaire & Conformit\u00e9 UEMOA",
    ]
    my = H-304
    for m in modules:
        c.setFont("Helvetica", 10)
        c.setFillColor(WHITE)
        c.drawCentredString(W/2, my, "\u25c6  "+m)
        my -= 20
    # Bottom info
    c.setFillColor(GOLD)
    c.rect(0, 40, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 22, "DentoPrestige Africa  \u2022  Le Standard de l\u2019Excellence pour le Praticien de Demain")
    footer(c, 1)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 2 — GED ÉLITE & ARCHIVAGE SÉCURISÉ
# ═══════════════════════════════════════════════════════════════════════════════
def p02(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "GED \u00c9LITE & ARCHIVAGE S\u00c9CURIS\u00c9",
             "Gestion \u00c9lectronique de Documents Cliniques de Niveau Bancaire")
    footer(c, 2)
    y = H-130
    y = sec(c, "Architecture Documentaire Clinique", y)
    body_txt = ("La GED DentoPrestige centralise l\u2019int\u00e9gralit\u00e9 de vos documents cliniques "
                "dans un coffre-fort num\u00e9rique chiffr\u00e9 AES-256. Chaque document est index\u00e9, "
                "class\u00e9 automatiquement par l\u2019IA et accessible instantan\u00e9ment par tout "
                "le personnel habilit\u00e9, depuis n\u2019importe quel support.")
    y = body(c, body_txt, 24, y, lh=16)
    y -= 14
    y = sec(c, "Fonctionnalit\u00e9s GED Clinique", y)
    ged = [
        "OCR Haute R\u00e9solution : Conversion des radiographies scann\u00e9es en texte \u00e9ditable",
        "Versioning Professionnel : Chaque modification trac\u00e9e avec auteur et horodatage",
        "Signature Num\u00e9rique : Consentements \u00e9clair\u00e9s sign\u00e9s l\u00e9galement avec IP et checksum",
        "Recherche Plein Texte : Fouille instantan\u00e9e dans tout le fonds documentaire",
        "Classification IA : Tri automatique par type (ordonnance, radio, consentement, acte)",
        "Sensibilit\u00e9 IA : NORMAL, CONFIDENTIEL, CRITIQUE selon le contenu",
        "Chiffrement IV : Vecteur d\u2019initialisation unique par document",
        "Coffre-Fort Patient : Documents inaccessibles sans habilitation explicite",
    ]
    for g in ged:
        y = bul(c, g, y)
    y -= 14
    y = sec(c, "Types de Documents G\u00e9r\u00e9s", y)
    types = [
        "Consentements \u00e9clair\u00e9s (avec signature num\u00e9rique et preuve cryptographique)",
        "Radiographies (XRAY, PANORAMIQUE, CBCT, DICOM)",
        "Photos cliniques (avant/apr\u00e8s traitement)",
        "Ordonnances et prescriptions m\u00e9dicales sign\u00e9es",
        "Plans de traitement accept\u00e9s par le patient",
        "Rapports biologiques et bons de laboratoire dentaire",
        "Documents administratifs et justificatifs financiers",
    ]
    for t in types:
        y = bul(c, t, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 3 — SIGNATURE NUMÉRIQUE & CONSENTEMENTS
# ═══════════════════════════════════════════════════════════════════════════════
def p03(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "SIGNATURE NUM\u00c9RIQUE & CONSENTEMENTS",
             "Process de Signature L\u00e9gale Int\u00e9gr\u00e9 au Flux Clinique")
    footer(c, 3)
    y = H-130
    y = sec(c, "Processus de Consentement \u00c9clair\u00e9 Digital", y)
    consent_txt = ("DentoPrestige int\u00e8gre un module de signature num\u00e9rique complet permettant "
                   "de collecter les consentements \u00e9clair\u00e9s des patients directement sur "
                   "tablette ou \u00e9cran, avec une valeur l\u00e9gale identique au consentement papier.")
    y = body(c, consent_txt, 24, y, lh=16)
    y -= 14
    # Timeline of signature process
    steps = [
        ("1.", "Pr\u00e9sentation du Document",
         "Le document de consentement est affich\u00e9 sur la tablette avec toutes les informations requises"),
        ("2.", "Lecture et Validation",
         "Le patient lit le document et valide sa compr\u00e9hension avant de signer"),
        ("3.", "Signature Biom\u00e9trique",
         "Signature manuscrite sur l\u2019\u00e9cran tactile collect\u00e9e en temps r\u00e9el"),
        ("4.", "Horodatage et Cryptographie",
         "Timestamp UTC, adresse IP, empreinte numerique et checksum g\u00e9n\u00e9r\u00e9s automatiquement"),
        ("5.", "Archivage S\u00e9curis\u00e9",
         "Document chiffr\u00e9 AES-256 archiv\u00e9 dans le dossier patient et GED"),
    ]
    for num, tit, desc in steps:
        c.setFillColor(NAVY)
        c.roundRect(24, y-54, W-48, 54, 6, stroke=0, fill=1)
        c.setFillColor(GOLD)
        c.rect(24, y-54, 5, 54, stroke=0, fill=1)
        c.setFont("Helvetica-Bold", 11)
        c.setFillColor(GOLD)
        c.drawString(36, y-20, num+"  "+tit)
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#cbd5e1"))
        body(c, desc, 36, y-36, maxw=W-70, sz=9, col=colors.HexColor("#cbd5e1"), lh=13)
        y -= 62
    y -= 10
    y = sec(c, "Preuves Cryptographiques Incluses", y)
    proofs = [
        "Date et heure UTC de la signature (immuable)",
        "Adresse IP de l\u2019appareil utilis\u00e9 pour signer",
        "Empreinte num\u00e9rique (hash SHA-256) du document sign\u00e9",
        "URL de stockage du document avec acc\u00e8s audit\u00e9",
        "Identifiant unique du consentement li\u00e9 au dossier patient",
    ]
    for p in proofs:
        y = bul(c, p, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 4 — DENTOI AI & SCANNER RADIO
# ═══════════════════════════════════════════════════════════════════════════════
def p04(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "DENTOAI & SCANNER RADIOLOGIQUE",
             "Intelligence Artificielle Clinique de Pointe")
    footer(c, 4)
    y = H-130
    y = sec(c, "DentoAI : Votre Assistant Clinique 24h/24", y)
    ai_txt = ("DentoAI est l\u2019intelligence artificielle clinique de DentoPrestige, "
              "propuls\u00e9e par DeepSeek v3. Disponible 24h/24, il acc\u00e8le le diagnostic, "
              "la planification et la documentation clinique.")
    y = body(c, ai_txt, 24, y, lh=16)
    y -= 12
    ai_features = [
        "Chat Clinique Contextuel : Questions sur un dossier patient sp\u00e9cifique",
        "Recherche S\u00e9mantique : Fouille instantan\u00e9e dans les protocoles cliniques",
        "Synth\u00e8se Dossier : R\u00e9sum\u00e9 de l\u2019historique patient en quelques secondes",
        "Suggestions Th\u00e9rapeutiques : Plans de traitement bas\u00e9s sur l\u2019historique",
        "Interactions M\u00e9dicamenteuses : Alertes automatiques lors de la prescription",
    ]
    for a in ai_features:
        y = bul(c, a, y)
    y -= 14
    y = sec(c, "AI Radio Lab : Analyse Radiographique en 60 secondes", y)
    radio_txt = ("Le scanner radiologique IA analyse vos clich\u00e9s dentaires en moins "
                 "d\u2019une minute. Il extrait automatiquement les pathologies visibles, "
                 "annote les zones \u00e0 surveiller et g\u00e9n\u00e8re un rapport structur\u00e9.")
    y = body(c, radio_txt, 24, y, lh=16)
    y -= 12
    radio = [
        "Support : Panoramique, P\u00e9riapicale, Endobuccale, CBCT, DICOM",
        "D\u00e9tection : Caries, P\u00e9ricoronarites, Granulomes, Kystes, Perte osseuse",
        "Annotation : Zones pathologiques marqu\u00e9es directement sur l\u2019image",
        "Rapport : Synth\u00e8se structur\u00e9e avec niveau de confiance par pathologie",
        "Int\u00e9gration : Archivage automatique dans le dossier patient",
    ]
    for r in radio:
        y = bul(c, r, y)
    y -= 14
    y = sec(c, "Dict\u00e9e Vocale & Notes Cliniques IA", y)
    dict_ft = [
        "Transcription haute fid\u00e9lit\u00e9 du jargon dentaire avec correction automatique",
        "Structuration SOAP : Subjectif, Objectif, Analyse, Plan",
        "Enregistrement depuis le fauteuil dentaire sans contact",
        "Int\u00e9gration directe dans le dossier patient actif",
        "Mobilit\u00e9 totale : fonctionne sur smartphone pendant la consultation",
    ]
    for d in dict_ft:
        y = bul(c, d, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 5 — COMPTABILITÉ OHADA
# ═══════════════════════════════════════════════════════════════════════════════
def p05(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "COMPTABILIT\u00c9 & CONFORMIT\u00c9 OHADA",
             "SYSCOHADA Natif \u2022 Journaux R\u00e9glementaires \u2022 Pilotage Strat\u00e9gique")
    footer(c, 5)
    y = H-130
    y = sec(c, "Plan Comptable OHADA Pr\u00e9-configur\u00e9", y)
    plan_txt = ("DentoPrestige int\u00e8gre nativement le plan comptable OHADA/SYSCOHADA. "
                "Les \u00e9critures comptables sont g\u00e9n\u00e9r\u00e9es automatiquement \u00e0 "
                "chaque acte clinique factur\u00e9, sans aucune saisie manuelle.")
    y = body(c, plan_txt, 24, y, lh=16)
    y -= 12
    plan = [
        "Compte 521 : Banque (encaissements par virement et carte)",
        "Compte 571 : Caisse (encaissements esp\u00e8ces)",
        "Compte 131 : R\u00e9sultat Net (calcul automatique en temps r\u00e9el)",
        "Journaux : Ventes, Banque, Caisse, Op\u00e9rations Diverses",
        "Grand Livre : Acc\u00e8s en 2 clics avec filtres p\u00e9riode/compte",
        "Balance de v\u00e9rification : G\u00e9n\u00e9r\u00e9e automatiquement",
    ]
    for p in plan:
        y = bul(c, p, y)
    y -= 14
    y = sec(c, "Financial War Room", y)
    war_txt = ("Le Financial War Room est le centre de commandement financier de votre cabinet. "
               "Tous les indicateurs cl\u00e9s en un seul \u00e9cran, actualis\u00e9s en temps r\u00e9el.")
    y = body(c, war_txt, 24, y, lh=16)
    y -= 12
    war = [
        "Tr\u00e9sorerie en temps r\u00e9el : Banque + Caisse consolid\u00e9s",
        "R\u00e9sultat Net : Calcul automatique D\u00e9bit-Cr\u00e9dit",
        "CA du mois / trimestre / ann\u00e9e avec comparatifs",
        "Top actes par rentabilit\u00e9 et volume",
        "Pr\u00e9visions de tr\u00e9sorerie sur 30-60-90 jours",
        "Alertes automatiques si seuils critiques d\u00e9pass\u00e9s",
    ]
    for w in war:
        y = bul(c, w, y)
    y -= 14
    y = sec(c, "Paiements Mobiles (Wave & Orange Money)", y)
    pay = [
        "Int\u00e9gration CinetPay : Wave, Orange Money, Carte, Esp\u00e8ces",
        "Lien de paiement par SMS/WhatsApp pour les patients",
        "Rapprochement automatique entre paiements et factures",
        "Historique complet des paiements par patient et par acte",
    ]
    for p in pay:
        y = bul(c, p, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 6 — AGENDA & SALLE D'ATTENTE
# ═══════════════════════════════════════════════════════════════════════════════
def p06(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "AGENDA & SALLE D\u2019ATTENTE VIRTUELLE",
             "Planning Intelligent \u2022 Communication Automatis\u00e9e \u2022 T\u00e9l\u00e9consultation")
    footer(c, 6)
    y = H-130
    y = sec(c, "Agenda Multi-Praticien & Multi-Salle", y)
    agenda = [
        "Vue Jour / Semaine / Mois par praticien et par fauteuil",
        "Glisser-d\u00e9poser pour replanification rapide",
        "Codes couleur automatiques par type d\u2019acte clinique",
        "Blocage de cr\u00e9neaux pour formations et r\u00e9unions",
        "Acc\u00e8s smartphone et tablettes partout en temps r\u00e9el",
    ]
    for a in agenda:
        y = bul(c, a, y)
    y -= 14
    y = sec(c, "Communication Automatis\u00e9e Patient", y)
    comm = [
        "WhatsApp automatique d\u00e8s la cr\u00e9ation du RDV",
        "SMS de rappel J-1 et H-2 avant le rendez-vous",
        "Email de confirmation avec lien de modification",
        "Notification portail patient en temps r\u00e9el",
        "Relances automatiques pour les patients qui ne se pr\u00e9sentent pas",
    ]
    for c_item in comm:
        y = bul(c, c_item, y)
    y -= 14
    y = sec(c, "Salle d\u2019Attente Virtuelle", y)
    salle = [
        "Suivi temps r\u00e9el de l\u2019arriv\u00e9e des patients depuis l\u2019accueil",
        "Statuts : CONFIRM\u00c9, ATTENDU, ARRIV\u00c9, EN ATTENTE, TERMIN\u00c9",
        "Alerte push au praticien d\u00e8s l\u2019arriv\u00e9e du patient",
        "Temps d\u2019attente moyen et file d\u2019attente visible",
        "Gestion simultan\u00e9e de plusieurs fauteuils et praticiens",
    ]
    for s in salle:
        y = bul(c, s, y)
    y -= 14
    y = sec(c, "T\u00e9l\u00e9consultation Int\u00e9gr\u00e9e (Jitsi)", y)
    tele = [
        "Cr\u00e9ation de lien vid\u00e9o automatique pour les RDV \u00e0 distance",
        "Partage s\u00e9curis\u00e9 du lien patient par SMS/WhatsApp",
        "Compte-rendu de t\u00e9l\u00e9consultation int\u00e9gr\u00e9 dans le dossier",
        "Facturation sp\u00e9cifique t\u00e9l\u00e9consultation g\u00e9n\u00e9r\u00e9e automatiquement",
    ]
    for t in tele:
        y = bul(c, t, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 7 — SÉCURITÉ & CONFORMITÉ
# ═══════════════════════════════════════════════════════════════════════════════
def p07(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "S\u00c9CURIT\u00c9 & CONFORMIT\u00c9",
             "Protection Bancaire des Donn\u00e9es M\u00e9dicales & R\u00e9glementaires")
    footer(c, 7)
    y = H-130
    y = sec(c, "Chiffrement & Protection des Donn\u00e9es", y)
    secu = [
        "AES-256 au repos : Chiffrement de toutes les donn\u00e9es patient stock\u00e9es",
        "TLS 1.3 en transit : Chiffrement de toutes les communications",
        "IV unique par document : Vecteur d\u2019initialisation sp\u00e9cifique \u00e0 chaque fichier",
        "Secrets en coffre-fort : Cl\u00e9s API et credentials jamais en clair",
    ]
    for s in secu:
        y = bul(c, s, y)
    y -= 14
    y = sec(c, "Authentification & Contr\u00f4le d\u2019Acc\u00e8s (RBAC)", y)
    rbac = [
        "PROPRI\u00c9TAIRE : Acc\u00e8s complet \u00e0 tous les modules et param\u00e8tres",
        "DENTISTE : Acc\u00e8s clinique, patients, traitements et ordonnances",
        "ASSISTANT : Support clinique, agenda, salle d\u2019attente",
        "SECR\u00c9TAIRE : Accueil, agenda, facturation, communication",
        "COMPTABLE : Module financier exclusivement (facturation, OHADA)",
        "PATIENT VIP : Portail personnel avec acc\u00e8s restreint aux propres donn\u00e9es",
    ]
    for r in rbac:
        y = bul(c, r, y)
    y -= 14
    y = sec(c, "Audit Trail & Tra\u00e7abilit\u00e9", y)
    audit = [
        "Enregistrement de chaque action : acc\u00e8s, modification, suppression",
        "Horodatage UTC immuable avec adresse IP et User-Agent",
        "S\u00e9v\u00e9rit\u00e9 class\u00e9e : INFO, AVERTISSEMENT, CRITIQUE",
        "Historique non modifiable des acc\u00e8s aux dossiers sensibles",
        "Export des rapports d\u2019audit pour les inspections sanitaires",
    ]
    for a in audit:
        y = bul(c, a, y)
    y -= 14
    y = sec(c, "Conformit\u00e9 R\u00e9glementaire", y)
    compliance = [
        "RGPD / Loi 2008-12 : Protection des donn\u00e9es personnelles de sant\u00e9",
        "SYSCOHADA : Comptabilit\u00e9 conforme aux normes africaines",
        "Normes UEMOA : R\u00e9glementations sanitaires sous-r\u00e9gionales",
        "Secret M\u00e9dical : Cloisonnement strict des donn\u00e9es cliniques",
    ]
    for c_item in compliance:
        y = bul(c, c_item, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 8 — APPLICATIONS MOBILES & SUPPORT
# ═══════════════════════════════════════════════════════════════════════════════
def p08(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "APPLICATIONS MOBILES & SUPPORT",
             "Mobilit\u00e9 Totale \u2022 Formations Incluses \u2022 Support D\u00e9di\u00e9")
    footer(c, 8)
    y = H-130
    y = sec(c, "4 Applications Mobiles Sp\u00e9cialis\u00e9es", y)
    apps = [
        ("App Admin (Propri\u00e9taire)",
         "Vision 360\u00b0 du cabinet : KPIs, CA du jour, patients, agenda, finances. "
         "Acc\u00e8s \u00e0 tous les modules depuis smartphone en temps r\u00e9el."),
        ("App Patient (VIP Portal)",
         "Espace patient s\u00e9curis\u00e9 : prise de RDV, suivi de traitement, paiement "
         "en ligne, t\u00e9l\u00e9chargement de documents et messagerie s\u00e9curis\u00e9e."),
        ("App Staff (Clinique)",
         "Pour praticiens et assistants : agenda du jour, dossiers patients, "
         "odontogramme, charting et s\u00e9bilisation depuis le fauteuil."),
        ("App Comptable (Finance)",
         "Module financier mobile complet : facturation, recouvrement, grand livre "
         "et tableaux de bord OHADA en temps r\u00e9el."),
    ]
    for tit, desc in apps:
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(DARK)
        c.drawString(28, y, "\u25b6  "+tit)
        y -= 16
        y = body(c, desc, 40, y, sz=9, lh=13)
        y -= 8
    y -= 10
    y = sec(c, "Formation & D\u00e9ploiement en 48 Heures", y)
    form = [
        "Audit initial de votre cabinet et configuration personnalis\u00e9e",
        "Migration de vos donn\u00e9es patients (Excel, CSV, ancien logiciel)",
        "Formation pr\u00e9sentielle ou distancielle pour tout le personnel",
        "Go Live avec support d\u00e9di\u00e9 en temps r\u00e9el pendant 30 jours",
        "Mises \u00e0 jour mensuelles gratuites avec nouvelles fonctionnalit\u00e9s IA",
    ]
    for f in form:
        y = bul(c, f, y)
    y -= 14
    y = sec(c, "Support & Maintenance", y)
    support = [
        "Support email et WhatsApp d\u00e9di\u00e9 \u00e0 votre cabinet",
        "Base de connaissance en ligne (DentoAcademy)",
        "Vid\u00e9os tutoriels pour chaque module en fran\u00e7ais",
        "Maintenance pr\u00e9ventive automatique sans interruption de service",
        "SLA : Disponibilit\u00e9 99.5\u0025 garantie avec monitoring 24h/24",
    ]
    for s in support:
        y = bul(c, s, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 9 — ENGAGEMENT DE SERVICE & CONDITIONS
# ═══════════════════════════════════════════════════════════════════════════════
def p09(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    dark_hdr(c, "ENGAGEMENT DE SERVICE",
             "Conditions G\u00e9n\u00e9rales \u2022 Niveaux de Service \u2022 Garanties")
    footer(c, 9)
    y = H-130
    y = sec(c, "Niveaux de Service (SLA)", y)
    # SLA table
    slas = [
        ("Disponibilit\u00e9", "99.5\u0025", "Garantie mensuelle"),
        ("Temps de r\u00e9ponse support", "< 4h", "Heures ouvrables"),
        ("Sauvegarde donn\u00e9es", "Quotidienne", "R\u00e9tention 90 jours"),
        ("Mise \u00e0 jour s\u00e9curit\u00e9", "< 24h", "Correctifs critiques"),
        ("Formation initiale", "48h", "Apr\u00e8s souscription"),
    ]
    c.setFillColor(DARK)
    c.rect(24, y-28, W-48, 28, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawString(34, y-16, "INDICATEUR")
    c.drawString(240, y-16, "NIVEAU GARANTI")
    c.drawString(380, y-16, "CONDITION")
    for i, (ind, level, cond) in enumerate(slas):
        ry = y-28-(i+1)*26
        c.setFillColor(colors.HexColor("#1e293b") if i%2==0 else DARK)
        c.rect(24, ry, W-48, 26, stroke=0, fill=1)
        c.setFont("Helvetica", 9)
        c.setFillColor(WHITE)
        c.drawString(34, ry+9, ind)
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(240, ry+9, level)
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawString(380, ry+9, cond)
    y -= 28 + len(slas)*26 + 20
    y = sec(c, "Engagements ProcessIng\u00e9nierie", y)
    engagements = [
        "Confidentialit\u00e9 absolue des donn\u00e9es m\u00e9dicales de vos patients",
        "Conformit\u00e9 continue aux \u00e9volutions r\u00e9glementaires OHADA et UEMOA",
        "Aucune revente ni transmission des donn\u00e9es \u00e0 des tiers",
        "H\u00e9bergement exclusivement sur infrastructure certifi\u00e9e ISO 27001",
        "Droit \u00e0 la portabilit\u00e9 : export complet de vos donn\u00e9es \u00e0 tout moment",
    ]
    for e in engagements:
        y = bul(c, e, y)
    y -= 14
    y = sec(c, "Votre Engagement Cabinet", y)
    yours = [
        "D\u00e9signer un r\u00e9f\u00e9rent interne pour la gestion du syst\u00e8me",
        "Participer aux sessions de formation initiales planifi\u00e9es",
        "Signaler tout incident de s\u00e9curit\u00e9 dans les 24 heures",
        "Respecter les bonnes pratiques de s\u00e9curit\u00e9 communiqu\u00e9es",
    ]
    for y_item in yours:
        y = bul(c, y_item, y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 10 — CONCLUSION & SIGNATURE
# ═══════════════════════════════════════════════════════════════════════════════
def p10(c):
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#d4af3710"))
    c.circle(W-80, H-80, 150, stroke=0, fill=1)
    c.circle(80, 80, 120, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H-5, W, 5, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H-70, "Accord & Engagement Mutuel")
    c.setFont("Helvetica", 11)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    body(c, ("En choisissant DentoPrestige, vous rejoignez une communaut\u00e9 de praticiens "
             "d\u2019\u00e9lite qui ont fait le choix de l\u2019excellence num\u00e9rique. "
             "Nous nous engageons mutuellement \u00e0 \u0153uvrer pour la r\u00e9ussite "
             "de votre transformation digitale."),
         60, H-130, maxw=W-120, sz=11, col=colors.HexColor("#cbd5e1"), lh=18)
    # Signature blocks
    sy = H-290
    c.setFillColor(colors.HexColor("#1e293b"))
    c.roundRect(30, sy-130, (W-80)/2-10, 130, 8, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(30, sy-2, (W-80)/2-10, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(GOLD)
    c.drawCentredString(30+((W-80)/2-10)/2, sy-22, "LE PRESTATAIRE")
    c.setFont("Helvetica", 9)
    c.setFillColor(WHITE)
    c.drawCentredString(30+((W-80)/2-10)/2, sy-42, "ProcessIng\u00e9nierie")
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawCentredString(30+((W-80)/2-10)/2, sy-58, "Mamadou Dia - DG")
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(30+((W-80)/2-10)/2, sy-72, "Dakar, le _______________")
    # Signature line
    c.setFillColor(colors.HexColor("#d4af3760"))
    c.rect(50, sy-110, (W-80)/2-50, 1, stroke=0, fill=1)
    c.setFont("Helvetica", 8)
    c.setFillColor(GREY)
    c.drawCentredString(30+((W-80)/2-10)/2, sy-120, "Signature & Cachet")

    x2 = 30 + (W-80)/2 + 20
    c.setFillColor(colors.HexColor("#1e293b"))
    c.roundRect(x2, sy-130, (W-80)/2-10, 130, 8, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(x2, sy-2, (W-80)/2-10, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(GOLD)
    c.drawCentredString(x2+((W-80)/2-10)/2, sy-22, "LE CLIENT")
    c.setFont("Helvetica", 9)
    c.setFillColor(WHITE)
    c.drawCentredString(x2+((W-80)/2-10)/2, sy-42, "[NOM DU CABINET]")
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawCentredString(x2+((W-80)/2-10)/2, sy-58, "[Dr. NOM PR\u00c9NOM]")
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(x2+((W-80)/2-10)/2, sy-72, "Dakar, le _______________")
    c.setFillColor(colors.HexColor("#d4af3760"))
    c.rect(x2+20, sy-110, (W-80)/2-50, 1, stroke=0, fill=1)
    c.setFont("Helvetica", 8)
    c.setFillColor(GREY)
    c.drawCentredString(x2+((W-80)/2-10)/2, sy-120, "Signature & Cachet")

    # Contact
    c.setFillColor(GOLD)
    c.rect(30, sy-160, W-60, 1, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, sy-180, "Pour toute question pr\u00e9alable \u00e0 la signature :")
    c.setFont("Helvetica", 10)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, sy-200, "Mamadou Dia  \u2022  +221 777 529 288  \u2022  mamadou.dia@processingenierie.com")
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#60a5fa"))
    c.drawCentredString(W/2, sy-218, "https://dentoprestige.vercel.app/")
    footer(c, 10)

def main():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("DentoPrestige - Document de Presentation et Engagement")
    c.setAuthor("ProcessIngenierie")
    for fn in [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10]:
        fn(c)
        c.showPage()
    c.save()
    print(f"Created: {OUTPUT}")

if __name__ == "__main__":
    main()
