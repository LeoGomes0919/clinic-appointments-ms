# 🩺 Clinic Appointments Microservice

Este microserviço é responsável por gerenciar os **agendamentos de consultas** médicas dentro do sistema de clínicas. Ele faz parte de uma arquitetura baseada em microsserviços e comunica-se com o microserviço de gerenciamento de usuários para validar médicos e pacientes.
Para uma correta execução, é necessário que o microserviço de gerenciamento de usuários esteja em execução, pois ele fornece a validação necessária para os médicos e pacientes.

[Link para o Microsservice](https://github.com/LeoGomes0919/clinic-user-managment-ms)

Deve ser criado uma rede no Docker para que os dois microsserviços possam se comunicar.
```bash
docker network create clinic-network
```
Caso já tenha criado a rede, você pode verificar com o seguinte comando:
```bash
docker network ls
```

## Sumário
- [🩺 Clinic Appointments Microservice](#-clinic-appointments-microservice)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Arquitetura](#arquitetura)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Configuração](#instalação-e-configuração)
  - [Rodando o Ambiente com Docker](#rodando-o-ambiente-com-docker)
  - [Scripts Útis](#scripts-útis)
  - [Licença](#licença)

## Sobre o Projeto

O microserviço de agendamentos de consultas é uma parte fundamental do sistema de clínicas, permitindo que médicos e pacientes agendem, visualizem e gerenciem consultas. Ele se comunica com o microserviço de gerenciamento de usuários para garantir que apenas médicos e pacientes válidos possam realizar ações no sistema.

## Tecnologias Utilizadas

- **Node.js** e **TypeScript** para desenvolvimento do backend.
- **Fastify** microframework web focado em ser extremamente rápido, leve e eficiente para criar APIs e aplicações HTTP.
- **TypeORM** para persistência e gerenciamento de banco de dados PostgreSQL.
- **Docker** e **Docker Compose** para containerização.
- **tsyringe** para injeção de dependências.

## Arquitetura

O projeto adota o modelo arquitetural baseado em **Domain-Driven Design (DDD)** combinado com **Clean Architecture**.  
As camadas principais são:

- **Domínio:** Define as regras de negócio, entidades, objetos de valor e repositórios.
- **Aplicação:** Orquestra os casos de uso, utilizando comandos, operações, DTOs e app services.
- **Infraestrutura:** Implementa detalhes técnicos como conexão com banco de dados (PostgreSQL via TypeORM) e configurações.
- **Interfaces:** Expõe APIs REST via controllers, rotas e serializers.

Essa separação proporciona alta coesão e baixo acoplamento, facilitando a manutenção e evolução do sistema.

## Pré-requisitos
- Docker (para execução via containers)
- Clinic Users Managment Microservice (para validação de médicos e pacientes)

## Instalação e Configuração

1. **Clone o repositório**
   ```bash
   https://github.com/LeoGomes0919/clinic-appointments-ms.git
   cd clinic-appointments-ms
   ```

2. **Configure o ambiente**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   SERVER_PORT=3001
   SERVER_HOST=0.0.0.0
   BASE_URL=http://127.0.0.1:3001
   SCHEMA_VERSION=1.0.0
   DB_HOST=appointments-db
   DB_USER=admin
   DB_PASSWORD=p1c4d1nh0
   DB_PORT=5432
   DB_NAME=db-clinic-appointments-ms

   EXTERNAL_API_URL=http://clinic-user-managment-ms:3000
   PATIENT_SERVICE_URL=/api/patients
   DOCTOR_SERVICE_URL=/api/doctors

   # externals holydays api
   HOLIDAYS_API_URL=https://brasilapi.com.br/api/feriados/v1
   ```
## Rodando o Ambiente com Docker

Para rodar a aplicação utilizando **Docker** e **Docker Compose**, basta executar o seguinte comando:

```bash
npm run docker:dev
```

Esse comando utiliza o `docker-compose.yml` para levantar os containers da aplicação e do banco de dados PostgreSQL.
As migrations serão executadas automaticamente ao iniciar o container da aplicação.
Acesse a aplicação em `http://127.0.0.1:3001/api/docs`.

## Scripts Útis

No arquivo `package.json`, você encontrará os seguintes scripts principais:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "tsx watch src/index.ts",
  "build": "tsup src --out-dir dist",
  "typeorm": "tsx -r dotenv/config -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d ./src/infra/config/dataSource.ts",
  "migration:create": "npx typeorm migration:create",
  "migration:run": "npx typeorm migration:run",
  "migration:revert": "npx typeorm migration:revert",
  "docker:dev": "NODE_ENV=development COMPOSE_BAKE=true docker compose -f docker-compose.dev.yml up --build",
}
```

- **start:** Inicia o servidor em modo de produção.
- **dev:** Inicia o servidor em modo de desenvolvimento com hot reload.
- **docker:dev:** Sobe os containers da aplicação e banco de dados.
- **typeorm:** Interface para executar comandos do TypeORM (como migration:run).

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
