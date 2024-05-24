# Postgres deployment

This is a simple deployment of a Postgres database. It uses the official Postgres image from Docker Hub.

There are two variants of the deployment:

- docker-compose.yml: This is a simple deployment using Docker Compose. It creates a single Postgres container.
- k8s: This is a Kubernetes deployment. It creates a Postgres deployment with a single replica and a service (using the Taskfile).
