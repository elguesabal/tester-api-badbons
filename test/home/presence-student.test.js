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
	beforeAll(async() => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
		await api({
			method: "PATCH",
			url: "/presence-student",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				presence: false
			}
		});
	});

	test("204 - Requisição feita corretamente", async () => {
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
			data: {}
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
				presence: ""
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
				presence: true
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e query não enviado (testa se query é lido sem o cliente estar autenticado)", async () => {
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
				presence: true
			}
		});

		expect(res.status).toBe(409);
		expect(res.data).toBe("Conflict");
	});
});