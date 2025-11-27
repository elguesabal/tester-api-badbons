const { api } = require("../../index.js");

// FALTA TESTAR SE A DATA NAO TIVER NENHUM RESULTADO 404

/**
 * @author VAMPETA
 * @brief ROTA QUE RETORNA A LISTA DE PRESENCA
 * @method GET
 * @route /presence-list
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /presence-list", () => {
	beforeAll(() => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
	});

	test("200 - Requisição feita corretamente", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			teacher: expect.any(String),
			address: expect.any(String),
			start: expect.any(String),
			end: expect.any(String),
			confirmedPresence: expect.any(Boolean),
			confirmedStudents: expect.any(Array)
		});
		for (const confirmedStudent of res.data.confirmedStudents) expect(confirmedStudent).toEqual(expect.any(String));
	});

	test("200 - O parâmetro 'date' é uma data válida porém já passou", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "21/12/2024"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			teacher: expect.any(String),
			address: expect.any(String),
			start: expect.any(String),
			end: expect.any(String),
			confirmedPresence: expect.any(Boolean),
			confirmedStudents: expect.any(Array)
		});
		for (const confirmedStudent of res.data.confirmedStudents) expect(confirmedStudent).toEqual(expect.any(String));
	});

	test("400 - 'date' não é passado", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {

			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é passado vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é inválido", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "data inválida"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão DD-MM-AAAA", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "08-01-2026"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão AAAA-MM-DD", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "2026-01-08"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão AAAA/MM/DD", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "2026/01/08"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão MM/DD/AAAA (Pode funcionar em alguns casos que o dia é menor que 12, mas de forma erronea)", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				date: "12/21/2027"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - 'Authorization' não foi enviado", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é null", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: null
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: ""
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um objeto", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: {}
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um array", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: []
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um número", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: 42
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: "Bearer "
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: "Bearer token inválido"
			},
			params: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e query não enviado (testa se query é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "GET",
			url: "/presence-list",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});