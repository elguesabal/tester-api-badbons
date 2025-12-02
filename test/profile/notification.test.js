const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE BUSCA UMA NOTIFICACAO ESPECIFICA
 * @method GET
 * @route /notification
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /notification", () => {
	beforeAll(async () => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
	});

	test("200 - Todas as informações são enviadas corretamente", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				id: "1"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			title: expect.any(String),
			text: expect.any(String),
		});
	});

	test("400 - 'id' não é passado", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {

			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'id' é passado vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				id: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			params: {
				id: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: ""
			},
			params: {
				id: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: "Bearer token inválido"
			},
			params: {
				id: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: "Bearer "
			},
			params: {
				id: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			params: {
				id: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e query não enviado (testa se query é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("404 - 'id' é inválido ou não existe na pesquisa do servidor", async () => {
		const res = await api({
			method: "GET",
			url: "/notification",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				id: "id inválido"
			}
		});

		expect(res.status).toBe(404);
		expect(res.data).toBe("Not Found");
	});
});