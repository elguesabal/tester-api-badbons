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
describe("POST /swap-email", () => {
	expect(process.env.EMAIL).toBeDefined();
	expect(process.env.PASSWORD).toBeDefined();
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("204 - 'authorization', 'newEmail' e 'password' são enviadas corretamente", async () => {
		const body = {
			newEmail: "novo-email@email.com",
			password: process.env.PASSWORD
		};
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Body não contém 'newEmail'", async () => {
		const body = {
			password: process.env.PASSWORD
		};
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não contém 'password'", async () => {
		const body = {
			newEmail: "novo-email@email.com"
		};
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const body = {
			newEmail: "novo-email@email.com",
			password: process.env.PASSWORD
		};
		const config = {
			headers: {}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const body = {
			newEmail: "novo-email@email.com",
			password: process.env.PASSWORD
		};
		const config = {
			headers: {
				Authorization: "Bearer token inválido"
			}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const body = {
			newEmail: "novo-email@email.com",
			password: process.env.PASSWORD
		};
		const config = {
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("403 - Senha está incorreta mas o token é válido", async () => {
		const body = {
			newEmail: "novo-email@email.com",
			password: "senha errada"
		};
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});
});