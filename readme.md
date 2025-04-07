```md
# 🐳 Projeto Full Stack com Docker

Este projeto é composto por:

- ⚛️ **Frontend**: React + Vite (porta `5173`)
- 🚀 **Backend**: Node.js (porta `3000`)
- 🐘 **Banco de Dados**: PostgreSQL (porta `5432`)

---

## 📁 Estrutura de Pastas

```
.
├── docker-compose.yml
├── lumi.client/       # Frontend (React + Vite)
│   └── .env
├── lumi.server/       # Backend (Node.js)
│   └── .env
└── readme.md
```

---

## ⚙️ Pré-requisitos

Certifique-se de que os seguintes itens estejam instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 📦 Variáveis de Ambiente

### 🔐 Backend (`lumi.server/.env`)

```env
NODE_ENV=development
PORT=3000
DB_USER=postgres
DB_PASSWORD=147258
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lumi.db
```

### 🌐 Frontend (`lumi.client/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Como rodar o projeto localmente (via Docker)

### 1. Clone o repositório

```bash
git clone git@github.com:IvoPenha/lumi.git
cd lumi
```

### 2. Renomeie o arquivo de compose (se necessário)

Certifique-se de que o arquivo se chama exatamente:

```bash
docker-compose.yml
```

Se estiver com outro nome (ex: `docker.compose.yml`), renomeie com:

```bash
mv docker.compose.yml docker-compose.yml
```

### 3. Suba os containers

```bash
docker compose up --build -d
```

Esse comando irá:
- Fazer o build das imagens do frontend e backend.
- Iniciar todos os serviços (frontend, backend e banco de dados).
- Rodar os serviços em segundo plano.

---

Perfeito! Aqui está a seção `### 4. Tabelas no banco` já integrada ao seu README, com tudo formatado certinho:

---

### 4. 🗄️ Tabelas no Banco

Você pode criar as tabelas necessárias de duas formas:

- Usando **migrations do TypeORM**  (npx typeorm migration:run)
- Ou rodando diretamente os comandos SQL abaixo no seu PostgreSQL:

```sql
CREATE TABLE public.clients (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	client_number varchar(20) NOT NULL,
	"document" varchar(20) NULL,
	address varchar(255) NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	deleted_at timestamp NULL,
	CONSTRAINT clients_client_number_key UNIQUE (client_number),
	CONSTRAINT clients_pkey PRIMARY KEY (id)
);

CREATE TABLE public.installations (
	id serial4 NOT NULL,
	installation_number varchar(20) NOT NULL,
	client_id int4 NULL,
	"label" varchar(20) NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	deleted_at timestamp NULL,
	CONSTRAINT installations_installation_number_key UNIQUE (installation_number),
	CONSTRAINT installations_pkey PRIMARY KEY (id),
	CONSTRAINT installations_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);

CREATE TABLE public.bill (
	id serial4 NOT NULL,
	reference_month timestamp NULL,
	billing_date timestamp NULL,
	energy_consumption_kwh numeric(10, 4) DEFAULT NULL,
	energy_cost numeric(10, 4) DEFAULT NULL,
	sceee_energy_cost numeric(10, 4) DEFAULT NULL,
	compensated_energy_kwh numeric(10, 4) DEFAULT NULL,
	compensated_energy_cost numeric(10, 4) DEFAULT NULL,
	public_lighting_contribution numeric(10, 4) DEFAULT NULL,
	total_without_compensation numeric(10, 4) DEFAULT NULL,
	economy_with_compensation numeric(10, 4) DEFAULT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	deleted_at timestamp NULL,
	installation_id int4 NOT NULL,
	total numeric(10, 2) NULL,
	CONSTRAINT bill_pkey PRIMARY KEY (id),
	CONSTRAINT bill_installation_id_fkey FOREIGN KEY (installation_id) REFERENCES public.installations(id)
);
```

> **Dica:** você pode executar esses comandos com uma ferramenta como DBeaver, TablePlus ou diretamente via terminal com `psql`.

--- 

## 🧪 Testando

Acesse no navegador:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend (API): [http://localhost:3000](http://localhost:3000)

---

## 🐘 Acessando o Banco de Dados PostgreSQL

Você pode acessar o banco diretamente via DBeaver, TablePlus ou terminal:

```bash
Host: localhost
Port: 5432
User: postgres
Password: 147258
Database: lumi.db
```

---

## 🧹 Parar os containers

```bash
docker compose down
```

Se quiser remover os volumes e containers completamente:

```bash
docker compose down -v
```
  
Feito com 💻 por [@IvoPenha](https://github.com/IvoPenha) 