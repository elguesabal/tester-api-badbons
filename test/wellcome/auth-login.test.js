const { api } = require("../../index.js");

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

	test("200 - 'email', 'password' e 'tokenNotifications' são válidos", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				password: process.env.PASSWORD,
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			RefreshToken: expect.any(String),
			accesstoken: expect.any(String),
			validToken: true
		});
	});

	test("200 - 'tokenNotifications' não é enviado mas 'email' e 'password' são válidos", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			RefreshToken: expect.any(String),
			accesstoken: expect.any(String),
			validToken: false
		});
	});

	test("200 - 'email', 'password' são válidos mas 'tokenNotifications' é está vazio", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				password: process.env.PASSWORD,
				tokenNotifications: ""
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			RefreshToken: expect.any(String),
			accesstoken: expect.any(String),
			validToken: false
		});
	});

	test("207 - 'email', 'password' são válidos mas 'tokenNotifications' é inválido", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				password: process.env.PASSWORD,
				tokenNotifications: "Token inválido"
			}
		});

		expect(res.status).toBe(207);
		expect(res.data).toMatchObject({
			RefreshToken: expect.any(String),
			accesstoken: expect.any(String),
			validToken: false
		});
	});

	test("400 - Body não é enviado", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login"
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'email' não é enviado", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				password: process.env.PASSWORD,
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'email' é enviado vazio", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: "",
				password: process.env.PASSWORD,
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' não é enviado", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' é enviado vazio", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				password: "",
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - 'email' não está cadastrado no sistema", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: "email@email.com",
				password: process.env.PASSWORD,
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'email' com formato inválido", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: "Email inválido",
				password: process.env.PASSWORD,
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Não existe um 'email' cadastrado que combine com 'password'", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login",
			data: {
				email: process.env.EMAIL,
				password: "Senha inválida",
				tokenNotifications: process.env.TOKEN_NOTIFICATIONS
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});