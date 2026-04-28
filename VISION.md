# Portfolio Ghislain Touré — Vision du projet

## Stack technique
- Backend : Django 5 + Django REST Framework
- Frontend : React 18 (Vite) + TailwindCSS
- Base de données : PostgreSQL 16
- Conteneurisation : Docker Compose

## Sections du site
1. Hero (nom, titre, photo, CTA)
2. À propos (bio + stats)
3. Projets (académiques par matière + personnels)
4. Blog & veille (articles avec filtres)
5. Compétences (tags par catégorie)
6. Certifications (grille avec logos)
7. Contact

## Modèles de données
- Project (titre, description, catégorie, stack, github_url, report_pdf, type=academique/perso, matiere)
- Article (titre, contenu Markdown, catégorie, date_pub, durée_lecture)
- Certification (nom, organisme, logo, lien_credly, date)
- Skill (nom, catégorie)

## API REST attendue
- GET /api/projects/?type=academique&matiere=SOC
- GET /api/projects/<id>/
- GET /api/articles/?category=pentest
- GET /api/certifications/
- GET /api/skills/

## Style visuel
Pro & sobre — palette : #1F3864 (bleu marine) + #2E75B6 (bleu accent) + blanc

## Déploiement cible
- Frontend : Vercel (gratuit)
- Backend : Railway ou Render (gratuit)
- Base de données : Supabase ou Neon (PostgreSQL gratuit)
