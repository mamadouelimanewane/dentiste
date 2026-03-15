#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Brochure_DentoPrestige_Final.pdf - 6 pages
Modeled exactly after Brochure_LexPremium (1).pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Frame, KeepInFrame
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Output path
OUTPUT = os.path.join(os.path.dirname(__file__), "Brochure_DentoPrestige_Final.pdf")
W, H = A4  # 595.27 x 841.89 pts

# ─── COLOUR PALETTE ───────────────────────────────────────────────────────────
DARK      = colors.HexColor("#0f172a")   # slate-950 – dark luxury background
GOLD      = colors.HexColor("#d4af37")   # brand gold
WHITE     = colors.white
LIGHT     = colors.HexColor("#f8fafc")   # near-white content bg
SLATE     = colors.HexColor("#334155")   # slate-700 body text
ACCENT2   = colors.HexColor("#1e3a5f")   # deep navy accent
GOLD_SOFT = colors.HexColor("#f0e0a0")   # light gold for dark bg paragraphs
DIVIDER   = colors.HexColor("#d4af3760") # semi-transparent gold

def draw_page(c, page_num):
    c.setPageSize(A4)

def add_gradient_bg(c, x, y, w, h, col1, col2=None):
    """Fill rectangle with solid color (gradient approximation)."""
    c.setFillColor(col1)
    c.rect(x, y, w, h, stroke=0, fill=1)

def header_band(c, title, subtitle=None, dark_bg=True):
    """Draw a top header band with title and optional subtitle."""
    bh = 120 if subtitle else 80
    y0 = H - bh
    c.setFillColor(DARK if dark_bg else ACCENT2)
    c.rect(0, y0, W, bh, stroke=0, fill=1)
    # Gold top stripe
    c.setFillColor(GOLD)
    c.rect(0, H - 4, W, 4, stroke=0, fill=1)
    # Title
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H - 50, title)
    if subtitle:
        c.setFont("Helvetica", 13)
        c.setFillColor(WHITE)
        c.drawCentredString(W/2, H - 72, subtitle)
    # Left decorative bar
    c.setFillColor(GOLD)
    c.rect(0, y0, 5, bh, stroke=0, fill=1)

def footer(c, page_num):
    """Draw page footer."""
    c.setFillColor(DARK)
    c.rect(0, 0, W, 28, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, 28, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(WHITE)
    c.drawString(18, 10, "DentoPrestige Africa  \u2022  Soignez mieux, g\u00e9rez moins")
    c.drawRightString(W - 18, 10, f"mamadou.dia@processingenierie.com  |  +221 777 529 288")
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 10, f"\u25c6  {page_num}  \u25c6")

