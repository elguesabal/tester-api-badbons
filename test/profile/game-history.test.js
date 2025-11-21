const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE RETORNA O HITORICO DE PARTIDA
 * @method GET
 * @route /game-history
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /game-history", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("200 - Todas as informações são enviadas corretamente", async () => {
		const res = await api({
			method: "GET",
			url: "/game-history",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`
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
		for (const event of res.data.data) {
			expect(event).toMatchObject({
				event: expect.any(String),
				games: expect.any(Array)
			});
			for (const game of event.games) {
				expect(game).toMatchObject({
					title: expect.any(String),
					favorite: expect.any(Boolean),
					player1: expect.any(Object),
					player2: expect.any(Object)
				});
				expect(game.player1).toMatchObject({
					name: expect.any(String),
					points: expect.any(Number),
				});
				expect(game.player2).toMatchObject({
					name: expect.any(String),
					points: expect.any(Number),
				});
			}
		}
	});

	test("200 - O campo 'page' recebe um número acima da última página (Exemplo: Existem 5 páginas de resultado mas minha consulta pede a página 10)", async () => {
		const res = await api({
			method: "GET",
			url: "/game-history",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			params: {
				page: "10"
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
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
			url: "/game-history",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});