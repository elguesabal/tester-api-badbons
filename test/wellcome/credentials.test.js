const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE INFORMA AS CREDENCIAIS DO USUARIO
 * @method GET
 * @route /auth/credencitals
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /credentials", () => {
	beforeAll(() => {
		expect(process.env.REFRESH_TOKEN).toBeDefined();
	});

	test("200 - Requisição feita corretamente", async () => {
		const res = await api({
			method: "GET",
			url: "/credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			_id: expect.any(String),
			foto: expect.any(String),
			nome: expect.any(String),
			email: expect.any(String),
			cpf: expect.any(String),
			dataNascimento: expect.any(String),
			telefone: expect.any(String),
			times: expect.any(Object),
		});
		Object.keys(res.data.times).forEach((bairro) => {
			expect(Array.isArray(res.data.times[bairro])).toBe(true);
			for (const training of res.data.times[bairro]) {
				expect(training).toMatchObject({
					day: expect.any(String),
					start: expect.any(String),
					end: expect.any(String)
				});
			}
		});
	});
});