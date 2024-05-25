# Postgres deployment

This is a simple deployment of a Postgres database. There are two variants of the deployment:

- docker-compose.yml: This is a simple deployment using Docker Compose. It creates a single Postgres container.
- k8s: This is a Kubernetes deployment. It creates a Postgres deployment with a single replica and a service (using the Taskfile).

## Prerequisites

Taskfile must be installed. See [Taskfile](https://taskfile.dev/#/installation) for installation instructions.

## Usage

To deploy the Postgres database, run the following command:

```bash
task deploy
```

In order to connect to the database, you can use the following command to port-forward the database to your local machine:

```bash
task port-forward
```

If you need to get the password for the database, you can run the following command:

```bash
task get-pass
```
