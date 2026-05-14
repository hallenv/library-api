# 📚 Library API

Uma API desenvolvida em Node.js com Express para ensinar conceitos essenciais e boas práticas de desenvolvimento de APIs. Criada para o curso de Desenvolvimento Web Backend na UFRN, ministrado pelo Professor Diego Rodrigo.

## 📦 Pré-requisitos

- **Node.js** v16 ou superior
- **npm** ou **yarn**

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/hallenv/library-api.git
cd library-api
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Como Usar

### Iniciar o servidor em desenvolvimento:
```bash
npm run dev
```

### Iniciar o servidor em produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` (ou a porta configurada).

## 📁 Estrutura do Projeto

```
src/
├── controllers/          # Controladores (lógica de requisição/resposta)
│   ├── author.controller.js
│   └── book.controller.js
├── services/            # Camada de negócio
│   ├── author.service.js
│   └── book.service.js
├── repositories/        # Camada de acesso a dados
│   ├── author.repo.js
│   └── book.repo.js
├── routes/              # Definição de rotas
│   ├── author.routes.js
│   └── book.routes.js
├── dtos/                # Data Transfer Objects (validação)
│   ├── author.dto.js
│   └── book.dto.js
├── validators/          # Middlewares de validação
│   ├── validation.middleware.js
│   ├── error.middleware.js
│   └── idValidation.middleware.js
├── data/                # Conexão com banco de dados
│   └── db.js
├── public/              # Arquivos estáticos
├── views/               # Templates (Pug)
│   └── books/
│       └── index.pug
├── app.js               # Configuração da aplicação
└── server.js            # Inicialização do servidor

db.json                 # Base de dados (JSON local)
package.json           # Dependências do projeto
```

## 🔌 Endpoints

### Autores

| Método | Endpoint       | Descrição               |
| ------ | -------------- | ----------------------- |
| GET    | `/authors`     | Listar todos os autores |
| GET    | `/authors/:id` | Obter autor por ID      |
| POST   | `/authors`     | Criar novo autor        |
| PUT    | `/authors/:id` | Atualizar autor         |
| DELETE | `/authors/:id` | Deletar autor           |

### Livros

| Método | Endpoint     | Descrição              |
| ------ | ------------ | ---------------------- |
| GET    | `/books`     | Listar todos os livros |
| GET    | `/books/:id` | Obter livro por ID     |
| POST   | `/books`     | Criar novo livro       |
| PUT    | `/books/:id` | Atualizar livro        |
| DELETE | `/books/:id` | Deletar livro          |

## 🛠️ Tecnologias

- **Express** (v5.2.1) - Framework web minimalista
- **Express Validator** (v7.3.2) - Validação de dados
- **Lowdb** (v7.0.1) - Banco de dados JSON simples
- **Pug** (v3.0.4) - Template engine

## 📝 Exemplo de Uso

### Criar um novo livro:

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code",
    "ano": 2008,
    "genero": "Programação",
    "writerId": 1
  }'
```

### Listar todos os livros:

```bash
curl http://localhost:3000/api/books
```

### Criar um novo autor:

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Robert C. Martin"
  }'
```

## ✅ Validação de Dados

### Campos obrigatórios para Livros:
- `titulo` (string, mínimo 3 caracteres)
- `ano` (número ou string)
- `genero` (string, não vazia)
- `writerId` (número inteiro ≥ 0)

### Campos obrigatórios para Autores:
- `nome` (string, não vazio)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
