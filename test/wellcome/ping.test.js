const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA PING QUE VERIFICA SE A VERSAO DO APP E COMPATIVEL COM A API
 * @method GET
 * @route /ping
 * @warning ESTE TESTE NAO NECESSITA DE NENHUMA VARIAVEL DE AMBIENTE
*/
describe("GET /ping", () => {
	test("Retorna 204 quando 'version' é compatível", async () => {
		const config = {
			params: {
				version: "1.0.1"
			}
		};
		const res = await api.get("/ping", config);

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("Retorna 400 quando a query é malformada", async () => {
		const res = await api.get("/ping?%E0%A4%A");

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("Retorna 400 quando a query não é enviada", async () => {
		const res = await api.get("/ping");

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("Retorna 400 quando 'version' não é passada", async () => {
		const res = await api.get("/ping");

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("Retorna 426 quando 'version' não está na lista de versões compatíveis", async () => {
		const config = {
			params: {
				version: "0.0.0"
			}
		};
		const res = await api.get("/ping", config);

		expect(res.status).toBe(426);
		expect(res.data).toBe("Upgrade Required");
	})
});