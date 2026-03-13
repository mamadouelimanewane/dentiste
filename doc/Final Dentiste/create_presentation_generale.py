#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Presentation_Generale_DentoPrestige_Final.pdf - 9 pages
Modeled exactly after Presentation  Générale.pdf (LexPremium)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "Presentation_Generale_DentoPrestige_Final.pdf")
W, H = A4

DARK      = colors.HexColor("#0f172a")
GOLD      = colors.HexColor("#d4af37")
WHITE     = colors.white
LIGHT     = colors.HexColor("#f8fafc")
SLATE     = colors.HexColor("#334155")
NAVY      = colors.HexColor("#1e3a5f")
SLATE_LT  = colors.HexColor("#64748b")

def footer(c, pg, label=""):
    c.setFillColor(DARK)
    c.rect(0, 0, W, 28, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, 28, W, 2, stroke=0, fill=1)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(WHITE)
    c.drawString(18, 10, "DentoPrestige Africa  \u2022  Soignez mieux, g\u00e9rez moins")
    c.drawRightString(W - 18, 10, "mamadou.dia@processingenierie.com  |  +221 777 529 288")
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, 10, f"\u25c6  {pg}  \u25c6")

def cover_header(c, title, subtitle=""):
    c.setFillColor(DARK)
    c.rect(0, H - 130, W, 130, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 5, W, 5, stroke=0, fill=1)
    c.rect(0, H - 130, W, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H - 65, title)
    if subtitle:
        c.setFont("Helvetica", 12)
        c.setFillColor(WHITE)
        c.drawCentredString(W/2, H - 90, subtitle)

def section_header(c, number, title, y_top):
    """Draw a section divider."""
    c.setFillColor(NAVY)
    c.rect(0, y_top - 36, W, 36, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, y_top - 36, 6, 36, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(GOLD)
    c.drawString(20, y_top - 24, f"{number}.  {title}")
    return y_top - 60

def subsection(c, number, title, y):
    c.setFillColor(GOLD)
    c.rect(24, y - 2, 3, 18, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(DARK)
    c.drawString(32, y, f"{number}  {title}")
    return y - 28

def body_text(c, text, x, y, maxw=None, size=9.5, color=SLATE, lh=15):
    if maxw is None:
        maxw = W - x - 24
    c.setFont("Helvetica", size)
    c.setFillColor(color)
    words = text.split()
    line = ""
    for w in words:
        test = line + (" " if line else "") + w
        if c.stringWidth(test, "Helvetica", size) < maxw:
            line = test
        else:
            c.drawString(x, y, line)
            y -= lh
            line = w
    if line:
        c.drawString(x, y, line)
        y -= lh
    return y - 4

def bullet(c, text, y, x=32, size=9.5, color=SLATE, maxw=None):
    if maxw is None:
        maxw = W - x - 24
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GOLD)
    c.drawString(x, y, "\u25c6")
    c.setFont("Helvetica", size)
    c.setFillColor(color)
    words = text.split()
    line = ""
    x2 = x + 14
    first = True
    for w in words:
        test = line + (" " if line else "") + w
        if c.stringWidth(test, "Helvetica", size) < (maxw - 14):
            line = test
        else:
            c.drawString(x2, y, line)
            y -= 14
            line = w
    if line:
        c.drawString(x2, y, line)
        y -= 14
    return y - 4

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 1 — COVER
# ───────────────────────────────────────────────────────────────────────────────
def page1(c):
    c.setFillColor(DARK)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#d4af3712"))
    c.circle(W/2, H/2, 240, stroke=0, fill=1)
    c.circle(W - 60, H - 60, 100, stroke=0, fill=1)
    c.circle(60, 60, 80, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 5, W, 5, stroke=0, fill=1)

    c.setFont("Helvetica-Bold", 38)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, H - 100, "La Solution")

    c.setFont("Helvetica-Bold", 52)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H - 165, "DENTOPRESTIGE ERP")

    c.setFillColor(GOLD)
    c.rect(W/2 - 140, H - 178, 280, 3, stroke=0, fill=1)

    c.setFont("Helvetica", 14)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    c.drawCentredString(W/2, H - 210, "Pour le march\u00e9 dentaire africain et l\u2019espace OHADA")

    # Table of contents
    c.setFillColor(colors.HexColor("#1e293b"))
    c.roundRect(70, H/2 - 140, W - 140, 240, 12, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(70, H/2 + 96, W - 140, 3, stroke=0, fill=1)

    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, H/2 + 76, "Table des Mati\u00e8res")

    toc = [
        "1.  Pr\u00e9sentation G\u00e9n\u00e9rale de la Solution",
        "2.  Pertinence pour le March\u00e9 S\u00e9n\u00e9galais et Sous-R\u00e9gional",
        "3.  Coh\u00e9rence et Architecture",
        "4.  Analyse Concurrentielle et Opportunit\u00e9s de March\u00e9",
        "5.  S\u00e9curit\u00e9 et Conformit\u00e9",
    ]
    ty = H/2 + 48
    for item in toc:
        c.setFont("Helvetica", 11)
        c.setFillColor(WHITE)
        c.drawString(100, ty, item)
        c.setFillColor(GOLD)
        c.rect(100, ty - 6, W - 200, 0.5, stroke=0, fill=1)
        ty -= 28

    footer(c, 1)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 2 — Section 1: Présentation Générale
