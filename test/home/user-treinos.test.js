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

	test("200 - O token do usuário é válido", async () => {
		// const config = {
		// 	headers: {
		// 		Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
		// 	}
		// };
		// const res = await api("/user/treinos", config);
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

	// test("200 - 'authorization' em minúsculo", async () => {
	// 	const config = {
	// 		headers: {
	// 			authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		}
	// 	};
	// 	const res = await api("/user/treinos", config);

	// 	expect(res.status).toBe(200);
	// 	expect(res.data).toMatchObject({
	// 		treinosTotais: expect.any(Number),
	// 		treinosFeitos: expect.any(Number)
	// 	});
	// });

	// test("401 - Header não contém 'Authorization'", async () => {
	// 	// const config = {
	// 	// 	headers: {}
	// 	// };
	// 	// const res = await api("/user/treinos", config);
	// 	const res = await api({
	// 		method: "GET",
	// 		url: "/user/treinos",
	// 		headers: {}
	// 	});

	// 	expect(res.status).toBe(401);
	// 	expect(res.data).toBe("Unauthorized");
	// });

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		// const config = {
		// 	headers: {
		// 		Authorization: process.env.REFRESH_TOKEN
		// 	}
		// };
		// const res = await api("/user/treinos", config);
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
		// const config = {
		// 	headers: {
		// 		Authorization: "Bearer "
		// 	}
		// };
		// const res = await api("/user/treinos", config);
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
		// const config = {
		// 	headers: {
		// 		Authorization: "Bearer token inválido"
		// 	}
		// };
		// const res = await api("/user/treinos", config);
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