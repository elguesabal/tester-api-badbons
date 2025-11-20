const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA PING QUE VERIFICA SE A VERSAO DO APP E COMPATIVEL COM A API
 * @method GET
 * @route /ping
 * @warning ESTE TESTE NAO NECESSITA DE NENHUMA VARIAVEL DE AMBIENTE
*/
describe("GET /ping", () => {
	test("204 - 'version' é compatível", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				version: "1.0.1"
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - 'version' não é passada", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'version' é passada vazia", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				version: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'version' está fora do padrão X.Y.Z (version inválida)", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				version: "version inválida"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'version' está fora do padrão X.Y.Z (X.Y.Z)", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				version: "X.Y.Z"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'version' está fora do padrão X.Y.Z (1-0-1)", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				version: "1-0-1"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("426 - 'version' não está na lista de versões compatíveis", async () => {
		const res = await api({
			method: "GET",
			url: "/ping",
			params: {
				version: "0.0.0"
			}
		});

		expect(res.status).toBe(426);
		expect(res.data).toBe("Upgrade Required");
	})
});