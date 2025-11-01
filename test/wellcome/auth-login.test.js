const { api } = require("../../index.js");

// toEqual(obj)	Compara exatamente o objeto	expect(res.body).toEqual({ msg: 'ok' })
// toMatchObject(obj)	Permite comparar parcialmente	expect(res.body).toMatchObject({ msg: 'ok' })
// toHaveProperty(path, value?)	Verifica se tem uma chave	expect(res.body).toHaveProperty('message', 'Token válido!')
// expect.any(Type)	Valida o tipo sem se importar com o valor	expect(body).toMatchObject({ accesstoken: expect.any(String) })

/**
 * @author VAMPETA
 * @brief ROTA DE LOGIN
 * @method POST
 * @route /auth/login
 * @warning ESSE TESTE NECESSECITA DE 3 VARIAVEIS DE AMBIENTE
 * @property {string} EMAIL EMAIL DE LOGIN
 * @property {stirng} PASSWORD SENHA DE USUARIO
 * @property {string} TOKEN_NOTIFICATIONS TOKEN EXPO USADO PARA ENVIAR NOTIFICACAO
*/
describe("POST /auth/login", () => {
	expect(process.env.EMAIL).toBeDefined();
	expect(process.env.PASSWORD).toBeDefined();
	expect(process.env.TOKEN_NOTIFICATIONS).toBeDefined();

	test("Retorna 200 quando 'tokenNotifications' não é enviado mas email e senha são válidos", async () => {
		const body = {
			email: process.env.EMAIL,
			password: process.env.PASSWORD
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			RefreshToken: expect.any(String),
			accesstoken: expect.any(String),
			validToken: false // INFORMANDO VALIDADE DO TOKEN
		});
	});

	test("Retorna 200 quando 'email', 'password' e 'tokenNotifications' são válidos", async () => {
		const body = {
			email: process.env.EMAIL,
			password: process.env.PASSWORD,
			tokenNotifications: process.env.TOKEN_NOTIFICATIONS
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(200);
	});

	test("Retorna 207 quando 'email', 'password' são válidos mas 'tokenNotifications' é inválido", async () => {
		const body = {
			email: process.env.EMAIL,
			password: process.env.PASSWORD,
			tokenNotifications: "Token inválido"
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(200);
	});

	test("Retorna 400 quando o body é um JSON malformado", async () => {
		const body = "{ JSON malformado }";
		const config = {
			header: {
				"Content-Type": "application/json"
			}
		};
		const res = await api.post("/auth/login", body, config);

		expect(res.status).toBe(400);
	});

	test("Retorna 400 quando o body não é enviado", async () => {
		const res = await api.post("/auth/login");

		expect(res.status).toBe(400);
	});

	test("Retorna 400 quando 'email' não é enviado", async () => {
		const body = {
			password: process.env.PASSWORD,
			tokenNotifications: process.env.TOKEN_NOTIFICATIONS
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(400);
	});

	test("Retorna 400 quando 'password' não é enviado", async () => {
		const body = {
			email: process.env.EMAIL,
			tokenNotifications: process.env.TOKEN_NOTIFICATIONS
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(400);
	});

	test("Retorna 401 quando 'email' não está cadastrado no sistema", async () => {
		const body = {
			email: "email@email.com",
			password: process.env.PASSWORD,
			tokenNotifications: process.env.TOKEN_NOTIFICATIONS
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(401);
	});

	test("Retorna 401 quando 'email' tem um formato invalido", async () => {
		const body = {
			email: "Email inválido",
			password: process.env.PASSWORD,
			tokenNotifications: process.env.TOKEN_NOTIFICATIONS
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(401);
	});

	test("Retorna 401 quando 'password' não é valido", async () => {
		const body = {
			email: process.env.EMAIL,
			password: "Senha inválida",
			tokenNotifications: process.env.TOKEN_NOTIFICATIONS
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(401);
	});
});