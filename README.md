# Tester API Badbons

Projeto criado para testar as rotas da API Badbons consforme a documentação [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) e [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110). É possivel tirar algumas dúvidas simples usando a documentação mais resumida e direta do [MDN Web Docs (Mozilla)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status).

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

- Profile
    - /swap-email
    - /swap-password

- Home
    - /user/treinos