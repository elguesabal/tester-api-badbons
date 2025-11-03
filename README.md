# Tester API Badbons

Projeto criado para testar as rotas da API Badbons

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/elguesabal/tester-api-badbons.git
cd api-tester
npm install
```

---

## 🏸 Como usar

```bash
npm test
```
Este comando testa todas as todas as rotas disponíveis para teste atualmente.

```bash
npm run <ROTA>
```
Comando usado para testar apenas uma rota específica.

⚠️ **Atenção:** Consulte o arquivo package.json na raiz do projeto e observe o campo "scripts" para saber quais comandos e rotas estão disponíveis para testes.

### Atuais rotas disponíveis para teste

- Welcome
    - /ping
    - /auth/login
