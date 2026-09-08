# 🧪 Cypress SauceDemo — Automação de Testes E2E

Projeto de automação de testes end-to-end para o e-commerce de demonstração [SauceDemo](https://www.saucedemo.com), desenvolvido com **Cypress** e o padrão **Page Object Model (POM)**.

---

## 📋 Sumário

- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Setup e Instalação](#setup-e-instalação)
- [Executando os Testes](#executando-os-testes)
  - [Modo Interativo (UI do Cypress)](#modo-interativo)
  - [Modo Headless (CLI)](#modo-headless)
  - [Via Docker](#via-docker)
- [Cobertura de Testes](#cobertura-de-testes)
- [Evidências: Screenshots e Vídeos](#evidências-screenshots-e-vídeos)
- [Credenciais de Teste](#credenciais-de-teste)

---

## Tecnologias

| Tecnologia | Versão | Propósito |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^14.x | Framework de testes E2E |
| Node.js | >=18 | Runtime JavaScript |
| Docker | Latest | Execução em container isolado |

---

## Estrutura do Projeto

```
cypress-saucedemo/
├── cypress/
│   ├── e2e/                        # Arquivos de spec (testes)
│   │   ├── login.cy.js             # Testes de autenticação
│   │   └── addToCart.cy.js         # Fluxo principal: busca, carrinho e checkout
│   ├── fixtures/
│   │   └── testData.json           # Dados de teste (credenciais, produtos)
│   ├── screenshots/                # 📸 Capturas automáticas em falhas
│   ├── support/
│   │   ├── pages/                  # Page Objects (POM)
│   │   │   ├── LoginPage.js
│   │   │   ├── InventoryPage.js
│   │   │   └── CartPage.js
│   │   ├── commands.js             # Comandos Cypress customizados
│   │   └── e2e.js                  # Setup global de suporte
│   └── videos/                     # 🎥 Gravações das execuções (headless)
├── .gitignore
├── cypress.config.js               # Configuração central do Cypress
├── docker-compose.yml              # Container para execução em CI/CD
├── package.json
└── README.md
```

---

## Pré-requisitos

- **Node.js** v18 ou superior
- **npm** v9 ou superior
- (Opcional) **Docker** para execução em container

---

## Setup e Instalação

```bash
# 1. Clone o repositório (ou entre na pasta do projeto)
cd cypress-saucedemo

# 2. Instale as dependências
npm install
```

---

## Executando os Testes

### Modo Interativo

Abre a interface gráfica do Cypress para execução manual e debug:

```bash
npm run cy:open
```

### Modo Headless

Executa todos os testes via terminal, sem abrir o browser (ideal para CI/CD):

```bash
# Todos os testes (Chrome, headless)
npm run cy:run:headless

# Apenas testes de login
npm run cy:run:login

# Apenas testes de carrinho
npm run cy:run:cart
```

### Via Docker

Executa a suíte completa em um container isolado, sem precisar de nada instalado localmente além do Docker:

```bash
# Build e execução
docker-compose up --build

# Aguarda o container encerrar e retorna o exit code dos testes
docker-compose up --build --exit-code-from cypress
```

> **Nota:** Os vídeos e screenshots gerados dentro do container são mapeados via volume para `./cypress/videos` e `./cypress/screenshots` no host.

---

## Cobertura de Testes

### `login.cy.js` — Autenticação

| # | Cenário | Tipo |
|---|---|---|
| 1 | Login com `standard_user` (credenciais válidas) | ✅ Happy Path |
| 2 | Login com credenciais inválidas | ❌ Exceção |
| 3 | Login com usuário bloqueado (`locked_out_user`) | ❌ Exceção |
| 4 | Login sem preencher o campo usuário | ❌ Exceção |
| 5 | Login sem preencher o campo senha | ❌ Exceção |

### `addToCart.cy.js` — Fluxo Principal

| # | Cenário | Tipo |
|---|---|---|
| 1 | Adicionar produto ao carrinho e validar na página de carrinho | ✅ Happy Path |
| 2 | Ordenar por preço (lohi) e adicionar o mais barato | ✅ Filtro |
| 3 | Ordenar por nome (Z → A) e validar ordenação | ✅ Filtro |
| 4 | Adicionar 2 produtos distintos e validar ambos no carrinho | ✅ Multi-item |
| 5 | Acessar carrinho sem adicionar produtos (carrinho vazio) | ❌ Exceção |

---

## Evidências: Screenshots e Vídeos

- **Screenshots** são capturadas automaticamente em caso de falha e salvas em `cypress/screenshots/`.
- **Vídeos** de todas as execuções headless são gravados em `cypress/videos/`.

Configurado em `cypress.config.js`:
```js
video: true,
screenshotOnRunFailure: true,
```

---

## Credenciais de Teste

As credenciais do SauceDemo estão configuradas no arquivo `cypress.config.js` (env vars) e no fixture `cypress/fixtures/testData.json`:

| Usuário | Senha | Comportamento |
|---|---|---|
| `standard_user` | `secret_sauce` | Login normal ✅ |
| `locked_out_user` | `secret_sauce` | Usuário bloqueado 🔒 |
| `problem_user` | `secret_sauce` | UI com problemas ⚠️ |
| `performance_glitch_user` | `secret_sauce` | Login lento 🐢 |

---

## Padrão Utilizado: Page Object Model (POM)

Cada página da aplicação é representada por uma classe com:
- **Seletores** como getters (`get pageTitle()`)
- **Ações** como métodos encadeáveis (`login()`, `addToCart()`)
- **Asserções** embutidas no PO (`assertPageLoaded()`, `assertProductInCart()`)

Isso garante **código limpo, reutilizável e fácil de manter**.
