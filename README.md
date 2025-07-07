# Camunda 8 Self-Managed - Docker Compose

## Usage

For end user usage, please check the offical documentation of [Camunda 8 Self-Managed Docker Compose](https://docs.camunda.io/docs/next/self-managed/setup/deploy/local/docker-compose/).


## building on local - docker compose : Camunda8 setup:

```bash
cd camunda8-setup
```

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

To view your camunda dashboard :

```
http://localhost:8080/
```


step out of setup directrory


## camunda-8 using node APIs

Create a node project in root directory

```
mkdir camunda8-node-api && cd camunda8-node-api
npm init -y
npm install express zeebe-node multer
```

## Creating and running a process

create a process say example.bpmn

To deploy a process :

```bash
curl --location 'http://localhost:3000/deploy' --form 'bpmn=@"/C:/Users/pc/Desktop/camunda8/chatgpt-process.bpmn"'
```

Response :
```json
{
    "deployed": [
        {
            "bpmnProcessId": "chatgpt-process",
            "version": 2,
            "processDefinitionKey": "2251799813709193",
            "resourceName": "chatgpt-process.bpmn",
            "tenantId": "<default>"
        }
    ]
}
```


```bash
curl --location 'localhost:3000/start/chatgpt-process' --header 'Content-Type: application/json' \
--data '{
    "message" : "your message body"
}'

```

Response :
```json
{
    "instance": {
        "processDefinitionKey": "2251799813709193",
        "bpmnProcessId": "chatgpt-process",
        "version": 2,
        "processInstanceKey": "2251799813709627",
        "tenantId": "<default>"
    }
}
```