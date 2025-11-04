const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE INFORMA A QUANTIDADE DE EXERCICIOS FEITOS
 * @method GET
 * @route /user/treinos
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /user/treinos", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("Retorna 200 quando o token do usuário é válido", async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		}
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			treinosTotais: expect.any(Number),
			treinosFeitos: expect.any(Number)
		});
	});

	test("Aceita header 'authorization' em minúsculo", async () => {
		const config = {
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		};
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			treinosTotais: expect.any(Number),
			treinosFeitos: expect.any(Number)
		});
	});

	test("Retorna 400 quando o headers não contém a chave Authorization", async () => {
		const config = {
			headers: {}
		}
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("Retorna 400 quando o header Authorization não tem o formato 'Bearer <token>'", async () => {
		const config = {
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			}
		}
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("Retorna 400 quando há múltiplos headers Authorization", async () => {
		const config = {
			headers: {
				Authorization: ["Bearer 12345", "Bearer 54321"]
			}
		};
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("Retorna 401 quando o token está vazio", async () => {
		const config = {
			headers: {
				Authorization: "Bearer "
			}
		}
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("Retorna 401 quando o token é inválido", async () => {
		const config = {
			headers: {
				Authorization: "Bearer token inválido"
			}
		}
		const res = await api("/user/treinos", config);

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});