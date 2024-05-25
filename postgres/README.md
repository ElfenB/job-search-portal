# Postgres deployment

This is a simple deployment of a Postgres database.

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
