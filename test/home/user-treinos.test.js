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
	beforeAll(async () => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
	});

	test("200 - O token do usuário é válido", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			treinosTotais: expect.any(Number),
			treinosFeitos: expect.any(Number)
		});
	});

	test("401 - 'Authorization' não foi enviado", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos"
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é null", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: null
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: ""
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um objeto", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: {}
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um array", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: []
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' é um número", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: 42
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: "Bearer "
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "GET",
			url: "/user/treinos",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});