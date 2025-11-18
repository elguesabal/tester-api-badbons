const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE TROCA A SENHA DO USUARIO
 * @method PATCH
 * @route /swap-password
 * @warning ESSE TESTE NECESSECITA DE 2 VARIAVEL DE AMBIENTE
 * @property {stirng} PASSWORD SENHA DE USUARIO
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("PATCH /swap-password", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();
	expect(process.env.PASSWORD).toBeDefined();

	test("204 - 'authorization', 'newPassword' e 'password' são enviadas corretamente", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "abc123",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Body não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
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
			url: "/swap-password",
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
			url: "/swap-password",
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
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: "string"
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não contém 'newPassword'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'newPassword' é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: null,
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'newPassword' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'newPassword' é um objeto", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: {},
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'newPassword' é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: [],
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'newPassword' é número", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: 42,
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não contém 'password'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: null
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: ""
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("400 - 'password' é um objeto", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: {}
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: []
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' é número", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: 42
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - 'Authorization' não é enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: null
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: ""
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um objeto", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: {}
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: []
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um número", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: 42
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: "Bearer token inválido"
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: "Bearer "
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e body não enviado (testa se o body é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("403 - Senha está incorreta mas o token é válido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: "senha errada"
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("409 - A antiga senha, já em uso, foi enviado no campo 'newPassword'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: process.env.PASSWORD,
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(409);
		expect(res.data).toBe("Conflict");
	});

	test("422 - A nova senha é menor que 5 dígitos", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "abc0",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(422);
		expect(res.data).toBe("Unprocessable Entity");
	});

	test("422 - A nova senha não contém números", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "abcde",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(422);
		expect(res.data).toBe("Unprocessable Entity");
	});

	test("422 - A nova senha não contém letras", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(422);
		expect(res.data).toBe("Unprocessable Entity");
	});
});