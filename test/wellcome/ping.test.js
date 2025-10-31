const { api } = require("../../index.js");

// Tipo de “malformação”	Exemplo	O que o servidor vê	Possível resposta
// Sintaxe incorreta	/ping?=abc	{ "": "abc" }	400
// Valor vazio	/ping?version=	{ version: "" }	400
// Query duplicada	/ping?version=1.0.0&version=2.0.0	{ version: ['1.0.0','2.0.0'] }	400
// Valor inválido	/ping?version=abc.def	{ version: 'abc.def' }	400
// Bytes inválidos	/ping?%E0%A4%A	erro de parsing em alguns servidores	400

// await axios.get("/ping?=abc");
// await axios.get("/ping?version==1.0.0");
// await axios.get("/ping?&&&&");
// await axios.get("/ping?version&user=");
// await axios.get("/ping?%E0%A4%A");

describe("GET /ping", () => { // FALTA FAZER QUERY MALFORMADA
	test("Retorna 204 quando 'version' é compatível", async () => {
		const config = {
			params: {
				version: "1.0.1"
			}
		};
		const res = await api.get("/ping", config);

		expect(res.status).toBe(204);
	});

	test("aaaa", async () => {
		const res = await api.get("/ping?%E0%A4%A");

		expect(res.status).toBe(400);
	});

	test("Retorna 400 quando a query não é enviada", async () => {
		const res = await api.get("/ping");

		expect(res.status).toBe(400);
	});

	test("Retorna 400 quando 'version' não é passada", async () => {
		const res = await api.get("/ping");

		expect(res.status).toBe(400);
	});

	test("Retorna 426 quando 'version' não está na lista de versões compatíveis", async () => {
		const config = {
			params: {
				version: "0.0.0"
			}
		};
		const res = await api.get("/ping", config);

		expect(res.status).toBe(426);
	})
});