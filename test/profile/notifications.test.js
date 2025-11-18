const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE RETORNA AS NOTIFICACOES DO USUARIO
 * @method GET
 * @route /notifications
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("GET /notifications", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("200 - Todas as informações são enviadas corretamente", async () => {		// PAREI NESSE TESTE
		const res = await api({
			method: "GET",
			url: "/notifications",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
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
		for (const notification of res.data.data) {
			expect(notification).toMatchObject({
				id: expect.any(Number),
				viewed: expect.any(Boolean),
				title: expect.any(String),
				time: expect.any(String),
				message: expect.any(String)
			});
		}
	});
});