#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DentoPrestige_Presentation_Complete.pdf - 19 pages
Modeled after avocatpresentation.pdf (LexPremium)
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "DentoPrestige_Presentation_Complete.pdf")
W, H = A4

DARK  = colors.HexColor("#0f172a")
GOLD  = colors.HexColor("#d4af37")
WHITE = colors.white
LIGHT = colors.HexColor("#f8fafc")
SLATE = colors.HexColor("#334155")
NAVY  = colors.HexColor("#1e3a5f")
GREY  = colors.HexColor("#64748b")

# ── Helpers ──────────────────────────────────────────────────────────────────

def footer(c, pg):
    c.setFillColor(DARK)
    c.rect(0, 0, W, 28, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, 28, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(WHITE)
    c.drawString(18, 10, "DentoPrestige Africa  \u2022  Soignez mieux, g\u00e9rez moins")
    c.drawRightString(W-18, 10, "mamadou.dia@processingenierie.com  |  +221 777 529 288")
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 10, f"\u25c6  {pg}  \u25c6")

def dark_header(c, title, subtitle=None):
    c.setFillColor(DARK)
    c.rect(0, H-100, W, 100, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H-5, W, 5, stroke=0, fill=1)
    c.rect(0, H-100, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H-58, title)
    if subtitle:
        c.setFont("Helvetica", 11)
        c.setFillColor(WHITE)
        c.drawCentredString(W/2, H-78, subtitle)

def module_header(c, number, name, y_top):
    c.setFillColor(NAVY)
    c.rect(0, y_top-40, W, 40, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, y_top-40, 5, 40, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(GOLD)
    c.drawString(16, y_top-14, f"MODULE {number}")
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(WHITE)
    c.drawString(16, y_top-30, name)
    return y_top - 54

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

def kpi_card(c, x, y, w, h, title, value, sub=""):
    c.setFillColor(DARK)
    c.roundRect(x, y, w, h, 6, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(x, y+h-3, w, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(GOLD)
    c.drawCentredString(x+w/2, y+h-30, value)
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(WHITE)
    c.drawCentredString(x+w/2, y+h-44, title)
    if sub:
        c.setFont("Helvetica", 7.5)
        c.setFillColor(GREY)
        c.drawCentredString(x+w/2, y+10, sub)

def sec_title(c, t, y, x=24):
    c.setFillColor(GOLD)
    c.rect(x, y-4, 4, 18, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(DARK)
    c.drawString(x+10, y, t)
    return y-28

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 1 — COVER
# ═══════════════════════════════════════════════════════════════════════════════
def p01(c):
    c.setFillColor(DARK)
    c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(colors.HexColor("#d4af3710"))
    c.circle(W-80,H-80,150,stroke=0,fill=1)
    c.circle(80,80,120,stroke=0,fill=1)
    c.circle(W/2,H/2,220,stroke=0,fill=1)
    c.setFillColor(GOLD)
    c.rect(0,H-5,W,5,stroke=0,fill=1)
    # Logo
    c.setFont("Helvetica-Bold",40)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2,H-100,"\u25c6")
    c.setFont("Helvetica-Bold",44)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2,H-160,"DENTOPRESTIGE")
    c.setFillColor(GOLD)
    c.rect(W/2-130,H-174,260,3,stroke=0,fill=1)
    c.setFont("Helvetica-Bold",16)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2,H-200,"Pr\u00e9sentation Compl\u00e8te de la Plateforme")
    c.setFont("Helvetica",12)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(W/2,H-228,"\u00c9cosyst\u00e8me d\u2019IA & Haute Gestion pour Cabinets Dentaires d\u2019Exception")
    # Stats
    kpis=[("44+","Modules int\u00e9gr\u00e9s","v4.0 — Couverture totale"),
          ("95%","Besoins couverts","vs ERP g\u00e9n\u00e9riques"),
          ("40%","Temps lib\u00e9r\u00e9","administratif"),
          ("48h","D\u00e9ploiement","formation incluse")]
    kw=(W-80-3*16)/4
    for i,(val,tit,sub) in enumerate(kpis):
        kpi_card(c,40+i*(kw+16),H-380,kw,85,tit,val,sub)
    c.setFillColor(GOLD)
    c.rect(40,H-400,W-80,1,stroke=0,fill=1)
    c.setFont("Helvetica",10)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    lines=[
        "DentoPrestige ERP est la solution SaaS de r\u00e9f\u00e9rence pour les cabinets",
        "dentaires d\u2019\u00e9lite de l\u2019espace OHADA. Construit sur Next.js, Prisma et MongoDB,",
        "il int\u00e8gre l\u2019IA DeepSeek, la conformit\u00e9 SYSCOHADA native, et les paiements",
        "Wave & Orange Money pour une exp\u00e9rience praticien exceptionnelle.",
    ]
    ly=H-424
    for l in lines:
        c.drawCentredString(W/2,ly,l)
        ly-=16
    c.setFillColor(GOLD)
    c.rect(0,40,W,2,stroke=0,fill=1)
    c.setFont("Helvetica-Bold",9)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2,22,"DentoPrestige Africa  \u2022  Le Standard de l\u2019Excellence pour le Praticien de Demain")
    footer(c,1)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 2 — Vue d'ensemble des modules
