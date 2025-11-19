const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE RETORNA AS NOTIFICACOES DO USUARIO
 * @method GET
 * @route /notifications
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /notifications", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("200 - Todas as informações são enviadas corretamente", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				page: "1"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			pagination: {
				nextPage: expect.any(Boolean),
				totalPages: expect.any(Number),
			},
			data: expect.any(Array)
		});
		for (const notification of res.data.data) {
			expect(notification).toMatchObject({
				id: expect.any(Number),
				viewed: expect.any(Boolean),
				title: expect.any(String),
				time: expect.any(String),
				message: expect.any(String)
			});
		}
	});

	test("200 - O campo 'page' recebe um número acima da última página (Exemplo: Existem 5 páginas de resultado mas minha consulta pede a página 10)", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				page: "42"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			pagination: {
				nextPage: expect.any(Boolean),
				totalPages: expect.any(Number),
			},
			data: expect.any(Array)
		});
		expect(res.data.data).toEqual([]);
	});

	test("400 - 'id' não é passado", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
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
			url: "/notifications",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				page: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'id' contém caracteres não numéricos", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				page: "Vampeta"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'id' é negativo", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				page: "-1"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			params: {
				page: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: ""
			},
			params: {
				page: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: "Bearer token inválido"
			},
			params: {
				page: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: "Bearer "
			},
			params: {
				page: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			params: {
				page: "1"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e query não enviado (testa se query é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});