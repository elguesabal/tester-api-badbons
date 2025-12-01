const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE O CLIENTE DEVE INFORMAR SE ELE VAI AO TREINO OU NAO
 * @method PATCH
 * @route /presence-student
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("PATCH /presence-student", () => {
	beforeAll(async () => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
	});

	beforeEach(async () => {
		if (expect.getState().currentTestName.includes("204 - Requisição feita corretamente")) {
			await api({
				method: "PATCH",
				url: "/presence-student",
				headers: {
					Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
				},
				data: {
					date: "08/01/2026",
					presence: false
				}
			});
		}
		if (expect.getState().currentTestName.includes("409 - Requisição feita corretamente, porém o status de presença já está definido como true")) {
			await api({
				method: "PATCH",
				url: "/presence-student",
				headers: {
					Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
				},
				data: {
					date: "08/01/2026",
					presence: true
				}
			});
		}
	});

	test("204 - Requisição feita corretamente", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Body não foi enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: null
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: []
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é uma string", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: "string"
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não contém 'presence'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'presence' é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: null
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'presence' é um objeto", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: {}
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'presence' é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: []
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'presence' é um número", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: 42
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'presence' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Não contém 'date'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: null,
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é um objeto", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: {},
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: [],
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é um número", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: 42,
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'date' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "",
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão DD-MM-AAAA", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08-01-2026",
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão AAAA-MM-DD", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "2026-01-08",
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão AAAA/MM/DD", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "2026/01/08",
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão MM/DD/AAAA (Pode funcionar em alguns casos que o dia é menor que 12, mas de forma erronea)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "12/21/2027",
				presence: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - 'Authorization' não foi enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: null
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: ""
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um objeto", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: {}
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: []
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um número", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: 42
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: "Bearer "
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: "Bearer token inválido"
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e body não enviado (testa se query é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("409 - Requisição feita corretamente, porém o status de presença já está definido como true", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "08/01/2026",
				presence: true
			}
		});

		expect(res.status).toBe(409);
		expect(res.data).toBe("Conflict");
	});

	test("409 - O campo 'date' é uma data que já passou", async () => {
		const res = await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				date: "07/12/1989",
				presence: true
			}
		});

		expect(res.status).toBe(409);
		expect(res.data).toBe("Conflict");
	});
});