# ───────────────────────────────────────────────────────────────────────────────
def page2(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    footer(c, 2)

    y = section_header(c, "1", "Pr\u00e9sentation G\u00e9n\u00e9rale de la Solution", H - 10)

    intro = ("DentoPrestige ERP repr\u00e9sente une plateforme SaaS compl\u00e8te d\u00e9di\u00e9e \u00e0 la "
             "gestion des cabinets dentaires, sp\u00e9cialement con\u00e7ue pour l\u2019Afrique francophone "
             "et l\u2019espace OHADA. Cette solution se positionne comme un outil int\u00e9gr\u00e9 "
             "r\u00e9pondant aux besoins sp\u00e9cifiques des chirurgiens-dentistes dans un contexte "
             "africain en pleine mutation digitale.")
    y = body_text(c, intro, 24, y, lh=16)
    y -= 12

    y = subsection(c, "1.1.", "Fonctionnalit\u00e9s Classiques", y)
    class_text = ("La plateforme int\u00e8gre l\u2019ensemble des fonctionnalit\u00e9s classiques d\u2019un "
                  "ERP m\u00e9dical moderne. Elle propose une gestion compl\u00e8te des dossiers patients "
                  "permettant un suivi rigoureux de chaque affaire clinique, un syst\u00e8me d\u2019agenda "
                  "intelligent pour la planification des consultations et actes techniques, un module de "
                  "facturation adapt\u00e9 aux pratiques locales, ainsi qu\u2019une gestion \u00e9lectronique "
                  "de documents (GED) facilitant l\u2019archivage et la recherche d\u2019informations.")
    y = body_text(c, class_text, 24, y, lh=15)
    y -= 12

    y = subsection(c, "1.2.", "Innovations Technologiques", y)
    innov_text = ("Au-del\u00e0 des fonctionnalit\u00e9s traditionnelles, DentoPrestige se distingue par "
                  "l\u2019int\u00e9gration de technologies de pointe adapt\u00e9es au contexte africain. "
                  "Le syst\u00e8me int\u00e8gre des capacit\u00e9s d\u2019intelligence artificielle avanc\u00e9es "
                  "\u00e0 travers plusieurs modules : DentoAI pour l\u2019assistance clinique automatis\u00e9e, "
                  "un scanner radiologique capable d\u2019analyser les pathologies, une IA pr\u00e9dictive "
                  "\u00e9valuant les plans de traitement, et un g\u00e9n\u00e9rateur automatique de protocoles.")
    y = body_text(c, innov_text, 24, y, lh=15)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 3 — Section 1 (suite) + intro Section 2
# ───────────────────────────────────────────────────────────────────────────────
def page3(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.rect(0, H - 30, W, 30, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 30, 6, 30, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(GOLD)
    c.drawString(20, H - 18, "Adaptations Locales & Pertinence March\u00e9")
    footer(c, 3)

    y = H - 60

    y = subsection(c, "1.3.", "Adaptations Locales Strat\u00e9giques", y)
    local_text = ("La solution d\u00e9montre une compr\u00e9hension approfondie des sp\u00e9cificit\u00e9s "
                  "r\u00e9gionales en assurant une conformit\u00e9 totale aux normes SYSCOHADA et aux "
                  "r\u00e9glementations sanitaires de l\u2019espace UEMOA. L\u2019int\u00e9gration native "
                  "des moyens de paiement mobiles dominants, notamment Wave et Orange Money, refl\u00e8te "
                  "les habitudes de paiement r\u00e9elles du march\u00e9 s\u00e9n\u00e9galais. Un syst\u00e8me "
                  "de communication unifi\u00e9e combine WhatsApp, SMS et email, reconnaissant les canaux "
                  "de communication privil\u00e9gi\u00e9s par les patients africains.")
    y = body_text(c, local_text, 24, y, lh=15)
    y -= 20

    y = section_header(c, "2", "Pertinence pour le March\u00e9 S\u00e9n\u00e9galais et Sous-R\u00e9gional", y + 50)
    y -= 10

    y = subsection(c, "2.1.", "Contexte de Transformation Digitale", y)
    context_text = ("Le S\u00e9n\u00e9gal et l\u2019ensemble de la zone OHADA, qui regroupe 17 pays "
                    "d\u2019Afrique francophone, connaissent actuellement une acc\u00e9l\u00e9ration "
                    "remarquable de la digitalisation des professions m\u00e9dicales. Cette transformation "
                    "n\u2019est pas simplement technologique, mais r\u00e9pond \u00e0 des besoins "
                    "op\u00e9rationnels concrets et urgents des cabinets dentaires.")
    y = body_text(c, context_text, 24, y, lh=15)
    y -= 10

    constraints_title = "Les contraintes locales cr\u00e9ent une demande croissante pour des outils sp\u00e9cifiquement adapt\u00e9s"
    c.setFont("Helvetica-BoldOblique", 9.5)
    c.setFillColor(DARK)
    y = body_text(c, constraints_title, 24, y, lh=14, color=DARK)
    y -= 6

    bullets = [
        "La conformit\u00e9 aux normes OHADA et SYSCOHADA constitue une exigence l\u00e9gale fondamentale",
        "La gestion rigoureuse des feuilles de soins n\u00e9cessite des syst\u00e8mes de tra\u00e7abilit\u00e9 irr\u00e9prochables",
        "Le traitement du recouvrement massif face aux impay\u00e9s fr\u00e9quents est un d\u00e9fi quotidien",
        "L\u2019int\u00e9gration des solutions de paiement mobile, qui dominent largement les transactions, est incontournable",
    ]
    for b in bullets:
        y = bullet(c, b, y)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 4 — Section 2 (suite)
# ───────────────────────────────────────────────────────────────────────────────
def page4(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.rect(0, H - 30, W, 30, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 30, 6, 30, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(GOLD)
    c.drawString(20, H - 18, "Besoins Op\u00e9rationnels & Avantage Concurrentiel IA")
    footer(c, 4)

    y = H - 58

    y = subsection(c, "2.2.", "Besoins Op\u00e9rationnels des Dentistes S\u00e9n\u00e9galais", y)
    op_text = ("Les chirurgiens-dentistes au S\u00e9n\u00e9gal font face \u00e0 des volumes importants "
               "et croissants de patients couvrant les pathologies simples, les soins conservateurs "
               "et la chirurgie. Ces actes s\u2019accompagnent de d\u00e9lais de suivi stricts impos\u00e9s "
               "par les protocoles cliniques, ne laissant aucune marge d\u2019erreur dans la gestion "
               "du temps et des ordonnances.")
    y = body_text(c, op_text, 24, y, lh=15)
    y -= 8

    op_bullets = [
        "Un agenda cod\u00e9 par couleur facilite la visualisation imm\u00e9diate des types de soins",
        "Le scanner radiologique IA permet d\u2019analyser rapidement les pathologies",
        "La recherche clinique sp\u00e9cialis\u00e9e dans les protocoles CCAM acc\u00e9l\u00e8re la pr\u00e9paration",
        "Un portail patient extranet assure une communication transparente et continue",
    ]
    for b in op_bullets:
        y = bullet(c, b, y)
    y -= 14

    y = subsection(c, "2.3.", "Avantage Concurrentiel de l\u2019Intelligence Artificielle", y)
    ia_text = ("L\u2019int\u00e9gration de l\u2019intelligence artificielle constitue un diff\u00e9renciateur "
               "majeur sur ce march\u00e9 encore largement domin\u00e9 par des pratiques manuelles. "
               "Les fonctionnalit\u00e9s de r\u00e9sum\u00e9s automatiques des dossiers permettent un gain "
               "de temps consid\u00e9rable pour les praticiens. La d\u00e9tection automatis\u00e9e de "
               "pathologies dans les radiographies offre une s\u00e9curit\u00e9 diagnostique accrue. "
               "Le calcul des plans de traitement, bas\u00e9 sur l\u2019historique patient et les "
               "protocoles cliniques, aide \u00e0 la prise de d\u00e9cision strat\u00e9gique.")
    y = body_text(c, ia_text, 24, y, lh=15)
    y -= 14

    y = subsection(c, "2.4.", "Positionnement Tarifaire Adapt\u00e9", y)
    tarif_text = ("Le positionnement tarifaire adopt\u00e9, ciblant les \u00abcabinets d\u2019\u00e9lite\u00bb, "
                  "s\u2019av\u00e8re judicieusement calibr\u00e9 pour le march\u00e9 africain. Cette tarification "
                  "reste accessible pour les cabinets moyens \u00e0 grands de Dakar, qui disposent des "
                  "ressources n\u00e9cessaires pour investir dans la digitalisation et peuvent rapidement "
                  "rentabiliser cet investissement par les gains de productivit\u00e9 g\u00e9n\u00e9r\u00e9s. "
                  "Le potentiel d\u2019expansion significatif \u00e0 l\u2019\u00e9chelle sous-r\u00e9gionale "
                  "vers Abidjan, Cotonou, Lom\u00e9 et Libreville est substantiel.")
    y = body_text(c, tarif_text, 24, y, lh=15)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 5 — Section 3: Cohérence et Architecture
# ───────────────────────────────────────────────────────────────────────────────
def page5(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    footer(c, 5)

    y = section_header(c, "3", "Coh\u00e9rence et Architecture", H - 10)

    y = subsection(c, "3.1.", "Structure Logique et Progressive", y)
    struct_text = ("DentoPrestige pr\u00e9sente une coh\u00e9rence remarquable dans son architecture globale, "
                   "refl\u00e9tant une compr\u00e9hension approfondie des flux de travail d\u2019un cabinet "
                   "dentaire. La progression suit une logique naturelle et intuitive qui facilite "
                   "l\u2019adoption par les utilisateurs.")
    y = body_text(c, struct_text, 24, y, lh=15)
    y -= 8

    # Architecture flow
    flow = [
        ("Pilotage Global",        "Tableau de bord 360\u00b0, KPIs, alertes en temps r\u00e9el"),
        ("C\u0153ur de M\u00e9tier", "Dossiers patients, odontogramme, agenda partag\u00e9, suivi clinique"),
        ("Back-office",            "Facturation automatis\u00e9e, recouvrement, comptabilit\u00e9 SYSCOHADA"),
        ("Intelligence IA",        "DentoAI, scanner radio, g\u00e9n\u00e9rateur de protocoles, IA pr\u00e9dictive"),
        ("Outils Support",         "CRM patient, GED, gestion du stock, st\u00e9rilisation"),
    ]
    for i, (stage, desc) in enumerate(flow):
        fy = y - i * 50
        c.setFillColor(DARK if i % 2 == 0 else NAVY)
        c.roundRect(24, fy - 38, W - 48, 38, 6, stroke=0, fill=1)
        c.setFillColor(GOLD)
        c.rect(24, fy - 38, 5, 38, stroke=0, fill=1)
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(GOLD)
        c.drawString(36, fy - 16, f"\u25b6  {stage}")
        c.setFont("Helvetica", 9)
        c.setFillColor(colors.HexColor("#cbd5e1"))
        c.drawString(36, fy - 30, desc)
    y -= len(flow) * 50 + 16

    y = subsection(c, "3.2.", "Langage M\u00e9tier et Adaptation Culturelle", y)
    lang_text = ("Le langage utilis\u00e9 permet une ma\u00eetrise pr\u00e9cise du vocabulaire clinique "
                 "dentaire et s\u2019adresse directement au public cible : les chirurgiens-dentistes "
                 "exer\u00e7ant dans l\u2019espace OHADA. Les r\u00e9f\u00e9rences aux codes CCAM, "
                 "aux normes sanitaires UEMOA, aux solutions de paiement Wave et Orange Money, ainsi "
                 "qu\u2019aux exigences r\u00e9glementaires africaines, t\u00e9moignent de cette ma\u00eetrise "
                 "du contexte local.")
    y = body_text(c, lang_text, 24, y, lh=15)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 6 — Section 3 (suite)
# ───────────────────────────────────────────────────────────────────────────────
def page6(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.rect(0, H - 30, W, 30, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 30, 6, 30, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(GOLD)
    c.drawString(20, H - 18, "Couverture Fonctionnelle Exhaustive")
    footer(c, 6)

    y = H - 58

    y = subsection(c, "3.3.", "Couverture Fonctionnelle Exhaustive", y)
    cov_text = ("La couverture fonctionnelle propos\u00e9e par les 36 modules s\u2019av\u00e8re "
                "particuli\u00e8rement exhaustive. L\u2019analyse comparative r\u00e9v\u00e8le que "
                "DentoPrestige r\u00e9pond \u00e0 plus de 95\u0025 des besoins r\u00e9els d\u2019un "
                "cabinet dentaire op\u00e9rant dans l\u2019espace OHADA. Cette couverture surpasse "
                "significativement celle de nombreux ERP occidentaux r\u00e9put\u00e9s, qui ne sont "
                "pas adapt\u00e9s aux sp\u00e9cificit\u00e9s africaines.")
    y = body_text(c, cov_text, 24, y, lh=15)
    y -= 16

    # Module grid
    modules_cat = [
        ("Clinique",       ["Odontogramme", "Charting paro", "Prescriptions", "Imagerie CBCT", "Chirurgie"]),
        ("Administration", ["Agenda", "Patients", "T\u00e2ches", "Workflow", "Staf\u00f8ing"]),
        ("Financier",      ["Facturation", "Comptabilit\u00e9", "Devis", "Paiements", "War Room"]),
        ("IA & Tech",      ["DentoAI", "Scanner radio", "Dict\u00e9e vocale", "T\u00e9l\u00e9consultation", "GED"]),
    ]
    cw = (W - 48 - 3 * 10) / 4
    for i, (cat, mods) in enumerate(modules_cat):
        xi = 24 + i * (cw + 10)
        ch = 30 + len(mods) * 18
        c.setFillColor(DARK)
        c.roundRect(xi, y - ch, cw, ch, 6, stroke=0, fill=1)
        c.setFillColor(GOLD)
        c.rect(xi, y - 3, cw, 3, stroke=0, fill=1)
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(GOLD)
        c.drawCentredString(xi + cw/2, y - 18, cat)
        for j, mod in enumerate(mods):
            c.setFont("Helvetica", 8)
            c.setFillColor(colors.HexColor("#cbd5e1"))
            c.drawString(xi + 8, y - 30 - j * 16, "\u2022 " + mod)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 7 — Section 4: Analyse Concurrentielle
# ───────────────────────────────────────────────────────────────────────────────
def page7(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    footer(c, 7)

    y = section_header(c, "4", "Analyse Concurrentielle et Opportunit\u00e9s de March\u00e9", H - 10)

    y = subsection(c, "4.1.", "\u00c9tat du March\u00e9 Healthtech en Afrique Francophone", y)
    market_text = ("Le march\u00e9 de la healthtech dentaire en Afrique francophone se trouve actuellement "
                   "dans une phase de d\u00e9veloppement pr\u00e9coce mais dynamique. Bien que naissant, "
                   "ce march\u00e9 conna\u00eet une croissance forte port\u00e9e par la digitalisation "
                   "acc\u00e9l\u00e9r\u00e9e des services m\u00e9dicaux et l\u2019\u00e9mergence d\u2019une "
                   "nouvelle g\u00e9n\u00e9ration de praticiens form\u00e9s aux outils num\u00e9riques.")
    y = body_text(c, market_text, 24, y, lh=15)
    y -= 14

    y = subsection(c, "4.2.", "Les Forces de DentoPrestige", y)

    forces = [
        ("4.2.1.", "Int\u00e9gration Native OHADA/SYSCOHADA",
         "L\u2019int\u00e9gration native des normes OHADA et SYSCOHADA constitue un avantage concurrentiel "
         "d\u00e9cisif. Cette conformit\u00e9 ne s\u2019ajoute pas comme une couche superficielle, mais "
         "structure l\u2019architecture m\u00eame du syst\u00e8me."),
        ("4.2.2.", "Intelligence Artificielle Avanc\u00e9e",
         "Le focus sur l\u2019IA avanc\u00e9e, avec le scanner radiologique, l\u2019IA pr\u00e9dictive "
         "et la g\u00e9n\u00e9ration automatis\u00e9e de protocoles, demeure une premi\u00e8re "
         "en Afrique francophone pour les cabinets dentaires."),
        ("4.2.3.", "Adaptation aux Usages Locaux",
         "L\u2019int\u00e9gration de Wave, Orange Money, WhatsApp et SMS r\u00e9pond parfaitement "
         "aux usages r\u00e9els du S\u00e9n\u00e9gal et de la sous-r\u00e9gion."),
        ("4.2.4.", "R\u00e9solution des Points de Douleur Critiques",
         "Le portail patient combin\u00e9 au syst\u00e8me de recouvrement automatis\u00e9 adresse "
         "directement les deux points de douleur majeurs des cabinets africains."),
    ]
    for num, title, body in forces:
        c.setFont("Helvetica-Bold", 9.5)
        c.setFillColor(DARK)
        c.drawString(24, y, f"{num}  {title}")
        y -= 16
        y = body_text(c, body, 32, y, lh=14)
        y -= 6

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 8 — Section 4 suite + début Section 5
# ───────────────────────────────────────────────────────────────────────────────
def page8(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.rect(0, H - 30, W, 30, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 30, 6, 30, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(GOLD)
    c.drawString(20, H - 18, "Opportunit\u00e9 Globale & S\u00e9curit\u00e9 des Donn\u00e9es")
    footer(c, 8)

    y = H - 58

    y = subsection(c, "4.4.", "Opportunit\u00e9 Globale", y)
    opp_text = ("Malgr\u00e9 les d\u00e9fis identifi\u00e9s, l\u2019opportunit\u00e9 demeure forte et "
                "prometteuse. Le S\u00e9n\u00e9gal se positionne strat\u00e9giquement comme un hub de "
                "la healthtech francophone, port\u00e9 par le dynamisme entrepreneurial de Dakar, "
                "l\u2019existence d\u2019un \u00e9cosyst\u00e8me tech en d\u00e9veloppement, et la "
                "pr\u00e9sence d\u2019institutions sanitaires et financi\u00e8res r\u00e9gionales importantes.")
    y = body_text(c, opp_text, 24, y, lh=15)
    y -= 8

    opp_bullets = [
        "La digitalisation de la sant\u00e9 s\u2019acc\u00e9l\u00e8re avec des projets d\u2019e-sant\u00e9 au S\u00e9n\u00e9gal",
        "L\u2019essor de l\u2019IA g\u00e9n\u00e9rative d\u00e9mocratise l\u2019acc\u00e8s \u00e0 des technologies r\u00e9serv\u00e9es",
        "Les besoins accrus de t\u00e9l\u00e9consultation et de gestion d\u00e9mat\u00e9rialis\u00e9e post-COVID",
        "Potentiel d\u2019expansion vers l\u2019UEMOA et l\u2019ensemble de l\u2019espace OHADA",
    ]
    for b in opp_bullets:
        y = bullet(c, b, y)
    y -= 20

    y = section_header(c, "5", "S\u00e9curit\u00e9 et Conformit\u00e9", y + 40)
    y -= 10

    y = subsection(c, "5.1.1.", "Chiffrement et Protection des Donn\u00e9es", y)
    sec_text = ("La s\u00e9curit\u00e9 et la conformit\u00e9 constituent une priorit\u00e9 absolue pour "
                "un syst\u00e8me manipulant des donn\u00e9es m\u00e9dicales et financi\u00e8res hautement "
                "sensibles. Chiffrement au repos utilisant AES-256 pour toutes les donn\u00e9es stock\u00e9es "
                "et chiffrement en transit avec TLS 1.3 pour toutes les communications.")
    y = body_text(c, sec_text, 24, y, lh=15)
    y -= 12

    y = subsection(c, "5.1.2.", "Authentification et Contr\u00f4le d\u2019Acc\u00e8s", y)
    auth_text = ("L\u2019authentification repose sur les standards OAuth2, permettant une int\u00e9gration "
                 "avec des syst\u00e8mes d\u2019identit\u00e9 tiers. L\u2019authentification multi-facteurs "
                 "est recommand\u00e9e pour tous les utilisateurs. Un syst\u00e8me RBAC finement d\u00e9fini "
                 "g\u00e8re les permissions : propri\u00e9taire, dentistes, assistants, secr\u00e9taires, "
                 "comptables et patients VIP.")
    y = body_text(c, auth_text, 24, y, lh=15)

# ───────────────────────────────────────────────────────────────────────────────
# PAGE 9 — Section 5 (suite) + Conclusion
# ───────────────────────────────────────────────────────────────────────────────
def page9(c):
    c.setFillColor(LIGHT)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.rect(0, H - 30, W, 30, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(0, H - 30, 6, 30, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(GOLD)
    c.drawString(20, H - 18, "Tra\u00e7abilit\u00e9, Performance & Conclusion")
    footer(c, 9)

    y = H - 58

    y = subsection(c, "5.1.3.", "Tra\u00e7abilit\u00e9 et Audit", y)
    audit_text = ("Des logs d\u2019audit immuables garantissent la tra\u00e7abilit\u00e9 compl\u00e8te "
                  "n\u00e9cessaire pour la gestion du secret m\u00e9dical, la validation des consentements "
                  "\u00e9clair\u00e9s et le suivi rigoureux des actes cliniques. Ces logs enregistrent "
                  "toutes les actions sensibles : acc\u00e8s aux dossiers, modifications de plans de "
                  "traitement, consultations de documents confidentiels.")
    y = body_text(c, audit_text, 24, y, lh=15)
    y -= 12

    y = subsection(c, "5.2.", "Scalabilit\u00e9 et Performance", y)
    scale_text = ("Une base de donn\u00e9es MongoDB Atlas constitue une fondation solide, reconnue pour "
                  "sa fiabilit\u00e9 et sa flexibilit\u00e9 pour les donn\u00e9es m\u00e9dicales complexes. "
                  "Redis sert de couche de cache am\u00e9liorant significativement les temps de r\u00e9ponse "
                  "pour les op\u00e9rations fr\u00e9quentes. Dans une architecture multi-cabinet stricte, "
                  "l\u2019isolation compl\u00e8te des donn\u00e9es entre clients est garantie.")
    y = body_text(c, scale_text, 24, y, lh=15)
    y -= 20

    # Conclusion box
    c.setFillColor(DARK)
    c.roundRect(24, y - 160, W - 48, 155, 10, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.rect(24, y - 8, W - 48, 3, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, y - 30, "DentoPrestige Africa")
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, y - 50, "Soignez mieux, g\u00e9rez moins")
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    conclude = ("Une solution SaaS compl\u00e8te et innovante, sp\u00e9cialement con\u00e7ue pour "
                "les cabinets dentaires africains.")
    body_text(c, conclude, 40, y - 70, maxw=W - 80, color=colors.HexColor("#cbd5e1"), lh=14)
    c.setFont("Helvetica", 9)
    c.setFillColor(GOLD)
    c.drawCentredString(W/2, y - 110, "mamadou.dia@processingenierie.com  |  +221 777 529 288")
    c.setFillColor(WHITE)
    c.drawCentredString(W/2, y - 126, "https://dentoprestige.vercel.app/")
    c.drawCentredString(W/2, y - 142, "Identifiant : admin@dentoprestige.sn  |  Mot de passe : demo2026")

def main():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("Presentation Generale DentoPrestige ERP")
    c.setAuthor("ProcessIngenierie")
    c.setSubject("Solution ERP Cabinet Dentaire Afrique OHADA")

    for fn in [page1, page2, page3, page4, page5, page6, page7, page8, page9]:
        fn(c)
        c.showPage()

    c.save()
    print(f"Created: {OUTPUT}")

if __name__ == "__main__":
    main()