def section_title(c, text, y, gold_bar=True):
    """Draw a bold section title with optional gold left bar."""
    if gold_bar:
        c.setFillColor(GOLD)
        c.rect(18, y - 4, 4, 20, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(DARK)
    c.drawString(28, y, text)
    return y - 30

def bullet_item(c, text, y, indent=28, bullet="\u25c6", max_width=None):
    """Draw a bullet point. Returns new y."""
    if max_width is None:
        max_width = W - indent - 24
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawString(indent, y, bullet + "  ")
    c.setFont("Helvetica", 9)
    c.setFillColor(SLATE)
    # Simple word wrap
    words = text.split()
    line = ""
    x_start = indent + 16
    line_h = 14
    first = True
    for word in words:
        test = line + (" " if line else "") + word
        if c.stringWidth(test, "Helvetica", 9) < (max_width - 14):
            line = test
        else:
            c.drawString(x_start, y, line)
            y -= line_h
            line = word
            if first:
                first = False
                x_start = indent + 16
    if line:
        c.drawString(x_start, y, line)
        y -= line_h
    return y - 4

def draw_text_block(c, text, x, y, font="Helvetica", size=9.5, color=SLATE,
                    max_width=None, line_height=15, align="left"):
    """Draw wrapped text block, return final y."""
    if max_width is None:
        max_width = W - x - 24
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    line = ""
    for word in words:
        test = line + (" " if line else "") + word
        if c.stringWidth(test, font, size) < max_width:
            line = test
        else:
            if align == "center":
                c.drawCentredString(x + max_width/2, y, line)
            else:
                c.drawString(x, y, line)
            y -= line_height
            line = word
    if line:
        if align == "center":
            c.drawCentredString(x + max_width/2, y, line)
        else:
            c.drawString(x, y, line)
        y -= line_height
    return y - 4

def card_box(c, x, y, w, h, title, body_lines, icon=None):
    """Draw a feature card."""
    c.setFillColor(colors.HexColor("#f1f5f9"))
    c.roundRect(x, y, w, h, 8, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(x, y + h - 3, w, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(DARK)
    c.drawString(x + 10, y + h - 22, title)
    cy = y + h - 38
    for line in body_lines:
        c.setFont("Helvetica", 8.5)
        c.setFillColor(SLATE)
        c.drawString(x + 10, cy, line)
        cy -= 13

def stat_badge(c, x, y, stat, label):
    """Draw a stat badge (like the cover badges)."""
    c.setFillColor(DARK)
    c.roundRect(x, y, 110, 50, 8, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(x, y + 48, 110, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(GOLD)
    c.drawCentredString(x + 55, y + 28, stat)
    c.setFont("Helvetica", 8)
    c.setFillColor(WHITE)
    c.drawCentredString(x + 55, y + 13, label)

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE 1 — COVER
# ═══════════════════════════════════════════════════════════════════════════════
def page1(c):
    # Full dark background
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    # Decorative gold circles (luxury feel)
    c.setFillColor(colors.HexColor("#d4af3715"))
    c.circle(W - 80, H - 80, 120, stroke=0, fill=1)
    c.circle(80, 80, 100, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#d4af3708"))
    c.circle(W/2, H/2, 200, stroke=0, fill=1)

    # Top gold stripe
    c.setFillColor(GOLD)
    c.rect(0, H - 5, W, 5, stroke=0, fill=1)

    # Diamond logo
    c.setFont("Helvetica-Bold", 36)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H - 130, "\u25c6")

    # Brand name
    c.setFont("Helvetica-Bold", 48)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, H - 190, "DENTOPRESTIGE")

    # Gold accent bar under name
    c.setFillColor(GOLD)
    c.rect(W/2 - 120, H - 205, 240, 3, stroke=0, fill=1)

    # Tagline
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H - 238, "Soignez mieux, g\u00e9rez moins")

    # Subtitle
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(W/2, H - 268, "\u00c9cosyst\u00e8me d\u2019IA & Haute Gestion")
    c.drawCentredString(W/2, H - 284, "pour Cabinets Dentaires d\u2019Exception")

    # 5 stat badges
    badges = [
        ("40%",   "Temps lib\u00e9r\u00e9"),
        ("100%",  "Conforme SYSCOHADA"),
        ("IA v4", "Holo-Smile + Neural"),
        ("48h",   "D\u00e9ploiement"),
        ("44+",   "Modules v4.0"),
    ]
    total_w = 5 * 110 + 4 * 12
    start_x = (W - total_w) / 2
    for i, (stat, label) in enumerate(badges):
        stat_badge(c, start_x + i * 122, H - 420, stat, label)

    # Divider
    c.setFillColor(GOLD)
    c.rect(60, H - 450, W - 120, 1, stroke=0, fill=1)

    # Description text
    desc = ("DentoPrestige Africa vous offre une gestion clinique et administrative "
            "d\u2019exception, sp\u00e9cialement con\u00e7ue pour les chirurgiens-dentistes "
            "de l\u2019espace OHADA. Intelligence artificielle, conformit\u00e9 SYSCOHADA, "
            "paiements mobiles et s\u00e9curit\u00e9 bancaire : un \u00e9cosyst\u00e8me complet "
            "pour transformer votre cabinet.")
    draw_text_block(c, desc, 60, H - 480, font="Helvetica", size=10.5,
                    color=colors.HexColor("#cbd5e1"), max_width=W - 120, line_height=17)

    # Bottom
    c.setFillColor(GOLD)
    c.rect(0, 38, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 22, "DentoPrestige Africa  \u2022  Le Standard de l\u2019Excellence pour le Praticien de Demain")
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(W/2, 10, "mamadou.dia@processingenierie.com  |  +221 777 529 288")

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE 2 — Le Praticien n'est plus seul + Dashboard + DentoAI + Scanner
# ═══════════════════════════════════════════════════════════════════════════════
def page2(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    header_band(c, "DENTOPRESTIGE", "L\u2019Intelligence au Service de Votre Cabinet")
    footer(c, 2)

    y = H - 148

    # — Section: Le Praticien n'est plus seul
    section_title(c, "Le Praticien n\u2019est Plus Seul", y)
    y -= 8
    intro = ("Dans un environnement m\u00e9dical en constante \u00e9volution, DentoPrestige se positionne "
             "comme votre collaborateur num\u00e9rique d\u2019\u00e9lite, disponible 24h/24. Notre mission : "
             "automatiser intelligemment les t\u00e2ches r\u00e9p\u00e9titives pour redonner du temps "
             "au soin de qualit\u00e9.")
    y = draw_text_block(c, intro, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 10

    # — Section: Votre Tour de Contrôle Intelligent
    section_title(c, "Votre Tour de Contr\u00f4le Intelligent", y)
    y -= 8
    dash = ("Le tableau de bord DentoPrestige offre une vision 360\u00b0 de votre cabinet : patients actifs, "
            "rendez-vous prioritaires, alertes critiques \u2014 tout sur un \u00e9cran \u00e9pur\u00e9. "
            "L\u2019intelligence artificielle identifie automatiquement les dossiers n\u00e9cessitant une "
            "attention imm\u00e9diate, tandis que les indicateurs financiers vous permettent de suivre "
            "votre CA et vos impay\u00e9s en temps r\u00e9el.")
    y = draw_text_block(c, dash, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    # — Section: DentoAI
    section_title(c, "DentoAI : Intelligence Clinique au C\u0153ur", y)
    y -= 6
    items_ai = [
        ("Chat Clinique Contextuel", "Interrogez l\u2019IA sur un dossier patient sp\u00e9cifique"),
        ("Recherche S\u00e9mantique", "Fouille instantan\u00e9e dans les protocoles cliniques"),
        ("Analyses Pr\u00e9cises", "R\u00e9f\u00e9rences exactes des codes CCAM et actes dentaires"),
        ("Synth\u00e8se IA",         "R\u00e9sum\u00e9 de l\u2019historique patient en quelques secondes"),
    ]
    # 2-column cards
    cw = (W - 48 - 14) / 2
    ch = 58
    for i, (title, body) in enumerate(items_ai):
        xi = 24 + (i % 2) * (cw + 14)
        yi = y - (i // 2) * (ch + 10)
        card_box(c, xi, yi - ch, cw, ch, title, [body])
    y -= 2 * (ch + 10) + 8

    # — Section: Le Scanner Radiologique
    section_title(c, "Le Scanner Radiologique IA", y)
    y -= 8
    scanner = ("Transformez vos radiographies en opportunit\u00e9s diagnostiques. Notre IA analyse une "
               "radio panoramique en moins de 60 secondes, extrait automatiquement les pathologies "
               "visibles, sugg\u00e8re des plans de traitement adapt\u00e9s et d\u00e9tecte les "
               "incoh\u00e9rences dans l\u2019historique clinique.")
    y = draw_text_block(c, scanner, 24, y, size=9.5, max_width=W - 48, line_height=15)

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE 3 — GED + Génération Procédurale + Bible des Protocoles
# ═══════════════════════════════════════════════════════════════════════════════
def page3(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    header_band(c, "GED \u00c9LITE & BIBLE CLINIQUE", "Armoire Num\u00e9rique & Protocoles d\u2019Excellence")
    footer(c, 3)

    y = H - 148

    # GED section
    section_title(c, "GED \u00c9lite : Armoire Num\u00e9rique Sans Papier", y)
    y -= 6
    ged_items = [
        "OCR Haute R\u00e9solution : Conversion de radiographies et ordonnances scann\u00e9es en textes \u00e9ditables",
        "Versioning Professionnel : Historique complet de chaque modification du plan de traitement",
        "Signature Num\u00e9rique : Signature l\u00e9gale du praticien int\u00e9gr\u00e9e au flux de travail m\u00e9dical",
        "Recherche Plein Texte : Fouille instantan\u00e9e dans tout le fonds documentaire du cabinet",
    ]
    for item in ged_items:
        y = bullet_item(c, item, y)
    y -= 14

    # Génération automatique
    section_title(c, "G\u00e9n\u00e9ration Proc\u00e9durale Automatique", y)
    y -= 8
    gen_text = ("Le pipeline automatique cr\u00e9e dynamiquement vos plans de traitement selon la nature "
                "des pathologies, du consentement \u00e9clair\u00e9 initial \u00e0 l\u2019ordonnance "
                "finale. Les d\u00e9lais de r\u00e9-\u00e9valuation et rappels post-op\u00e9ratoires sont "
                "inject\u00e9s automatiquement avec des alertes par notifications push pour ne jamais "
                "rater un suivi patient critique.")
    y = draw_text_block(c, gen_text, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    # Bible des protocoles
    section_title(c, "La Bible des Protocoles : Votre R\u00e9f\u00e9rentiel d\u2019Excellence", y)
    y -= 8
    bible_text = ("Centralisez tous vos protocoles cliniques et mod\u00e8les d\u2019ordonnances dans "
                  "un r\u00e9f\u00e9rentiel s\u00e9curis\u00e9. La g\u00e9n\u00e9ration dynamique "
                  "remplit automatiquement les donn\u00e9es patient, r\u00e9duisant de 75\u0025 le "
                  "temps de r\u00e9daction des actes standards tout en supprimant les risques "
                  "d\u2019erreurs m\u00e9dicales.")
    y = draw_text_block(c, bible_text, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    # Agenda intelligent
    section_title(c, "Agenda Intelligent & Gestion des Rendez-vous", y)
    y -= 6
    agenda_items = [
        "Vue par Praticien : Optimisation de vos salles de soins et fauteuils",
        "Calcul Instantan\u00e9 : Dur\u00e9es d\u2019acte et disponibilit\u00e9s automatis\u00e9es",
        "Synchronisation Globale : Acc\u00e8s smartphone et tablettes partout",
        "Rappels Critiques : SMS, WhatsApp et Email pour tous les patients",
    ]
    for item in agenda_items:
        y = bullet_item(c, item, y)

    # Feature grid
    y -= 20
    features = [
        ("Odontogramme", ["Schema dentaire", "interactif 32 dents"]),
        ("Plans de traitement", ["Multi-etapes avec", "devis integres"]),
        ("Portail Patient", ["Acces 24h/24 en", "ligne securise"]),
        ("Analytique", ["Tableaux de bord", "temps reel"]),
    ]
    # draw 4-column mini cards
    cw2 = (W - 48 - 3 * 10) / 4
    for i, (ico, lines) in enumerate(features):
        xi = 24 + i * (cw2 + 10)
        card_box(c, xi, y - 55, cw2, 55, ico, lines)

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE 4 — Comptabilité OHADA + Facturation + Portail Patient
# ═══════════════════════════════════════════════════════════════════════════════
def page4(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    header_band(c, "COMPTABILIT\u00c9 & CONFORMIT\u00c9 OHADA ABSOLUE",
                "Pilotage Financier Strat\u00e9gique en Temps R\u00e9el")
    footer(c, 4)

    y = H - 148

    section_title(c, "Comptabilit\u00e9 OHADA / SYSCOHADA Int\u00e9gr\u00e9e", y)
    y -= 8
    compta = ("La comptabilit\u00e9 double int\u00e9gr\u00e9e met fin \u00e0 la double saisie avec une "
              "conformit\u00e9 totale au SYSCOHADA. Plan comptable et journaux r\u00e9glementaires, "
              "gestion rigoureuse des encaissements avec tra\u00e7abilit\u00e9 totale des flux "
              "financiers, \u00e9critures automatiques pour chaque facture et paiement \u00e9mis.")
    y = draw_text_block(c, compta, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    section_title(c, "Pilotage Strat\u00e9gique en Temps R\u00e9el", y)
    y -= 6
    pilotage_items = [
        "Bilan & Compte de R\u00e9sultat : En temps r\u00e9el, sans attendre l\u2019expert-comptable",
        "Interrogation de Comptes : Grand Livre et Balance en 2 clics",
        "Rentabilit\u00e9 par Praticien : Analyse par acte et type de soin",
        "Suivi de Tr\u00e9sorerie : Anticipation des besoins et encaissements",
    ]
    for item in pilotage_items:
        y = bullet_item(c, item, y)
    y -= 14

    section_title(c, "Facturation & Recouvrement Optimis\u00e9s", y)
    y -= 8
    facturation = ("Des factures au design de prestige refl\u00e9tant votre image professionnelle. "
                   "Les relances automatiques identifient directement les retards de paiement. "
                   "Module provision pour la gestion simplifi\u00e9e des acomptes. Historique de "
                   "paiement consolid\u00e9 par patient et par acte. Int\u00e9gration Wave et "
                   "Orange Money pour les paiements mobiles.")
    y = draw_text_block(c, facturation, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    section_title(c, "Portail Patient 2.0 : Transparence & Confiance", y)
    y -= 8
    portail = ("Vos patients acc\u00e8dent \u00e0 leur espace s\u00e9curis\u00e9 24h/24 pour visualiser "
               "l\u2019avancement de leurs traitements en temps r\u00e9el, d\u00e9poser des documents "
               "m\u00e9dicaux dans un coffre-fort partag\u00e9, effectuer leurs paiements en ligne et "
               "suivre leur facturation. Cette transparence structur\u00e9e renforce "
               "consid\u00e9rablement la confiance et la satisfaction patient.")
    y = draw_text_block(c, portail, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 16

    # FSE & Télétransmission highlight box
    c.setFillColor(DARK)
    c.roundRect(24, y - 55, W - 48, 55, 8, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(24, y - 3, W - 48, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(GOLD)
    c.drawString(36, y - 20, "\u25c6  FSE & T\u00e9l\u00e9transmission Automatique")
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    c.drawString(36, y - 35, "G\u00e9n\u00e9ration et envoi automatis\u00e9s des Feuilles de Soins \u00c9lectroniques.")
    c.drawString(36, y - 48, "Conformit\u00e9 totale aux normes sanitaires UEMOA et traitement des tiers-payants.")

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE 5 — Dictée Vocale + War Room + Sécurité + Accompagnement
# ═══════════════════════════════════════════════════════════════════════════════
def page5(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    header_band(c, "MOBILIT\u00c9 & S\u00c9CURIT\u00c9 DE NIVEAU BANCAIRE",
                "Dict\u00e9e Vocale IA, War Room & Protection des Donn\u00e9es")
    footer(c, 5)

    y = H - 148

    section_title(c, "Dict\u00e9e Vocale IA : Votre Parole Devient un Acte", y)
    y -= 8
    dictee = ("Transcription haute fid\u00e9lit\u00e9 avec reconnaissance du jargon clinique dentaire. "
              "En sortie de consultation, enregistrez vos observations vocales : DentoAI les classe, "
              "les r\u00e9sume et transforme vos notes en dossiers cliniques structur\u00e9s. "
              "Mobilit\u00e9 totale : ne perdez plus aucune information de consultation.")
    y = draw_text_block(c, dictee, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    section_title(c, "Le \u2018War Room\u2019 Mobile : Ma\u00eetrisez Votre Cabinet", y)
    y -= 6
    warroom_items = [
        "Gestion des Urgences : Prise en charge imm\u00e9diate des urgences dentaires",
        "Acc\u00e8s Offline : Vos dossiers patients disponibles m\u00eame sans internet",
        "Swipe de Documents : Acc\u00e8s ultra-rapide aux radiographies et plans",
        "Modernit\u00e9 Affich\u00e9e : Un cabinet \u00e0 la pointe face \u00e0 vos patients",
    ]
    for item in warroom_items:
        y = bullet_item(c, item, y)
    y -= 14

    section_title(c, "S\u00e9curit\u00e9 Maximale : Protection de Niveau Bancaire", y)
    y -= 8
    secu = ("H\u00e9bergement s\u00e9curis\u00e9 avec chiffrement AES-256 des donn\u00e9es et des transferts. "
            "Signature num\u00e9rique avec authentification forte des consentements \u00e9clair\u00e9s. "
            "Monitoring IA assurant la tra\u00e7abilit\u00e9 de chaque acc\u00e8s aux dossiers "
            "m\u00e9dicaux confidentiels. Vos donn\u00e9es patient sont sanctuaris\u00e9es avec le "
            "plus haut niveau de protection.")
    y = draw_text_block(c, secu, 24, y, size=9.5, max_width=W - 48, line_height=15)
    y -= 14

    section_title(c, "Innovations v4.0 : 8 Nouvelles Fonctionnalit\u00e9s Majeures", y)
    y -= 6
    new_feats = [
        "Holo-Smile Studio : Simulation esth\u00e9tique AR holographique en temps r\u00e9el",
        "Neural Vision Lab : Diagnostic IA neuronal \u2014 99,8\u0025 de pr\u00e9cision",
        "Blockchain Medical Ledger : Enregistrements m\u00e9dicaux immuables",
        "Messagerie Interne : Communication \u00e9quipe type Slack int\u00e9gr\u00e9e",
        "Free Money : Triade mobile africaine compl\u00e8te (Wave + Orange + Free)",
        "Concierge Bio-Logistique : Transport & h\u00f4tel pour patients VIP",
        "Executive Satellite : Pilotage multi-cabinets consolid\u00e9",
        "AI Command Center : Pilotage vocal de l\u2019application par IA",
    ]
    for item in new_feats:
        y = bullet_item(c, item, y)
    y -= 10

    # Mobile apps
    apps = [
        ("Admin", "Gestion compl\u00e8te"),
        ("Patient", "Portail VIP"),
        ("Staff", "Soins & agenda"),
        ("Comptable", "Finances"),
    ]
    cw3 = (W - 48 - 3 * 10) / 4
    for i, (title, body) in enumerate(apps):
        xi = 24 + i * (cw3 + 10)
        c.setFillColor(DARK)
        c.roundRect(xi, y - 55, cw3, 55, 8, stroke=0, fill=1)
        c.setFillColor(GOLD)
        c.rect(xi, y - 3, cw3, 3, stroke=0, fill=1)
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(WHITE)
        c.drawCentredString(xi + cw3/2, y - 22, "App " + title)
        c.setFont("Helvetica", 8)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawCentredString(xi + cw3/2, y - 36, body)

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE 6 — CONCLUSION & CTA
# ═══════════════════════════════════════════════════════════════════════════════
def page6(c):
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    # Decorative circles
    c.setFillColor(colors.HexColor("#d4af3712"))
    c.circle(W - 100, H - 100, 140, stroke=0, fill=1)
    c.circle(60, 60, 110, stroke=0, fill=1)

    # Gold top stripe
    c.setFillColor(GOLD)
    c.rect(0, H - 5, W, 5, stroke=0, fill=1)

    # Title
    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H - 80, "Choisissez l\u2019Avenir avec DentoPrestige")

    c.setFont("Helvetica", 12)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    lead = ("DentoPrestige repr\u00e9sente bien plus qu\u2019un simple logiciel de gestion : "
            "c\u2019est le standard de l\u2019excellence pour le praticien de demain.")
    draw_text_block(c, lead, 60, H - 130, font="Helvetica", size=11,
                    color=colors.HexColor("#cbd5e1"), max_width=W - 120, line_height=17)

    # Feature table
    features_table = [
        ("Adaptation Locale",  "Conformit\u00e9 OHADA/SYSCOHADA native"),
        ("IA v4.0",            "Holo-Smile Studio & Neural Vision Lab"),
        ("Paiements",          "Wave, Orange Money & Free Money"),
        ("Blockchain",         "Registre m\u00e9dical immuable v4.0"),
        ("Messagerie Interne", "Communication \u00e9quipe type Slack"),
        ("Concierge VIP",      "Bio-Logistique + Executive Satellite"),
    ]
    y = H - 280
    c.setFillColor(GOLD)
    c.rect(50, y + 8, W - 100, 2, stroke=0, fill=1)
    for i, (key, val) in enumerate(features_table):
        row_y = y - i * 32
        bg = colors.HexColor("#1e293b") if i % 2 == 0 else colors.HexColor("#0f172a")
        c.setFillColor(bg)
        c.roundRect(50, row_y - 22, W - 100, 28, 4, stroke=0, fill=1)
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(66, row_y - 8, "\u25c6  " + key)
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 10)
        c.drawString(260, row_y - 8, val)
    y -= len(features_table) * 32 + 20

    # Demo box
    c.setFillColor(colors.HexColor("#1e293b"))
    c.roundRect(50, y - 95, W - 100, 95, 10, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(50, y - 2, W - 100, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, y - 22, "Demandez Votre D\u00e9monstration Personnalis\u00e9e")
    c.setFont("Helvetica", 10)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, y - 40, "Version d\u00e9mo compl\u00e8te accessible sur :")
    c.setFillColor(colors.HexColor("#60a5fa"))
    c.drawCentredString(W/2, y - 56, "https://dentoprestige.vercel.app/")
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(W/2, y - 72, "Identifiant : admin@dentoprestige.sn  |  Mot de passe : demo2026")

    # Contact footer
    c.setFillColor(GOLD)
    c.rect(0, 38, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 22, "DentoPrestige Africa \u2022 Le Standard de l\u2019Excellence pour le Praticien de Demain")
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.drawCentredString(W/2, 10, "Contactez-nous pour d\u00e9couvrir comment DentoPrestige peut transformer votre cabinet")

# ═══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════════════════════
def main():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("Brochure DentoPrestige")
    c.setAuthor("ProcessIngenierie")
    c.setSubject("Ecosysteme IA Gestion Cabinet Dentaire")
    c.setKeywords("DentoPrestige, dentaire, IA, OHADA, Afrique")

    for page_fn in [page1, page2, page3, page4, page5, page6]:
        page_fn(c)
        c.showPage()

    c.save()
    print(f"Created: {OUTPUT}")

if __name__ == "__main__":
    main()
