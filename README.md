
# job-search-portal (Jobber)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

This project is a job search portal that allows users to search for jobs and apply for them.

The generic name *job-search-portal* was the initial project name. During development, the more brand-ready name *Jobber* was born.

## Demo

Deployment should be available at: [Jobber](https://jobber.benelfen.com)

## Tech Stack

**Client:** Ionic, React, Auth0

**Server:** TRPC, Prisma, PostgreSQL

**Deployment:** Docker, Compose

## Run Locally

Clone the project

```bash
git clone https://github.com/ElfenB/job-search-portal.git
```

Go to the project directory

```bash
cd job-search-portal
```

Make sure, environment variables are specified

```bash
cp .env.example .env
  # Edit as required
```

Setup database if required

```bash
# Deploy database to K8s cluster (e.g. with Docker Desktop or Minikube)
task -d postgres deploy

# Get Postgres password
task -d posgres get-pass

# Tunnel database
task -d postgres port-forward
```

Start the server (dependencies should be automatically installed by predev script)

```bash
# Frontend
npm run dev

# Migrate database
npm run db:migrate-dev

# Backend
npm run dev:server
```

## Deployment

To deploy this project run

```bash
docker compose up -d --build
```

## Authors

- [@ElfenB](https://www.github.com/ElfenB)

## Acknowledgements

This README was generated using [readme.so](https://readme.so/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
