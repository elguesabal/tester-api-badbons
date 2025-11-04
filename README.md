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

## ⚙️ Dotenv

Renomeie o arquivo .model.env e use-o preencha as variaveis de ambiente com informações válidas.

⚠️ **Atenção:** Cada rota pode exigir variáveis específicas. Consulte o código da rota para saber quais valores são necessários.

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

⚠️ **Atenção:** Não adicione query parameters junto a rota ao rodar o comando, o tester fará todos os testes possíveis.

⚠️ **Atenção:** Consulte o arquivo package.json na raiz do projeto e observe o campo "scripts" para saber quais comandos e rotas estão disponíveis para testes.

### Atuais rotas disponíveis para teste

- Welcome
    - /ping
    - /auth/login

- Home
    - /user/treinos