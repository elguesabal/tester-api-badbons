const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE INFORMA AS CREDENCIAIS DO USUARIO
 * @method GET
 * @route /auth/credencitals
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /credentials", () => {
	beforeAll(() => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
	});

	test("200 - Requisição feita corretamente", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			_id: expect.any(String),
			foto: expect.any(String),
			nome: expect.any(String),
			email: expect.any(String),
			cpf: expect.any(String),
			dataNascimento: expect.any(String),
			telefone: expect.any(String),
			times: expect.any(Object),
		});
		Object.keys(res.data.times).forEach((bairro) => {
			expect(Array.isArray(res.data.times[bairro])).toBe(true);
			for (const training of res.data.times[bairro]) {
				expect(training).toMatchObject({
					day: expect.any(String),
					start: expect.any(String),
					end: expect.any(String)
				});
			}
		});
	});

	test("401 - 'Authorization' não foi enviado", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials"
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é null", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: null
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: ""
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um objeto", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: {}
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um array", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: []
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um número", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: 42
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: "Bearer "
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});