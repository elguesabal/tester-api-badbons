const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE LOGA USAND O TOKEN
 * @method POST
 * @route /auth/login-token
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DO USUARIO
*/
describe("POST /auth/login-token", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("204 - 'Authorization' contém um token válido", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("401 - 'Authorization' não foi enviado", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token"
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é null", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: null
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: ""
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um objeto", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: {}
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um array", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: []
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um número", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: 42
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: "Bearer "
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "POST",
			url: "/auth/login-token",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});