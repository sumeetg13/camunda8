# Camunda 8 Self-Managed - Docker Compose

## Usage

For end user usage, please check the offical documentation of [Camunda 8 Self-Managed Docker Compose](https://docs.camunda.io/docs/next/self-managed/setup/deploy/local/docker-compose/).


## building on local - docker compose:

Run the services : Zeebe, Operate, Tasklist, Connectors, Optimize, Identity, Elasticsearch, Keycloak, Web Modeler, and PostgreSQL

```bash
docker compose up -d
```

Run only the core services :  Zeebe, Tasklist, Operate, and Connectors

```bash
 docker compose -f docker-compose-core.yaml up -d
```

Run the web modeler : 

```bash
 docker compose -f docker-compose-web-modeler.yaml up -d                        
```