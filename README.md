# cypress-saucedemo

Testes E2E para o [SauceDemo](https://www.saucedemo.com) usando Cypress com Page Object Model.

## Pré-requisitos

- Node.js >= 18
- npm >= 9
- Docker (opcional, para rodar em container)

## Instalação

```bash
npm install
```

## Rodando os testes

**Interface gráfica do Cypress:**
```bash
npm run cy:open
```

**Headless (linha de comando):**
```bash
npm run cy:run:headless
```

**Spec específica:**
```bash
npm run cy:run:login
npm run cy:run:cart
```

**Via Docker:**
```bash
docker-compose up --build
```

## Estrutura

```
cypress/
├── e2e/
│   ├── login.cy.js
│   └── addToCart.cy.js
├── fixtures/
│   └── testData.json
└── support/
    ├── pages/
    │   ├── LoginPage.js
    │   ├── InventoryPage.js
    │   └── CartPage.js
    ├── commands.js
    └── e2e.js
```

## O que está coberto

**login.cy.js**
- Login com credenciais válidas
- Erro com credenciais inválidas
- Erro com usuário bloqueado
- Validação de campos obrigatórios (usuário e senha)

**addToCart.cy.js**
- Fluxo completo: login → produto → carrinho → validação
- Ordenação por preço e por nome
- Múltiplos produtos no carrinho
- Carrinho vazio

## Evidências

Screenshots em falha e vídeos de todas as execuções headless ficam em `cypress/screenshots/` e `cypress/videos/`.

## Credenciais

| Usuário | Senha | Status |
|---|---|---|
| standard_user | secret_sauce | OK |
| locked_out_user | secret_sauce | Bloqueado |
| problem_user | secret_sauce | UI com defeitos |
