const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE TROCA O EMAIL DO USUARIO
 * @method PATCH
 * @route /swap-email
 * @warning ESSE TESTE NECESSECITA DE 3 VARIAVEL DE AMBIENTE
 * @property {string} EMAIL EMAIL DE LOGIN
 * @property {stirng} PASSWORD SENHA DE USUARIO
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("PATCH /swap-email", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();
	expect(process.env.EMAIL).toBeDefined();
	expect(process.env.PASSWORD).toBeDefined();

	test("204 - 'authorization', 'newEmail' e 'password' são enviadas corretamente", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Body não foi enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não contém 'newEmail'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
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

	test("400 - 'newEmail' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '..')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo..email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '.' no início)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: ".novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '.' no fim)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo.email.@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém espaço)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém mais de um '@')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo@email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '<')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo<email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '>')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo>email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '(')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo(email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém ')')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo)email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém ',')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo,email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém aspas duplas)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo\"email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém ':')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo:email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém ';')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo;email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Formato do novo e-mail inválido (contém '\\')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo\\email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não contém 'password'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo-email@email.com"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' é enviado vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo-email@email.com",
				password: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			data: {
				newEmail: "novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: ""
			},
			data: {
				newEmail: "novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: "Bearer token inválido"
			},
			data: {
				newEmail: "novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: "Bearer "
			},
			data: {
				newEmail: "novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			data: {
				newEmail: "novo-email@email.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e body não enviado (testa se o body é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
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
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: "novo-email@email.com",
				password: "senha errada"
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("409 - O antigo e-mail, já em uso, foi enviado no campo 'newEmail'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail: process.env.EMAIL,
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(409);
		expect(res.data).toBe("Conflict");
	});

	test("409 - O e-mail já está em uso por outro usário", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-email",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newEmail:"email-em-uso@dominio.com",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(409);
		expect(res.data).toBe("Conflict");
	});
});