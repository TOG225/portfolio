# Portfolio 0xL@toure

Portfolio personnel full-stack présentant projets académiques, veille technique, certifications et compétences.

## Stack

| Couche | Technologie |
|---|---|
| Backend | Django 5 + Django REST Framework |
| Frontend | React 18 (Vite) + TailwindCSS |
| Base de données | PostgreSQL 16 |
| Conteneurisation | Docker Compose |

## Prérequis

- [Docker](https://www.docker.com/) et Docker Compose v2

## Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-repo>
cd portfolio

# 2. Copier le fichier d'environnement
cp .env.example .env
# Editer .env avec vos valeurs

# 3. Lancer l'infrastructure
docker compose up -d
```

## Commandes utiles

```bash
# Démarrer tous les services
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter les services
docker compose down

# Supprimer les volumes (reset BDD)
docker compose down -v
```

## Structure du projet

```
portfolio/
├── backend/          # Django 5 + DRF
├── frontend/         # React 18 + Vite + TailwindCSS
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Auteur

**Ghislain Touré** — 0xL@toure