# ═══════════════════════════════════════════════════════════════════════════════
def p02(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"VUE D\u2019ENSEMBLE","44+ Modules v4.0 — Couverture Totale Cabinet Dentaire d\u2019Exception")
    footer(c,2)
    y=H-120
    cats=[
        ("Clinique & Soins","Odontogramme \u2022 Charting paro \u2022 Plans de traitement \u2022 Prescriptions \u2022 Imagerie \u2022 Chirurgie \u2022 Smile Design \u2022 Laboratoire"),
        ("Administration","Agenda \u2022 Salle d\u2019attente \u2022 Patients \u2022 T\u00e2ches \u2022 Workflow \u2022 Gestion du personnel \u2022 Messagerie Interne \u2022 Notifications"),
        ("Financier","Facturation \u2022 FSE T\u00e9l\u00e9transmission \u2022 Comptabilit\u00e9 OHADA \u2022 Devis \u2022 Paiements \u2022 Free Money \u2022 Financial War Room \u2022 Marketing"),
        ("IA & Technologie v4.0","DentoAI \u2022 Scanner radio IA \u2022 Neural Vision Lab \u2022 Dict\u00e9e vocale \u2022 AI Command Center \u2022 Holo-Smile Studio \u2022 GED Elite"),
        ("Qualit\u00e9 & Innovation","St\u00e9rilisation \u2022 Blockchain Ledger \u2022 Conformit\u00e9 \u2022 Audit Trail \u2022 Consentements \u2022 RGPD/OHADA \u2022 Executive Satellite"),
        ("Patient & Mobile","Portail VIP \u2022 Programme Fid\u00e9lit\u00e9 \u2022 Concierge Bio-Logistique \u2022 T\u00e9l\u00e9consultation \u2022 App Mobile \u2022 Analytics 360\u00b0"),
    ]
    ch=90
    cw=(W-60-16)/2
    for i,(cat,mods) in enumerate(cats):
        row=i//2; col=i%2
        xi=30+col*(cw+16)
        yi=y-row*(ch+12)
        c.setFillColor(DARK)
        c.roundRect(xi,yi-ch,cw,ch,8,stroke=0,fill=1)
        c.setFillColor(GOLD)
        c.rect(xi,yi-3,cw,3,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",10)
        c.setFillColor(GOLD)
        c.drawString(xi+10,yi-20,cat)
        body(c,mods,xi+10,yi-36,maxw=cw-20,sz=8,col=colors.HexColor("#cbd5e1"),lh=13)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 3 — MODULE 1: TABLEAU DE BORD
# ═══════════════════════════════════════════════════════════════════════════════
def p03(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"1","TABLEAU DE BORD",H-10)
    footer(c,3)
    y-=10
    body(c,("Le centre de pilotage de votre cabinet. Vision synth\u00e9tique et imm\u00e9diate de "
            "l\u2019activit\u00e9, des urgences et de la performance globale."),24,y,lh=16)
    y-=50
    y=sec_title(c,"Cartes de Synth\u00e8se (KPI)",y)
    kpis_mod=[
        ("CA du Jour","Montant total HT factur\u00e9 sur la journ\u00e9e en cours"),
        ("Patients Actifs","Nombre exact de patients actuellement en traitement"),
        ("Prochains RDV","Nombre d\u2019actes inscrits \u00e0 l\u2019agenda du jour"),
        ("Taux de Recouvrement","Pourcentage des factures encaiss\u00e9es sur le total"),
    ]
    kw2=(W-60-3*14)/4
    for i,(tit,desc) in enumerate(kpis_mod):
        xi=30+i*(kw2+14)
        c.setFillColor(DARK)
        c.roundRect(xi,y-75,kw2,75,6,stroke=0,fill=1)
        c.setFillColor(GOLD)
        c.rect(xi,y-3,kw2,3,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",9)
        c.setFillColor(GOLD)
        c.drawCentredString(xi+kw2/2,y-20,tit)
        body(c,desc,xi+6,y-34,maxw=kw2-12,sz=7.5,col=colors.HexColor("#cbd5e1"),lh=12)
    y-=90
    y=sec_title(c,"Graphiques Visuels",y)
    graphs=[
        "\u00c9volution du CA : Courbe temporelle comparant vos revenus mensuels",
        "R\u00e9partition par Acte : Camembert des types de soins les plus courants",
        "Taux d\u2019occupation : Visualisation de l\u2019utilisation des fauteuils",
        "Alertes Critiques : Stocks faibles, rendez-vous en retard, impay\u00e9s",
    ]
    for g in graphs:
        y=bul(c,g,y)
    y-=16
    y=sec_title(c,"Intelligence Artificielle Proactive",y)
    ia_dash=[
        "Identification automatique des patients \u00e0 risque de d\u00e9perdition",
        "D\u00e9tection des cr\u00e9neaux horaires sous-utilis\u00e9s pour optimisation",
        "Suggestions de relances pour les plans de traitement en attente",
        "Pr\u00e9vision du CA sur les 30 prochains jours bas\u00e9e sur l\u2019agenda",
    ]
    for ia in ia_dash:
        y=bul(c,ia,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 4 — MODULE 2: GESTION DES PATIENTS
# ═══════════════════════════════════════════════════════════════════════════════
def p04(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"2","GESTION DES PATIENTS",H-10)
    footer(c,4)
    y-=10
    body(c,("Base de donn\u00e9es patient compl\u00e8te avec recherche avanc\u00e9e, historique clinique "
            "int\u00e9gral, gestion des liens familiaux et contr\u00f4le d\u2019acc\u00e8s granulaire."),24,y,lh=15)
    y-=48
    cols=[
        ("Dossier Patient","Nom, pr\u00e9nom, date de naissance, genre, adresse, t\u00e9l\u00e9phone, email, source, statut (ACTIF/INACTIF), workflow clinique"),
        ("Historique M\u00e9dical","Allergies m\u00e9dicamenteuses, traitements en cours, antc\u00e9dents chirurgicaux, contre-indications anesthiques"),
        ("Liens Familiaux","Gestion des relations familiales, partage de dossiers avec consentement, facturation group\u00e9e"),
        ("Portail Patient","Espace s\u00e9curis\u00e9 24h/24, consultation des RDV, paiements en ligne, acc\u00e8s aux documents"),
    ]
    cw=(W-60-16)/2
    ch=100
    for i,(tit,desc) in enumerate(cols):
        row=i//2; col=i%2
        xi=30+col*(cw+16)
        yi=y-row*(ch+12)
        c.setFillColor(NAVY)
        c.roundRect(xi,yi-ch,cw,ch,6,stroke=0,fill=1)
        c.setFillColor(GOLD)
        c.rect(xi,yi-ch,5,ch,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",10)
        c.setFillColor(GOLD)
        c.drawString(xi+14,yi-18,tit)
        body(c,desc,xi+14,yi-34,maxw=cw-22,sz=8.5,col=colors.HexColor("#cbd5e1"),lh=13)
    y-=2*(ch+12)+16
    y=sec_title(c,"Statuts et Workflow Patient",y)
    statuts=[
        "ACTIF : Patient en traitement ou avec RDV \u00e0 venir",
        "INACTIF : Patient sans activit\u00e9 depuis plus de 12 mois",
        "VIP : Acc\u00e8s au portail premium avec notifications prioritaires",
        "RESTREINT : Acc\u00e8s aux dossiers limit\u00e9 par consentement",
    ]
    for s in statuts:
        y=bul(c,s,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 5 — MODULE 3: ODONTOGRAMME + CHARTING
# ═══════════════════════════════════════════════════════════════════════════════
def p05(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"3","ODONTOGRAMME & CHARTING CLINIQUE",H-10)
    footer(c,5)
    y-=10
    body(c,("Sch\u00e9ma dentaire interactif avec gestion compl\u00e8te des \u00e9tats dentaires, "
            "charting p\u00e9riodontal et suivi des traitements par dent."),24,y,lh=15)
    y-=46
    y=sec_title(c,"Odontogramme Interactif",y)
    tooths=[
        "Vue adulte (32 dents) et p\u00e9diatrique (20 dents) commutables",
        "Num\u00e9rotation universelle avec vue graphique par quadrant",
        "Clic sur chaque dent pour consulter ou modifier l\u2019\u00e9tat",
        "Historique complet des actes par dent avec dates et praticiens",
    ]
    for t in tooths:
        y=bul(c,t,y)
    y-=14
    y=sec_title(c,"\u00c9tats Dentaires Disponibles",y)
    # State table
    states=[
        ("SAIN","Dent en bonne sant\u00e9","Vert"),
        ("CARIE","L\u00e9sion cariesogene d\u00e9tect\u00e9e","Orange"),
        ("COURONNE","Proth\u00e8se coronaire pos\u00e9e","Bleu"),
        ("ABSENT","Dent extraite ou ag\u00e9n\u00e9sie","Gris"),
        ("PLANIFI\u00c9","Soin programm\u00e9 dans le plan","Violet"),
        ("EXTRAIT","Extraction r\u00e9alis\u00e9e","Rouge"),
        ("IMPLANT","Implant dent\u00e0ire en place","Or"),
    ]
    sw=W-60
    row_h=22
    c.setFillColor(DARK)
    c.rect(30,y-row_h*len(states)-4,sw,row_h*len(states)+row_h,stroke=0,fill=1)
    c.setFillColor(GOLD)
    c.rect(30,y,sw,row_h,stroke=0,fill=1)
    c.setFont("Helvetica-Bold",9)
    c.setFillColor(DARK)
    c.drawString(40,y+7,"ETAT")
    c.drawString(140,y+7,"DESCRIPTION")
    c.drawString(440,y+7,"COULEUR")
    for i,(state,desc,col) in enumerate(states):
        row_y=y-row_h*(i+1)
        if i%2==0:
            c.setFillColor(colors.HexColor("#1e293b"))
            c.rect(30,row_y,sw,row_h,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",8.5)
        c.setFillColor(GOLD)
        c.drawString(40,row_y+7,state)
        c.setFont("Helvetica",8.5)
        c.setFillColor(WHITE)
        c.drawString(140,row_y+7,desc)
        c.setFont("Helvetica",8.5)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawString(440,row_y+7,col)
    y-=row_h*(len(states)+1)+20
    y=sec_title(c,"Charting P\u00e9riodontal",y)
    paro=[
        "Profondeur de poche par sextant (6 mesures par dent)",
        "Indice de r\u00e9cession gingivale et mobilit\u00e9 dentaire",
        "Saignement au sondage (BOP - Bleeding On Probing)",
        "Comparaison inter-s\u00e9ances avec graphiques d\u2019\u00e9volution",
    ]
    for p in paro:
        y=bul(c,p,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 6 — MODULE 4: AGENDA & PLANNING
# ═══════════════════════════════════════════════════════════════════════════════
def p06(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"4","AGENDA INTELLIGENT & PLANNING",H-10)
    footer(c,6)
    y-=10
    body(c,("Gestion compl\u00e8te des rendez-vous avec synchronisation en temps r\u00e9el, "
            "calcul automatique des disponibilit\u00e9s et communication patient int\u00e9gr\u00e9e."),24,y,lh=15)
    y-=46
    y=sec_title(c,"Fonctionnalit\u00e9s Agenda",y)
    agenda=[
        "Vue Jour / Semaine / Mois par praticien et par salle de soins",
        "Glisser-d\u00e9poser des rendez-vous pour replanification rapide",
        "Codes couleur par type d\u2019acte (consultation, d\u00e9tartrage, chirurgie...)",
        "Blocage de cr\u00e9neaux pour formation, r\u00e9union ou cong\u00e9s",
        "Indication du statut en temps r\u00e9el (confirm\u00e9, arriv\u00e9, en attente)",
    ]
    for a in agenda:
        y=bul(c,a,y)
    y-=14
    y=sec_title(c,"Communication Automatis\u00e9e",y)
    comms=[
        "WhatsApp automatique d\u00e8s la cr\u00e9ation du RDV avec heure et adresse",
        "SMS de rappel J-1 et H-2 avant le rendez-vous",
        "Email de confirmation avec lien de modification en ligne",
        "Notification push sur le portail patient s\u00e9curis\u00e9",
    ]
    for c_item in comms:
        y=bul(c,c_item,y)
    y-=14
    y=sec_title(c,"T\u00e9l\u00e9consultation Int\u00e9gr\u00e9e",y)
    tele=[
        "Cr\u00e9ation de lien Jitsi automatique pour RDV \u00e0 distance",
        "Partage s\u00e9curis\u00e9 du lien avec le patient via SMS/Email",
        "Enregistrement du compte-rendu de t\u00e9l\u00e9consultation dans le dossier",
    ]
    for t_item in tele:
        y=bul(c,t_item,y)
    y-=14
    y=sec_title(c,"Salle d\u2019Attente Virtuelle",y)
    salle=[
        "Suivi en temps r\u00e9el de l\u2019arriv\u00e9e des patients",
        "Gestion de la file d\u2019attente avec temps moyen d\u2019attente",
        "Notification automatique au praticien d\u00e8s l\u2019arriv\u00e9e du patient",
        "Statuts : CONFIRM\u00c9, ATTENDU, ARRIV\u00c9, EN ATTENTE, TERMIN\u00c9",
    ]
    for s_item in salle:
        y=bul(c,s_item,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 7 — MODULE 5: PLANS DE TRAITEMENT + DEVIS
# ═══════════════════════════════════════════════════════════════════════════════
def p07(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"5","PLANS DE TRAITEMENT & DEVIS",H-10)
    footer(c,7)
    y-=10
    body(c,("Planification th\u00e9rapeutique multi-\u00e9tapes avec devis automatis\u00e9s, "
            "suivi de progression et int\u00e9gration financi\u00e8re compl\u00e8te."),24,y,lh=15)
    y-=46
    y=sec_title(c,"Plan de Traitement",y)
    plans=[
        "Cr\u00e9ation de plans multi-\u00e9tapes ordon\u00e9es chronologiquement",
        "Statuts : BROUILLON \u2192 ACCEPT\u00c9 \u2192 EN COURS \u2192 TERMIN\u00c9",
        "Cout total estim\u00e9 et co\u00fbt r\u00e9el par \u00e9tape de traitement",
        "Progression tracking avec pourcentage d\u2019avancement",
        "Signature num\u00e9rique du patient sur le plan accept\u00e9",
    ]
    for p in plans:
        y=bul(c,p,y)
    y-=14
    y=sec_title(c,"Simulations & Smile Design",y)
    simuls=[
        "SMILE DESIGN : Simulation de sourire digital avant chirurgie",
        "GUIDE IMPLANTAIRE : Plan 3D de placement des implants",
        "ORTHO SIMUL : Simulation de r\u00e9sultat orthodontique",
        "Partage s\u00e9curis\u00e9 des simulations avec le patient via portail",
    ]
    for s in simuls:
        y=bul(c,s,y)
    y-=14
    y=sec_title(c,"Devis Automatis\u00e9s",y)
    devis=[
        "G\u00e9n\u00e9ration de devis depuis le plan de traitement en 1 clic",
        "Calcul automatique des co\u00fbts avec tarification personnalisable",
        "Envoi par email/WhatsApp avec lien d\u2019acceptation en ligne",
        "Statuts : BROUILLON \u2192 ENVOY\u00c9 \u2192 ACCEPT\u00c9 / REFUS\u00c9",
        "Plan de paiement \u00e9chelonn\u00e9 avec d\u00e9bit automatique",
    ]
    for d in devis:
        y=bul(c,d,y)
    y-=14
    y=sec_title(c,"Laboratoire Dentaire",y)
    labo=[
        "Bons de travaux lab avec mat\u00e9riaux, teinte et num\u00e9ro FDA",
        "Statuts : ENVOY\u00c9 \u2192 EN COURS \u2192 RE\u00c7U \u2192 RETOUR\u00c9",
        "Suivi des d\u00e9lais et alertes retards de livraison",
        "Fichiers STL : Upload et t\u00e9l\u00e9chargement s\u00e9curis\u00e9",
    ]
    for l in labo:
        y=bul(c,l,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 8 — MODULE 6: FACTURATION & FSE
# ═══════════════════════════════════════════════════════════════════════════════
def p08(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"6","FACTURATION & FSE \u00c9LECTRONIQUE",H-10)
    footer(c,8)
    y-=10
    body(c,("Cockpit de facturation complet avec g\u00e9n\u00e9ration FSE automatis\u00e9e, "
            "tiers-payants int\u00e9gr\u00e9s et tableau de bord financier en temps r\u00e9el."),24,y,lh=15)
    y-=46
    y=sec_title(c,"Facturation Intelligente",y)
    fact=[
        "Cr\u00e9ation de factures depuis le plan de traitement en 1 clic",
        "Num\u00e9rotation s\u00e9quentielle conforme OHADA",
        "Gestion de la TVA et des taxes locales",
        "Statuts : IMPAY\u00c9 \u2192 PARTIEL \u2192 PAY\u00c9 avec historique",
        "Design prestige avec en-t\u00eate personnalis\u00e9 du cabinet",
    ]
    for f in fact:
        y=bul(c,f,y)
    y-=14
    y=sec_title(c,"FSE & T\u00e9l\u00e9transmission",y)
    fse=[
        "G\u00e9n\u00e9ration automatis\u00e9e des Feuilles de Soins \u00c9lectroniques",
        "Num\u00e9ro de t\u00e9l\u00e9transmission unique par FSE",
        "Gestion des tiers-payants (mutuelles, assurances)",
        "Suivi du remboursement et relances automatis\u00e9es",
    ]
    for f in fse:
        y=bul(c,f,y)
    y-=14
    y=sec_title(c,"Paiements Mobiles Int\u00e9gr\u00e9s (CinetPay)",y)
    pay=[
        "Wave : Paiement mobile le plus utilis\u00e9 au S\u00e9n\u00e9gal",
        "Orange Money : Couverture nationale et sous-r\u00e9gionale",
        "Carte bancaire : Visa, Mastercard via gateway s\u00e9curis\u00e9e",
        "Esp\u00e8ces et ch\u00e8que : Saisie manuelle avec re\u00e7u automatis\u00e9",
        "Lien de paiement par SMS/WhatsApp pour les patients",
    ]
    for p in pay:
        y=bul(c,p,y)
    y-=14
    y=sec_title(c,"Recouvrement Automatis\u00e9",y)
    recov=[
        "D\u00e9tection automatique des impay\u00e9s avec scoring de risque",
        "Relances progressives : J+7, J+14, J+30 par SMS/Email",
        "Tableau de bord des cr\u00e9ances avec montants et anciennet\u00e9",
    ]
    for r in recov:
        y=bul(c,r,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 9 — MODULE 7: COMPTABILITÉ OHADA
# ═══════════════════════════════════════════════════════════════════════════════
def p09(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"7","COMPTABILIT\u00c9 OHADA & FINANCIAL WAR ROOM",H-10)
    footer(c,9)
    y-=10
    body(c,("Module comptable complet conforme SYSCOHADA avec journaux r\u00e9glementaires, "
            "grand livre automatis\u00e9 et pilotage strat\u00e9gique en temps r\u00e9el."),24,y,lh=15)
    y-=46
    y=sec_title(c,"Comptabilit\u00e9 SYSCOHADA Native",y)
    compta=[
        "Plan comptable OHADA pr\u00e9-configur\u00e9 (521 Banque, 571 Caisse, 131 R\u00e9sultat)",
        "Journaux r\u00e9glementaires : Ventes, Banque, Caisse, OD",
        "\u00c9critures automatiques pour chaque facture et paiement",
        "Cl\u00f4ture mensuelle et annuelle automatis\u00e9e",
        "T\u00e9l\u00e9d\u00e9claration fiscale pr\u00e9par\u00e9e automatiquement",
    ]
    for c_item in compta:
        y=bul(c,c_item,y)
    y-=14
    y=sec_title(c,"Pilotage Strat\u00e9gique en Temps R\u00e9el",y)
    pilotage=[
        "Bilan et Compte de R\u00e9sultat en temps r\u00e9el sans attendre",
        "Grand Livre et Balance de v\u00e9rification en 2 clics",
        "Analyse de rentabilit\u00e9 par praticien et par type d\u2019acte",
        "Suivi de tr\u00e9sorerie avec anticipation des besoins",
    ]
    for p in pilotage:
        y=bul(c,p,y)
    y-=14
    y=sec_title(c,"Financial War Room",y)
    war=[
        "Tableau de bord avanc\u00e9 avec indicateurs financiers cl\u00e9s",
        "Comparaison mensuelle et annuelle des performances",
        "Analyse des actes les plus et moins rentables",
        "Projections de CA sur 3, 6 et 12 mois",
        "Alertes automatiques si seuils critiques d\u00e9pass\u00e9s",
    ]
    for w in war:
        y=bul(c,w,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 10 — MODULE 8: DENTAI & SCANNER RADIO
# ═══════════════════════════════════════════════════════════════════════════════
def p10(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    y=module_header(c,"8","DENTOAI & SCANNER RADIOLOGIQUE",H-10)
    footer(c,10)
    y-=10
    body(c,("Intelligence artificielle clinique avanc\u00e9e : chat contextuel, analyse "
            "d\u2019imagerie IA et assistance au diagnostic en temps r\u00e9el."),24,y,lh=15)
    y-=46
    y=sec_title(c,"DentoAI : Votre Assistant Clinique",y)
    dentai=[
        "Chat contextuel sur les dossiers patients sp\u00e9cifiques",
        "Recherche s\u00e9mantique dans les protocoles et l\u2019historique",
        "Synth\u00e8se IA de l\u2019historique clinique en quelques secondes",
        "Suggestions de plans de traitement selon l\u2019historique",
        "Alertes sur les interactions m\u00e9dicamenteuses",
    ]
    for d in dentai:
        y=bul(c,d,y)
    y-=14
    y=sec_title(c,"AI Radio Lab : Analyse Radiographique IA",y)
    radio=[
        "Analyse de panoramiques en moins de 60 secondes",
        "D\u00e9tection automatis\u00e9e des caries, p\u00e9ricoronarites, granulomes",
        "Support CBCT, radiographie endobuccale et p\u00e9riapicale",
        "Annotation automatique des zones pathologiques",
        "Rapport d\u2019analyse structur\u00e9 pour le dossier patient",
    ]
    for r in radio:
        y=bul(c,r,y)
    y-=14
    y=sec_title(c,"AI Hub & AI Lab",y)
    aihub=[
        "Centre de commandement IA avec historique des analyses",
        "Exp\u00e9rimentation de nouveaux protocoles bas\u00e9s sur les donn\u00e9es",
        "Statistiques d\u2019utilisation et performance diagnostique",
        "Int\u00e9gration DeepSeek v3 pour analyse clinique avanc\u00e9e",
    ]
    for a in aihub:
        y=bul(c,a,y)
    y-=14
    y=sec_title(c,"Dict\u00e9e Vocale IA",y)
    dict_items=[
        "Transcription haute fid\u00e9lit\u00e9 du jargon dentaire",
        "Structuration automatique en notes cliniques SOAP",
        "Mobilit\u00e9 totale : enregistrement depuis le fauteuil dentaire",
        "Int\u00e9gration directe dans le dossier patient",
    ]
    for di in dict_items:
        y=bul(c,di,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 11 — MODULES 9-10: GED + IMAGERIE
# ═══════════════════════════════════════════════════════════════════════════════
def p11(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"GED \u00c9LITE & IMAGERIE M\u00c9DICALE","Modules 9 & 10 : Gestion Documentaire & Radiologie")
    footer(c,11)
    y=H-120
    y=sec_title(c,"MODULE 9 : GED \u00c9lite (Gestion \u00c9lectronique de Documents)",y)
    ged=[
        "OCR Haute R\u00e9solution : Conversion des scans en textes \u00e9ditables",
        "Versioning Professionnel : Historique complet des modifications",
        "Signature Num\u00e9rique : Consentements sign\u00e9s l\u00e9galement en ligne",
        "Recherche Plein Texte : Fouille dans tout le fonds documentaire",
        "Classification IA : Tri automatique par type et sensibilit\u00e9",
        "Chiffrement AES-256 avec IV unique par document",
        "Coffre-Fort : Documents inaccessibles sauf au praticien habilit\u00e9",
    ]
    for g in ged:
        y=bul(c,g,y)
    y-=16
    y=sec_title(c,"MODULE 10 : Imagerie M\u00e9dicale",y)
    imaging=[
        "Types support\u00e9s : XRAY, PHOTO, PANORAMIQUE, DICOM, CBCT, STL",
        "Galerie par patient avec comparaison avant/apr\u00e8s traitement",
        "Annotation manuelle sur les images avec outils de dessin",
        "Partage s\u00e9curis\u00e9 avec le laboratoire dentaire via lien chiffr\u00e9",
        "Analyse IA automatique des radiographies upload\u00e9es",
        "Stockage cloud s\u00e9curis\u00e9 avec sauvegarde automatique",
    ]
    for im in imaging:
        y=bul(c,im,y)
    y-=16
    y=sec_title(c,"Prescriptions M\u00e9dicales Digitales",y)
    prescri=[
        "G\u00e9n\u00e9ration d\u2019ordonnances avec signature num\u00e9rique du praticien",
        "Base de m\u00e9dicaments avec dosages et contre-indications",
        "Envoi direct par SMS/Email/WhatsApp au patient",
        "Historique complet des prescriptions par patient",
    ]
    for p in prescri:
        y=bul(c,p,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 12 — MODULES 11-13: STÉRILISATION + INVENTAIRE + CONFORMITÉ
# ═══════════════════════════════════════════════════════════════════════════════
def p12(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"QUALIT\u00c9 & CONFORMIT\u00c9","Modules 11-13 : St\u00e9rilisation, Inventaire & Conformit\u00e9")
    footer(c,12)
    y=H-120
    y=sec_title(c,"MODULE 11 : St\u00e9rilisation & Tra\u00e7abilit\u00e9",y)
    steril=[
        "Enregistrement des cycles de st\u00e9rilisation (autoclave, poupinel)",
        "Identification de la machine, op\u00e9rateur et num\u00e9ro de cycle",
        "Liste des instruments trait\u00e9s par cycle avec lot et expiry",
        "Statuts : R\u00c9USSI, \u00c9CHEC, EN ATTENTE avec alertes imm\u00e9diates",
        "Historique des cycles avec rapport PDF t\u00e9l\u00e9chargeable",
    ]
    for s in steril:
        y=bul(c,s,y)
    y-=14
    y=sec_title(c,"MODULE 12 : Inventaire & Stock",y)
    inv=[
        "Base de donn\u00e9es des consommables et mat\u00e9riaux dentaires",
        "Alerte de stock minimum avec notification push",
        "Num\u00e9ro de lot et date d\u2019expiration par article",
        "D\u00e9signation STERILE / NON-STERILE pour tra\u00e7abilit\u00e9",
        "Historique des r\u00e9approvisionnements avec fournisseurs",
        "Rapport mensuel de consommation par cat\u00e9gorie",
    ]
    for i in inv:
        y=bul(c,i,y)
    y-=14
    y=sec_title(c,"MODULE 13 : Conformit\u00e9 & Audit",y)
    comp=[
        "Tableau de bord conformit\u00e9 OHADA et normes sanitaires UEMOA",
        "Audit Trail immuable : toutes les actions trac\u00e9es avec IP et horodatage",
        "Gestion des consentements \u00e9clair\u00e9s avec IP, checksum et date",
        "Journal d\u2019audit avec filtres par s\u00e9v\u00e9rit\u00e9 et utilisateur",
        "Export des rapports de conformit\u00e9 pour les inspections",
    ]
    for c_item in comp:
        y=bul(c,c_item,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 13 — MODULES 14-16: COMMUNICATION + TÂCHES + WORKFLOW
# ═══════════════════════════════════════════════════════════════════════════════
def p13(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"COMMUNICATION & GESTION OPÉRATIONNELLE","Modules 14-16 : Communication, T\u00e2ches & Workflow")
    footer(c,13)
    y=H-120
    y=sec_title(c,"MODULE 14 : Communication Unifi\u00e9e",y)
    comm=[
        "Canaux : SMS, WhatsApp, Email, Portal Notice - tout en un",
        "Cat\u00e9gories : RAPPEL, POST-OP, RECALL, \u00c9DUCATION, FACTURATION",
        "Campagnes automatis\u00e9es avec r\u00e8gles de d\u00e9clenchement",
        "Historique de livraison : ENVOY\u00c9, LIVR\u00c9, OUVERT, \u00c9CHEC",
        "Envoi en masse avec personnalisation dynamique par patient",
        "Int\u00e9gration Resend pour emails transactionnels de prestige",
    ]
    for c_item in comm:
        y=bul(c,c_item,y)
    y-=14
    y=sec_title(c,"MODULE 15 : Centre des T\u00e2ches",y)
    tasks=[
        "Priorit\u00e9s : BAS, MOYEN, HAUT, URGENT avec code couleur",
        "Cat\u00e9gories : CLINIQUE, ADMIN, LABO, SUIVI",
        "Statuts : \u00c0 FAIRE \u2192 EN COURS \u2192 TERMIN\u00c9",
        "Assignation \u00e0 un membre de l\u2019\u00e9quipe avec date limite",
        "Lien avec le dossier patient pour contexte clinique",
    ]
    for t in tasks:
        y=bul(c,t,y)
    y-=14
    y=sec_title(c,"MODULE 16 : Workflow & Automatisation",y)
    workflow=[
        "Automatisation des rappels RDV, post-op et r\u00e9\u00e9valuations",
        "Processus de validation des plans de traitement",
        "D\u00e9clencheurs : cr\u00e9ation RDV, acte termin\u00e9, facture impay\u00e9e",
        "Tableau de bord des workflows actifs et termin\u00e9s",
    ]
    for w in workflow:
        y=bul(c,w,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 14 — MODULES 17-19: MARKETING + PORTAL VIP + LOYALTY
# ═══════════════════════════════════════════════════════════════════════════════
def p14(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"PATIENT EXPERIENCE & MARKETING","Modules 17-19 : Marketing, Portail VIP & Fid\u00e9lit\u00e9")
    footer(c,14)
    y=H-120
    y=sec_title(c,"MODULE 17 : Marketing & Acquisition",y)
    mkt=[
        "Campagnes email/SMS pour acquisition de nouveaux patients",
        "Segmentation par type de soin, anciennet\u00e9 et valeur patient",
        "Suivi des sources (r\u00e9seaux sociaux, bouche-\u00e0-oreille, site web)",
        "Tableau de bord ROI des campagnes marketing",
        "Programmes de parrainage avec codes de r\u00e9f\u00e9rence",
    ]
    for m in mkt:
        y=bul(c,m,y)
    y-=14
    y=sec_title(c,"MODULE 18 : Portail Patient VIP",y)
    portal=[
        "Espace s\u00e9curis\u00e9 24h/24 avec authentification propre au patient",
        "Consultation des RDV pass\u00e9s et \u00e0 venir en temps r\u00e9el",
        "Acc\u00e8s aux plans de traitement accept\u00e9s et devis en attente",
        "Paiement en ligne directement depuis le portail",
        "T\u00e9l\u00e9chargement des ordonnances et documents m\u00e9dicaux",
        "Messagerie s\u00e9curis\u00e9e avec le cabinet pour les questions non urgentes",
    ]
    for p in portal:
        y=bul(c,p,y)
    y-=14
    y=sec_title(c,"MODULE 19 : Programme de Fid\u00e9lit\u00e9",y)
    loyalty=[
        "Points de fid\u00e9lit\u00e9 accord\u00e9s \u00e0 chaque acte r\u00e9alis\u00e9",
        "Niveaux VIP : Bronze, Argent, Or avec avantages diff\u00e9renci\u00e9s",
        "R\u00e9compenses : remises, consultations offertes, produits offerts",
        "Tableau de bord engagement patient et risque de d\u00e9perdition",
    ]
    for l in loyalty:
        y=bul(c,l,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 15 — MODULES 20-22: MOBILE + GESTION STAFF + ANALYTICS
# ═══════════════════════════════════════════════════════════════════════════════
def p15(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"MOBILIT\u00c9, STAFF & ANALYTICS","Modules 20-22 : Apps Mobiles, RH & Intelligence")
    footer(c,15)
    y=H-120
    y=sec_title(c,"MODULE 20 : Applications Mobiles",y)
    # 4 apps description
    apps2=[
        ("App Admin","Gestion compl\u00e8te du cabinet depuis smartphone : KPIs, patients, agenda, finances"),
        ("App Patient","Portail VIP mobile : RDV, paiements, documents, messagerie s\u00e9curis\u00e9e"),
        ("App Staff","Pour praticiens et assistants : agenda du jour, dossiers patients, odontogramme"),
        ("App Comptable","Module financier mobile : facturation, recouvrement, grands livres"),
    ]
    for tit,desc in apps2:
        c.setFont("Helvetica-Bold",10)
        c.setFillColor(DARK)
        c.drawString(28,y,"\u25b6  "+tit)
        y-=16
        y=body(c,desc,40,y,sz=9,lh=13)
        y-=6
    y-=10
    y=sec_title(c,"MODULE 21 : Gestion du Personnel",y)
    staff=[
        "Fiches employ\u00e9s avec comp\u00e9tences et habilitations",
        "Planning hebdomadaire par praticien et assistant",
        "Suivi du temps de travail par acte et par journ\u00e9e",
        "Contr\u00f4le d\u2019acc\u00e8s RBAC : propri\u00e9taire, dentiste, assistant, secr\u00e9taire, comptable",
    ]
    for s in staff:
        y=bul(c,s,y)
    y-=14
    y=sec_title(c,"MODULE 22 : Analytics & Business Intelligence",y)
    analytics=[
        "Tableaux de bord multi-dimensionnels avec 50+ indicateurs",
        "Analyse de la patient\u00e8le : croissance, r\u00e9tention, valeur vie patient",
        "Performance clinique : actes les plus fr\u00e9quents et rentables",
        "Pr\u00e9dictions IA sur les tendances de fr\u00e9quentation",
        "Exports CSV et PDF pour pr\u00e9sentations et reporting",
    ]
    for a in analytics:
        y=bul(c,a,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 16 — SÉCURITÉ & ARCHITECTURE TECHNIQUE
# ═══════════════════════════════════════════════════════════════════════════════
def p16(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"S\u00c9CURIT\u00c9 & ARCHITECTURE TECHNIQUE","Protection Bancaire & Stack Technologique")
    footer(c,16)
    y=H-120
    y=sec_title(c,"Stack Technologique",y)
    # Tech grid
    tech=[
        ("Frontend","Next.js 16 \u2022 React 19 \u2022 TypeScript \u2022 Tailwind CSS"),
        ("Backend","Node.js \u2022 Prisma ORM \u2022 API REST \u2022 NextAuth"),
        ("Base de donn\u00e9es","MongoDB Atlas \u2022 Multi-tenant \u2022 Backups auto"),
        ("Intelligence IA","DeepSeek v3 \u2022 OpenAI SDK \u2022 Vision IA"),
        ("Paiements","CinetPay \u2022 Wave \u2022 Orange Money"),
        ("Communication","Resend (Email) \u2022 WhatsApp API \u2022 SMS Gateway"),
        ("Video","Jitsi SDK \u2022 T\u00e9l\u00e9consultation HD"),
        ("PDF/Docs","React-PDF \u2022 PDF signable \u2022 OCR"),
    ]
    cw=(W-60-16)/2
    ch=50
    for i,(tit,desc) in enumerate(tech):
        row=i//2; col=i%2
        xi=30+col*(cw+16)
        yi=y-row*(ch+8)
        c.setFillColor(DARK)
        c.roundRect(xi,yi-ch,cw,ch,5,stroke=0,fill=1)
        c.setFillColor(GOLD)
        c.rect(xi,yi-ch,4,ch,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",9.5)
        c.setFillColor(GOLD)
        c.drawString(xi+12,yi-18,tit)
        body(c,desc,xi+12,yi-32,maxw=cw-18,sz=8,col=colors.HexColor("#cbd5e1"),lh=12)
    y-=len(tech)//2*(ch+8)+20
    y=sec_title(c,"S\u00e9curit\u00e9 de Niveau Bancaire",y)
    secu=[
        "Chiffrement AES-256 au repos pour toutes les donn\u00e9es patient",
        "TLS 1.3 pour chiffrement en transit de toutes les communications",
        "Authentification multi-facteurs (MFA) recommand\u00e9e",
        "RBAC granulaire : 6 niveaux d\u2019acc\u00e8s (propri\u00e9taire \u2192 patient)",
        "Audit Trail immuable ELK avec 100\u0025 tra\u00e7abilit\u00e9",
        "Sauvegarde automatique quotidienne avec r\u00e9tention 90 jours",
    ]
    for s in secu:
        y=bul(c,s,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 17 — DÉPLOIEMENT & ACCOMPAGNEMENT
# ═══════════════════════════════════════════════════════════════════════════════
def p17(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"D\u00c9PLOIEMENT & ACCOMPAGNEMENT \u00c9LITE","Formation, Migration & Support D\u00e9di\u00e9")
    footer(c,17)
    y=H-120
    y=sec_title(c,"Processus de D\u00e9ploiement en 48h",y)
    # Timeline
    steps=[
        ("J0","Audit et configuration initiale",
         "Analyse de votre cabinet, configuration du syst\u00e8me, cr\u00e9ation des comptes utilisateurs"),
        ("J1","Migration des donn\u00e9es",
         "Import de votre base patient existante (Excel, CSV, ancien logiciel)"),
        ("J2","Formation de l\u2019\u00e9quipe",
         "Formation pr\u00e9sentielle ou distancielle de tout le personnel"),
        ("J2+","Go Live & Support",
         "Mise en production avec support d\u00e9di\u00e9 pendant 30 jours"),
    ]
    for i,(day,title,desc) in enumerate(steps):
        sy=y-i*72
        c.setFillColor(GOLD)
        c.circle(40,sy-8,12,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",9)
        c.setFillColor(DARK)
        c.drawCentredString(40,sy-12,day)
        if i<len(steps)-1:
            c.setFillColor(colors.HexColor("#d4af3740"))
            c.rect(38,sy-72,4,55,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",10)
        c.setFillColor(DARK)
        c.drawString(64,sy-4,title)
        body(c,desc,64,sy-20,maxw=W-88,sz=9,col=SLATE,lh=13)
    y-=len(steps)*72+20
    y=sec_title(c,"Formation Progressive",y)
    form=[
        "Sessions individuelles : 1h par module selon le r\u00f4le de chaque collaborateur",
        "Vid\u00e9os tutoriels sur la plateforme d\u2019acad\u00e9mie int\u00e9gr\u00e9e (DentoAcademy)",
        "Documentation compl\u00e8te en fran\u00e7ais m\u00e9dical OHADA",
        "Mises \u00e0 jour mensuelles avec vid\u00e9os explicatives des nouvelles fonctions",
    ]
    for f in form:
        y=bul(c,f,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 18 — TARIFICATION & OFFRES
# ═══════════════════════════════════════════════════════════════════════════════
def p18(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"TARIFICATION & OFFRES","Solutions Adapt\u00e9es \u00e0 Chaque Cabinet")
    footer(c,18)
    y=H-120
    offers=[
        ("STARTER",     "Cabinets Solo",
         ["1 Praticien","Agenda & Patients","Facturation de base","Support Email"],
         "Sur devis"),
        ("PRESTIGE",    "Cabinets Moyenne Structure",
         ["3 Praticiens","Tous les modules","IA incluse","Support prioritaire"],
         "Sur devis"),
        ("ELITE",       "Groupements Dentaires",
         ["Praticiens illimit\u00e9s","Modules sp\u00e9ciaux","IA avanc\u00e9e","Support d\u00e9di\u00e9 24h"],
         "Sur devis"),
    ]
    cw=(W-60-2*16)/3
    for i,(name,target,features,price) in enumerate(offers):
        xi=30+i*(cw+16)
        oh=300
        # Highlight middle one
        if i==1:
            c.setFillColor(GOLD)
            c.roundRect(xi-3,y-oh-6,cw+6,oh+12,10,stroke=0,fill=1)
        c.setFillColor(DARK if i!=1 else colors.HexColor("#1e293b"))
        c.roundRect(xi,y-oh,cw,oh,8,stroke=0,fill=1)
        c.setFillColor(GOLD if i!=1 else DARK)
        c.rect(xi,y-3,cw,3,stroke=0,fill=1)
        c.setFont("Helvetica-Bold",14)
        c.setFillColor(GOLD)
        c.drawCentredString(xi+cw/2,y-24,name)
        c.setFont("Helvetica",9)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawCentredString(xi+cw/2,y-40,target)
        fy=y-64
        for feat in features:
            c.setFont("Helvetica",9)
            c.setFillColor(WHITE)
            c.drawCentredString(xi+cw/2,fy,"\u2713  "+feat)
            fy-=18
        c.setFont("Helvetica-Bold",11)
        c.setFillColor(GOLD)
        c.drawCentredString(xi+cw/2,y-oh+25,price)
        c.setFont("Helvetica",8)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawCentredString(xi+cw/2,y-oh+12,"Formation incluse")
    y-=oh+20
    c.setFillColor(NAVY)
    c.roundRect(30,y-55,W-60,55,8,stroke=0,fill=1)
    c.setFillColor(GOLD)
    c.rect(30,y-3,W-60,3,stroke=0,fill=1)
    c.setFont("Helvetica-Bold",11)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2,y-20,"Toutes les offres incluent : Conformit\u00e9 OHADA \u2022 Wave & Orange Money \u2022 WhatsApp/SMS \u2022 Formation 48h")
    c.setFont("Helvetica",9)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    c.drawCentredString(W/2,y-38,"Tarification adapt\u00e9e au march\u00e9 africain. Contactez-nous pour un devis personnalis\u00e9.")

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 19 — CONCLUSION & CTA
# ═══════════════════════════════════════════════════════════════════════════════
def p19(c):
    c.setFillColor(DARK)
    c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(colors.HexColor("#d4af3710"))
    c.circle(W-80,H-80,160,stroke=0,fill=1)
    c.circle(60,60,130,stroke=0,fill=1)
    c.setFillColor(GOLD)
    c.rect(0,H-5,W,5,stroke=0,fill=1)
    c.setFont("Helvetica-Bold",26)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2,H-80,"Passez \u00e0 l\u2019Excellence avec DentoPrestige")
    c.setFont("Helvetica",12)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    body(c,("DentoPrestige est plus qu\u2019un logiciel : c\u2019est le partenaire strat\u00e9gique "
            "de votre cabinet pour les 10 prochaines ann\u00e9es. En lib\u00e9rant jusqu\u2019\u00e0 "
            "40\u0025 de votre temps administratif, vous pouvez vous concentrer sur ce qui fait "
            "v\u00e9ritablement votre valeur : le soin d\u2019excellence et la relation patient."),
           60,H-140,maxw=W-120,sz=12,col=colors.HexColor("#cbd5e1"),lh=19)
    # Checklist
    checks=[
        "\u25c6  Conformit\u00e9 OHADA/SYSCOHADA native d\u00e8s le premier jour",
        "\u25c6  IA v4.0 : Holo-Smile, Neural Vision Lab, AI Command Center",
        "\u25c6  Blockchain Ledger + Messagerie Interne + Concierge VIP",
        "\u25c6  Paiements Wave, Orange Money & Free Money unifi\u00e9s",
        "\u25c6  Communication WhatsApp, SMS, Email & T\u00e9l\u00e9consultation",
        "\u25c6  44+ modules, formation compl\u00e8te, d\u00e9ploiement en 48 heures",
    ]
    cy=H-280
    for check in checks:
        c.setFont("Helvetica",11)
        c.setFillColor(WHITE)
        c.drawString(80,cy,check)
        cy-=26
    # Demo box
    c.setFillColor(colors.HexColor("#1e293b"))
    c.roundRect(60,cy-90,W-120,85,10,stroke=0,fill=1)
    c.setFillColor(GOLD)
    c.rect(60,cy-3,W-120,3,stroke=0,fill=1)
    c.setFont("Helvetica-Bold",14)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2,cy-25,"D\u00e9monstration Personnalis\u00e9e Gratuite \u2014 45 minutes")
    c.setFont("Helvetica",10)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2,cy-44,"https://dentoprestige.vercel.app/")
    c.setFont("Helvetica",9)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(W/2,cy-60,"admin@dentoprestige.sn  |  demo2026")
    c.drawCentredString(W/2,cy-76,"Mamadou Dia  \u2022  +221 777 529 288  \u2022  mamadou.dia@processingenierie.com")
    footer(c,19)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 20 — NOUVELLES FONCTIONNALITES IA v4.0 : Holo-Smile + Neural Vision
# ═══════════════════════════════════════════════════════════════════════════════
def p20(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"INTELLIGENCE ARTIFICIELLE v4.0","Holo-Smile Studio \u2022 Neural Vision Lab \u2022 AI Command Center")
    footer(c,20)
    y=H-120
    y=sec_title(c,"NOUVEAU \u2014 Holo-Smile Studio (AR G\u00e9n\u00e9ratif)",y)
    holo=[
        "Simulation esth\u00e9tique holographique du sourire en temps r\u00e9el",
        "Technologie de r\u00e9alit\u00e9 augment\u00e9e via cam\u00e9ra du cabinet",
        "Miroir holographique : le patient visualise son futur sourire avant acte",
        "G\u00e9n\u00e9ration IA de propositions de smile design personnalis\u00e9es",
        "Partage s\u00e9curis\u00e9 des simulations holographiques via portail VIP",
        "Compatible avec les flux STL et outils d\u2019imagerie 3D",
    ]
    for h in holo:
        y=bul(c,h,y)
    y-=14
    y=sec_title(c,"NOUVEAU \u2014 Neural Vision Lab",y)
    neural=[
        "Analyse diagnostique avanc\u00e9e bas\u00e9e sur r\u00e9seaux de neurones profonds",
        "D\u00e9tection automatique : caries, p\u00e9riapicales, pertes osseuses, implants",
        "Comparaison inter-s\u00e9ances avec cartographie des \u00e9volutions",
        "Pr\u00e9cision diagnostique : 99,8\u0025 sur les radiographies panoramiques",
        "Rapport IA g\u00e9n\u00e9r\u00e9 automatiquement int\u00e9gr\u00e9 dans le dossier patient",
        "Mod\u00e8les entra\u00een\u00e9s sp\u00e9cifiquement sur les pathologies dentaires africaines",
    ]
    for n in neural:
        y=bul(c,n,y)
    y-=14
    y=sec_title(c,"NOUVEAU \u2014 AI Command Center",y)
    aicmd=[
        "Centre de commande vocal : pilotage de l\u2019application par la voix",
        "Commandes intelligentes : \u00ab Cr\u00e9e un RDV pour Mme Diallo vendredi \u00bb",
        "Ex\u00e9cution d\u2019actions m\u00e9tier en langage naturel sans navigation",
        "Elite Companion : assistant IA contextuel int\u00e9gr\u00e9 par page",
        "Neural Treatment Map : cartographie IA du parcours th\u00e9rapeutique optimal",
        "Support multi-LLM : DeepSeek v3 + OpenAI GPT-4 Vision",
    ]
    for a in aicmd:
        y=bul(c,a,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 21 — INNOVATION : Blockchain + Messagerie Interne
# ═══════════════════════════════════════════════════════════════════════════════
def p21(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"INNOVATION & CONNECTIVIT\u00c9","Blockchain Ledger \u2022 Messagerie Interne \u2022 Paiement Free Money")
    footer(c,21)
    y=H-120
    y=sec_title(c,"NOUVEAU \u2014 Blockchain Medical Ledger",y)
    blockchain=[
        "Registre m\u00e9dical immuable : chaque acte sign\u00e9 et hash\u00e9 sur blockchain",
        "Tra\u00e7abilit\u00e9 juridique absolue des interventions et prescriptions",
        "Acc\u00e8s patient s\u00e9curis\u00e9 aux enregistrements blockchain via portail VIP",
        "Conformit\u00e9 RGPD et loi de protection des donn\u00e9es de sant\u00e9 s\u00e9n\u00e9galaise",
        "Int\u00e9gration transparente avec l\u2019Audit Trail existant (couche suppl\u00e9mentaire)",
        "Certificats d\u2019authenticit\u00e9 PDF g\u00e9n\u00e9r\u00e9s automatiquement pour chaque dossier",
    ]
    for b in blockchain:
        y=bul(c,b,y)
    y-=14
    y=sec_title(c,"NOUVEAU \u2014 Messagerie Interne (Slack-Like)",y)
    msg=[
        "Plateforme de communication d\u2019\u00e9quipe int\u00e9gr\u00e9e type Slack",
        "Canaux th\u00e9matiques : #urgences, #labo, #admin, #general",
        "Mentions @praticien, @secr\u00e9taire avec notifications en temps r\u00e9el",
        "Partage s\u00e9curis\u00e9 de fichiers et radios dans le fil de discussion",
        "Messages li\u00e9s aux dossiers patients avec contexte automatique",
        "Historique complet archiv\u00e9 pour tra\u00e7abilit\u00e9 et audit",
    ]
    for m in msg:
        y=bul(c,m,y)
    y-=14
    y=sec_title(c,"NOUVEAU \u2014 Paiement Free Money + Gateway Compl\u00e8te",y)
    freemoney=[
        "Free Money : int\u00e9gration du 3\u00e8me op\u00e9rateur mobile money s\u00e9n\u00e9galais",
        "Passerelle unifi\u00e9e : Wave \u2022 Orange Money \u2022 Free Money \u2022 Visa/Mastercard",
        "QR Code de paiement g\u00e9n\u00e9r\u00e9 automatiquement depuis la facture",
        "Remboursement automatique en cas d\u2019annulation ou avoir",
        "Dashboard temps r\u00e9el des flux de paiement par op\u00e9rateur",
        "Rapprochement bancaire automatis\u00e9 multi-canaux",
    ]
    for f in freemoney:
        y=bul(c,f,y)

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE 22 — VIP & MULTI-SITE : Concierge Bio-Logistique + Executive Satellite
# ═══════════════════════════════════════════════════════════════════════════════
def p22(c):
    c.setFillColor(LIGHT)
    c.rect(0,0,W,H,stroke=0,fill=1)
    dark_header(c,"EXCELLENCE VIP & MULTI-SITE","Concierge Bio-Logistique \u2022 Executive Satellite")
    footer(c,22)
    y=H-120
    y=sec_title(c,"NOUVEAU \u2014 Concierge Bio-Logistique",y)
    concierge=[
        "Service de logistique VIP int\u00e9gr\u00e9 pour les patients premium",
        "R\u00e9servation transport (taxi, VTC) depuis le dossier patient",
        "Gestion d\u2019h\u00e9bergement h\u00f4telier pour patients venant de l\u2019ext\u00e9rieur",
        "Coordination inter-sp\u00e9cialistes : radiologie, laboratoire, chirurgien",
        "Suivi logistique en temps r\u00e9el visible par le patient via portail VIP",
        "Niveau Platinum exclusive : activation sur les plans ELITE et Enterprise",
    ]
    for co in concierge:
        y=bul(c,co,y)
    y-=14
    y=sec_title(c,"NOUVEAU \u2014 Executive Satellite (Multi-Cliniques)",y)
    satellite=[
        "Tableau de bord ex\u00e9cutif pour la gestion de plusieurs cabinets",
        "Vue consolid\u00e9e : CA, patients, performances par site en temps r\u00e9el",
        "Benchmarking inter-cliniques : indicateurs compar\u00e9s entre sites",
        "Gestion centralis\u00e9e des praticiens itin\u00e9rants entre plusieurs adresses",
        "Alertes critiques consolid\u00e9es : stocks, impay\u00e9s, urgences multi-sites",
        "Rapports de performance consolid\u00e9s exportables PDF/CSV",
    ]
    for s in satellite:
        y=bul(c,s,y)
    y-=14
    y=sec_title(c,"R\u00e9capitulatif Innovation v4.0",y)
    recap=[
        "8 nouvelles fonctionnalit\u00e9s majeures int\u00e9gr\u00e9es dans la version 4.0",
        "IA de nouvelle g\u00e9n\u00e9ration : Holo-Smile, Neural Vision, AI Command",
        "Infrastructure blockchain : immuabilit\u00e9 et s\u00e9curit\u00e9 juridique absolue",
        "Communication unifi\u00e9e : messagerie interne + t\u00e9l\u00e9consultation Jitsi",
        "Paiements compl\u00e8ts : Free Money compl\u00e8te la triade mobile africaine",
        "Services VIP : Concierge Bio-Logistique + Multi-site Executive Satellite",
    ]
    for r in recap:
        y=bul(c,r,y)

def main():
    c=canvas.Canvas(OUTPUT,pagesize=A4)
    c.setTitle("DentoPrestige - Presentation Complete v4.0")
    c.setAuthor("ProcessIngenierie")
    pages=[p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22]
    for fn in pages:
        fn(c)
        c.showPage()
    c.save()
    print(f"Created: {OUTPUT}")

if __name__=="__main__":
    main()
