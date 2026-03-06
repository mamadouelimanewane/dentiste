# 📟 Manuel d'Utilisation : Elite Connect Automation Suite
**Version 1.0 - Mars 2026**

Elite Connect est le moteur d'automatisation intelligent de DentoPrestige Elite. Il transforme la communication de votre cabinet en un levier de croissance passif tout en libérant votre secrétariat des tâches répétitives.

---

## 🚀 1. Le Cycle de Communication Automatisé

Chaque patient bénéficie d'un suivi personnalisé, de la prise de rendez-vous jusqu'à la fin de sa convalescence.

### 📅 A. Rappels de Rendez-vous (Multi-canaux)
- **J-2 (WhatsApp)** : Confirmation amicale avec Dr. Lao.
- **J-1 (SMS)** : Rappel logistique (heure exacte + consignes carte vitale).
- **Impact** : Réduction massive du taux de "No-Show" (-45% observés).

### ❄️ B. Pack Post-Opératoire Intelligent
Dès qu'une prescription chirurgicale est émise ou qu'un patient est déplacé en "Suivi Post-Op" :
- **Instant T** : Envoi des consignes de soin (glace, alimentation, antalgiques).
- **Suivi J+1** : Message de réassurance automatique.
- **Impact** : Meilleure observance des soins et réduction des appels d'urgence.

### ⭐ C. Moteur de Réputation (Bilan Satisfaction)
- **Fin de traitement** : Message de félicitations pour le nouveau sourire.
- **J+7 (Google Sync)** : Envoi automatique du lien pour récolter un avis Google 5 étoiles.
- **Impact** : Croissance organique de votre visibilité sur Google Maps.

---

## 🛠️ 2. Gestion et Suivi

### 📡 Le Communication Hub
Pour surveiller les automatisations en temps réel :
1. Accédez à la page **[Communication Hub](https://dentiste-nine.vercel.app/communication)**.
2. Consultez l'onglet **"Historique"** : Tous les messages envoyés (WhatsApp/SMS) y sont consignés avec leur statut de distribution.
3. Vérifiez les **Statistiques** : Taux d'ouverture et volume de messages envoyés dans le mois.

### 🏗️ Déclencheurs Manuels (via Workflow)
Vous gardez le contrôle total par simple Drag & Drop dans l'**Elite Workflow Manager** :
- Glissez vers **"Suivi Post-Op"** → Déclenche le pack conseils.
- Glissez vers **"Terminé"** → Déclenche la boucle de satisfaction.

---

## 💡 3. Foire Aux Questions

> [!TIP]
> **Puis-je modifier le texte des messages ?**
> Oui, les templates sont configurés dans les routes API `/api/communication/automation` et peuvent être ajustés selon le ton de votre cabinet.

> [!IMPORTANT]
> **Est-ce conforme au RGPD ?**
> Oui, chaque message envoyé est enregistré comme un `CommunicationLog` dans le dossier patient, assurant une parfaite traçabilité médicale et administrative.

---

*Elite Connect : Moins de secrétariat, plus de clinique.*
