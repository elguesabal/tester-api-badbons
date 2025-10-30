const { api } = require("../../index.js");

describe("POST /auth/login", () => { // TESTAR JSON MAL FORMADO // JSON malformado (ex: corpo da requisição não é JSON válido).
	expect(process.env.EMAIL).toBeDefined();
	expect(process.env.PASSWORD).toBeDefined();
	expect(process.env.TOKEN_NOTIFICATIONS).toBeDefined();

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

	test("Retorna 200 quando 'tokenNotifications' não é enviado mas email e senha são válidos", async () => {
		const body = {
			email: process.env.EMAIL,
			password: process.env.PASSWORD
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(200);
	});

	test("Retorna 200 quando 'email' e 'password' estão corretos", async () => {
		const body = {
			email: process.env.EMAIL,
			password: process.env.PASSWORD
		};
		const res = await api.post("/auth/login", body);

		expect(res.status).toBe(200);
	});
});